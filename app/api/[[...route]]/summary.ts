import { auth } from "@/auth";
import { zValidator } from "@hono/zod-validator";
import { PrismaClient } from "@prisma/client";
import { differenceInDays, parse, subDays, format } from "date-fns";
import { Hono } from "hono";
import { z } from "zod";
import { calculatePercentage, fillMissingDays } from "@/lib/utils";

const prisma = new PrismaClient();

const app = new Hono().get(
  "/",
  zValidator(
    "query",
    z.object({
      from: z.string().optional(),
      to: z.string().optional(),
      accountypeId: z.string().optional(),
    })
  ),
  async (c) => {
    const session = await auth();
    const { from, to, accountypeId } = c.req.valid("query");

    if (!session?.user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const startDate = from ? parse(from, "yyyy-MM-dd", new Date()) : defaultFrom;
    const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;
    const periodLength = differenceInDays(endDate, startDate) + 1;

    const lastPeriodStart = subDays(startDate, periodLength);
    const lastPeriodEnd = subDays(endDate, periodLength);

    async function fetchFinancialData(userId: string, from: Date, to: Date) {
      const transactions = await prisma.transaction.findMany({
        where: {
          accountypes: {
            userId,
            ...(accountypeId ? { id: accountypeId } : {}),
          },
          date: {
            gte: from,
            lte: to,
          },
        },
        select: {
          amount: true,
        },
      });

      let income = 0;
      let expenses = 0;
      let remaining = 0;

      for (const tx of transactions) {
        if (tx.amount >= 0) income += tx.amount;
        else expenses += tx.amount;
        remaining += tx.amount;
      }

      return {
        income,
        expenses,
        remaining,
      };
    }

    const currentPeriod = await fetchFinancialData(session.user.id, startDate, endDate);
    const lastPeriod = await fetchFinancialData(session.user.id, lastPeriodStart, lastPeriodEnd);

    const incomeChange = calculatePercentage(currentPeriod.income, lastPeriod.income);
    const expensesChange = calculatePercentage(currentPeriod.expenses, lastPeriod.expenses);
    const remainingChange = calculatePercentage(currentPeriod.remaining, lastPeriod.remaining);

    const categoryData = await prisma.transaction.groupBy({
      by: ['categoryId'],
      where: {
        accountypes: {
          userId: session.user.id,
          ...(accountypeId ? { id: accountypeId } : {}),
        },
        date: {
          gte: startDate,
          lte: endDate,
        },
        amount: {
          lt: 0,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const categoriesMap = await Promise.all(
      categoryData.map(async (item) => {
        const category = await prisma.categories.findUnique({
          where: { id: item.categoryId! },
          select: { name: true },
        });
        return {
          name: category?.name ?? "Unknown",
          value: Math.abs(item._sum.amount ?? 0),
        };
      })
    );

    const sortedCategories = categoriesMap.sort((a, b) => b.value - a.value);
    const topCategories = sortedCategories.slice(0, 3);
    const otherCategories = sortedCategories.slice(3);
    const otherSum = otherCategories.reduce((sum, cat) => sum + cat.value, 0);
    const finalCategories = [...topCategories];
    if (otherCategories.length > 0) {
      finalCategories.push({ name: "Other", value: otherSum });
    }

    const dailyTransactions = await prisma.transaction.findMany({
      where: {
        accountypes: {
          userId: session.user.id,
          ...(accountypeId ? { id: accountypeId } : {}),
        },
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        date: true,
        amount: true,
      },
    });

    const groupedByDay = dailyTransactions.reduce((acc, tx) => {
      const dateKey = format(tx.date, "yyyy-MM-dd");
      if (!acc[dateKey]) acc[dateKey] = { date: tx.date, income: 0, expenses: 0 };

      if (tx.amount > 0) acc[dateKey].income += tx.amount;
      else acc[dateKey].expenses += Math.abs(tx.amount);

      return acc;
    }, {} as Record<string, { date: Date; income: number; expenses: number }>);

    const days = fillMissingDays(Object.values(groupedByDay), startDate, endDate);

    return c.json({
        
      data: {
        
        incomeAmount: currentPeriod.income,
        incomeChange,
        expensesAmount: currentPeriod.expenses,
        expensesChange,
        remainingAmount: currentPeriod.remaining,
        remainingChange,
        categories: finalCategories,
        days,
      },
    });
  }
);

export default app;
