require('dotenv').config({ path: '.env' });
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const { PrismaClient } = require('@prisma/client');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function run() {
  // Find products under "Furniture > Beds"
  const bedProducts = await prisma.product.findMany({
    where: {
      categories: {
        has: "Furniture > Beds"
      }
    }
  });

  // Find some rugs
  const rugProducts = await prisma.product.findMany({
    where: {
      categories: {
        has: "Rugs"
      }
    },
    take: 3
  });

  const productsToUpdate = [...bedProducts, ...rugProducts];
  for (const p of productsToUpdate) {
    const newCategories = new Set(p.categories);
    newCategories.add("Baby + Kids");
    newCategories.add("Baby + Kids > Baby Furniture");
    newCategories.add("Baby + Kids > Kids Decor + Playroom");
    
    await prisma.product.update({
      where: { id: p.id },
      data: { categories: Array.from(newCategories) }
    });
  }
  
  console.log(`Successfully added Baby + Kids categories to ${productsToUpdate.length} products.`);
  prisma.$disconnect();
  pool.end();
}

run();
