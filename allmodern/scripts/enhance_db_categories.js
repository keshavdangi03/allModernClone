require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

// Use non-pooled connection for script execution if it's a pooled connection to avoid PgBouncer transaction limits
const connectionString = process.env.DATABASE_URL.replace('-pooler', '');
const pool = new Pool({ connectionString });
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
  try {
    const products = await prisma.product.findMany({});
    console.log(`Found ${products.length} products to analyze.`);
    
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
  } catch (error) {
    console.error("Error in enhance_db_categories script:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

run();
