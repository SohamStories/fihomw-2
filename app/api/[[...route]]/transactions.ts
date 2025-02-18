import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { Categoriesschema, TransactionSchema } from "@/schemas";
import { zValidator } from "@hono/zod-validator";
import { cors } from "hono/cors";
import { z } from "zod";
import  { parse , subDays } from "date-fns"
const prisma = new PrismaClient();
const app = new Hono()


.use(cors({
  origin: "http://localhost:3000", // Ensure this matches your frontend
  credentials: true,
}))


.get("/",
  zValidator("query", z.object({
    from: z.string().optional(),
    to: z.string().optional(),
    accountypeId: z.string().optional(),
  })),
  
  async (c) => {
    const session = await auth();
    const { from, to, accountypeId } = c.req.valid("query");

    // Check if the user is authenticated
    if (!session?.user?.id) {
      return c.json({
        error: "Unauthorized",
      }, 401);
    }

    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30); // Default: Last 30 days

    const startDate = from ? parse(from, "yyyy-MM-dd", new Date()) : defaultFrom;
    const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

    // Fetch user data from the database
    const data = await prisma.transaction.findMany({
      where: {
        userId: session.user.id,
        accountypeId,
        date: {
          gte: startDate, // Transactions on or after startDate
          lte: endDate,   // Transactions on or before endDate
          
        },
      },
      orderBy: [{
        date: "desc"
      }],
      select: {
        id: true,
        date: true,
        amount: true,
        description: true,
        accountypeId: true,
        categoryId: true,
        payee: true,
        categories: { select: { name: true } },
        accountypes: { select: { name: true } },
      },
    });

    return c.json({ data });
  }
)

.get("/:id", 
  zValidator("param",z.object({
    id: z.string().optional(),
  })),

  async (c) => {

    const {id } = c.req.valid("param");

if(!id) {
    return c.json({
      error: "Missing id"
    }, 400);
}

    const session = await auth();
    
    // Check if the user is authenticated
    if (!session?.user?.id) {
      return c.json({
        error: "Unauthorized",
      }, 401); // Sending a 401 status for unauthorized access
    }
  
    try {
      const data = await prisma.transaction.findUnique({
        where: { id },
        select: {    id: true,
          date: true,
          amount: true,
          description: true,
          payee: true,
          userId: true,
          categories: { select: { name: true } },
          accountypes: { select: { name: true } }, 
        },
      });


if(data?.userId !== session.user.id) {
   return c.json({ error: "Forbidden" }, 403);
}

      if (!data) {
        return c.json(
          {
            error: 'Category type not found',
          },
          404
        );
      }

      return c.json( { data});
    } catch (error) {
      return c.json(
        {
          error: 'Internal server error',
        },
        500
      );
    }
  }
)

.post("/",
  zValidator("json", TransactionSchema
  ),
  async  (c) => {
 const values = c.req.valid("json")

  const session = await auth();

  if (!session?.user?.id) {
    return c.json({
      error: "Unauthorized",
    }, 401);
  }
const userId =session?.user?.id



    const add  = await prisma.transaction.create({
      data: {
      ...values,
      userId: userId,
      },
    });
    

    return c.json(
      {  add },
      201
    );
    
  })

  .post("/bulk-delete",
    zValidator("json", z.object({
      ids: z.array(z.string()),
    })),
    async (c) => {
      const values = c.req.valid("json");
  
      const session = await auth();
  
      if (!session?.user?.id) {
        return c.json({
          error: "Unauthorized",
        }, 401);
      }
  
      const userId = session.user.id;
  
      // Deleting multiple accountType records for the user
      const deleted = await prisma.transaction.deleteMany({
        where: {
          id: { in: values.ids },
          accountypes: { userId: session.user.id },
        },
      });
  
      return c.json({ deleted }, 200);
    }
  )

  .patch("/:id",
    zValidator("param",
      z.object({
        id: z.string(),
      }),
    ),
    zValidator("json", TransactionSchema),
    async (c) => {
      const values = c.req.valid("json");
      const { id } = c.req.valid("param");
  
      const session = await auth();
  
      if (!session?.user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }
  
      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }
  
      try {
        const updatedTransactionType = await prisma.transaction.update({
          where: { id,
            accountypes: { userId: session.user.id },
           },

          data: values,
        });
  
        return c.json({ updatedTransactionType }, 200);
      } catch (error) {
        return c.json({ error: "Failed to update account type" }, 500);
      }
    }
  )


  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param");
  
      const session = await auth();
  
      if (!session?.user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }
  
      try {
        await prisma.transaction.delete({
          where: { id ,
            accountypes: { userId: session.user.id },
          },
        });
  
        return c.json({ message: "Category type deleted successfully" }, 200);
      } catch (error) {
        return c.json({ error: "Failed to delete category type" }, 500);
      }
    }
  );
  
  



export default app;
