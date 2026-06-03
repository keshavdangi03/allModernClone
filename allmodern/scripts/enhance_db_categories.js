require('dotenv').config({ path: '.env' });
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const { PrismaClient } = require('@prisma/client');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const mappingRules = [
  {
    keywords: ["baby", "kids", "crib", "nursery", "bunk", "glider", "reclining", "glid"],
    categories: ["Baby + Kids", "Baby + Kids > Baby Furniture", "Baby + Kids > Kids Decor + Playroom"]
  },
  {
    keywords: ["towel", "bath", "shower", "vanity", "toilet", "faucet", "hardware"],
    categories: ["Bath", "Bath > Bath Linens + Accessories", "Bath > Bathroom Fixtures + Hardware"]
  },
  {
    keywords: ["blanket", "throw", "duvet", "comforter", "sheet", "mattress", "pillow case", "bed", "headboard", "pillow"],
    categories: ["Bedding", "Bedding > Bed Basics", "Bedding > Bedroom Accessories"]
  },
  {
    keywords: ["dining", "table", "dinnerware", "flatware", "glassware", "serveware", "linens", "cookware", "appliances", "barware", "coffee", "mug", "cup", "stools", "chairs"],
    categories: ["Kitchen + Tabletop", "Kitchen + Tabletop > Dining", "Kitchen + Tabletop > Kitchen Tools"]
  },
  {
    keywords: ["bookcase", "shelf", "cabinet", "bin", "basket", "closet", "dresser", "wardrobe", "bench", "storage", "organizer", "baskets", "boxes", "shelves"],
    categories: ["Storage", "Storage > Organization", "Storage > Large Storage"]
  }
];

async function run() {
  console.log("Analyzing and updating product categories in PostgreSQL...");
  const products = await prisma.product.findMany({});
  
  let updatedCount = 0;
  for (const product of products) {
    const nameLower = product.name.toLowerCase();
    const descLower = (product.description || "").toLowerCase();
    const textToMatch = `${nameLower} ${descLower}`;
    
    let originalCategories = [...product.categories];
    let newCategories = new Set(product.categories);
    
    for (const rule of mappingRules) {
      const matches = rule.keywords.some(k => textToMatch.includes(k));
      if (matches) {
        rule.categories.forEach(c => newCategories.add(c));
      }
    }
    
    const finalCategories = Array.from(newCategories);
    if (finalCategories.length > originalCategories.length) {
      await prisma.product.update({
        where: { id: product.id },
        data: { categories: finalCategories }
      });
      updatedCount++;
    }
  }
  
  console.log(`Successfully updated categories for ${updatedCount} products in the database!`);
  
  // Print new count
  const allProducts = await prisma.product.findMany({});
  const categoriesMap = {};
  allProducts.forEach(p => {
    p.categories.forEach(c => {
      categoriesMap[c] = (categoriesMap[c] || 0) + 1;
    });
  });
  console.log('New Distinct Categories in DB:', categoriesMap);
  
  prisma.$disconnect();
  pool.end();
}

run();
