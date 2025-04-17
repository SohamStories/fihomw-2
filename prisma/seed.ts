import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// Replace with actual values from your DB
const userId = 'cm5w1lco80000tz0kc7rg5nve';
const accountypeId = 'cm970rfm60005tzz46pji9g64';

const seedCategories = async () => {
  const categoryNames = ['Groceries', 'Rent', 'Salary', 'Freelance', 'Utilities', 'Shopping'];

  const createdCategories = [];

  for (const name of categoryNames) {
    const existing = await prisma.categories.findFirst({
      where: { name, userId },
    });

    if (existing) {
      createdCategories.push(existing);
    } else {
      const category = await prisma.categories.create({
        data: { name, userId },
      });
      createdCategories.push(category);
    }
  }

  return createdCategories;
};

// Generate a date within the last 60 days
const getRandomDateInLastTwoMonths = () => {
  const now = new Date();
  const daysAgo = faker.number.int({ min: 0, max: 60 });
  return new Date(now.setDate(now.getDate() - daysAgo));
};

const seedTransactions = async (categories: any[]) => {
  for (let i = 0; i < 20; i++) {
    const category = faker.helpers.arrayElement(categories);

    await prisma.transaction.create({
      data: {
        userId,
        accountypeId,
        categoryId: category.id,
        amount: faker.number.int({ min: -100000, max: -500 }), // large amount
        payee: faker.company.name(),
        description: faker.commerce.productDescription(),
        date: getRandomDateInLastTwoMonths(),
      },
    });
  }
};

async function main() {
  console.log('🌱 Seeding started...');

  const categories = await seedCategories();
  await seedTransactions(categories);

  console.log(`✅ Seeded 20 transactions for user ${userId}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
  })
  .finally(() => prisma.$disconnect());
