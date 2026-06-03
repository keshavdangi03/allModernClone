require('dotenv').config({ path: '.env' });
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const { PrismaClient } = require('@prisma/client');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function run() {
  const products = await prisma.product.findMany({});
  const categoriesMap = {};
  products.forEach(p => {
    p.categories.forEach(c => {
      categoriesMap[c] = (categoriesMap[c] || 0) + 1;
    });
  });
  console.log('Distinct Categories in DB:', categoriesMap);
  prisma.$disconnect();
  pool.end();
}

run();
