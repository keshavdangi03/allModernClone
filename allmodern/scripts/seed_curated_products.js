require('dotenv').config({ path: '.env' });
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const { PrismaClient } = require('@prisma/client');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const curatedProducts = [
  // === BEDROOM COLLECTIONS ===
  { id: "finnian-1", name: "Finnian Solid Wood Bed", price: 2299, originalPrice: null, badge: null, image: "/images/cat_bedroom.png", categories: ["Furniture", "Furniture > Beds", "Bedroom Collections"] },
  { id: "finnian-2", name: "Finnian 2 - Drawer Nightstand", price: 459, originalPrice: 579, badge: null, image: "/images/cat_living_room.png", categories: ["Furniture", "Furniture > Nightstands", "Bedroom Collections"] },
  { id: "finnian-3", name: "Finnian 6 Drawer Dresser", price: 1499, originalPrice: 1799, badge: null, image: "/images/cat_outdoor.png", categories: ["Furniture", "Furniture > Dressers + Armoires", "Bedroom Collections"] },
  { id: "finnian-4", name: "Finnian 5 - Drawer Dresser", price: 1099, originalPrice: 1799, badge: null, image: "/images/hero.png", categories: ["Furniture", "Furniture > Dressers + Armoires", "Bedroom Collections"] },
  { id: "finnian-5", name: "Finnian 3 - Drawer Nightstand", price: 599, originalPrice: 749, badge: null, image: "/images/cat_dining.png", categories: ["Furniture", "Furniture > Nightstands", "Bedroom Collections"] },

  { id: "mari-1", name: "Mari 60 in. W Quartz 4 Drawer Double Bathroom Vanity", price: 2281, originalPrice: 2593, badge: null, image: "/images/cat_living_room.png", categories: ["Bath", "Bath > Bathroom Fixtures + Hardware", "Bedroom Collections"] },
  { id: "mari-2", name: "Mari 60\" Sideboard", price: 1789, originalPrice: 1899, badge: null, image: "/images/cat_outdoor.png", categories: ["Furniture", "Furniture > Sideboards + Buffets", "Bedroom Collections"] },
  { id: "mari-3", name: "Mari 60\" 6-Drawer Dresser", price: 1899, originalPrice: 2199, badge: null, image: "/images/hero.png", categories: ["Furniture", "Furniture > Dressers + Armoires", "Bedroom Collections"] },
  { id: "mari-4", name: "Mari 21 in. W Rectangular Wood 2 Drawer Nightstand", price: 649, originalPrice: 749, badge: null, image: "/images/cat_bedroom.png", categories: ["Furniture", "Furniture > Nightstands", "Bedroom Collections"] },

  { id: "nori-1", name: "Nori 7 - Drawer Dresser", price: 1499, originalPrice: 1849, badge: null, image: "/images/cat_outdoor.png", categories: ["Furniture", "Furniture > Dressers + Armoires", "Bedroom Collections"] },
  { id: "nori-2", name: "Nori 2 - Drawer Nightstand", price: 579, originalPrice: 729, badge: null, image: "/images/hero.png", categories: ["Furniture", "Furniture > Nightstands", "Bedroom Collections"] },
  { id: "nori-3", name: "Nori 1 - Drawer Nightstand in Jet Black", price: 629, originalPrice: 699, badge: null, image: "/images/cat_living_room.png", categories: ["Furniture", "Furniture > Nightstands", "Bedroom Collections"] },
  { id: "nori-4", name: "Nori 5 - Drawer Dresser", price: 1549, originalPrice: 1799, badge: null, image: "/images/cat_bedroom.png", categories: ["Furniture", "Furniture > Dressers + Armoires", "Bedroom Collections"] },
  { id: "nori-5", name: "Nori Solid Wood Platform Bed", price: 2699, originalPrice: null, badge: null, image: "/images/cat_dining.png", categories: ["Furniture", "Furniture > Beds", "Bedroom Collections"] },

  { id: "paloma-1", name: "Paloma 2 - Drawer Nightstand", price: 399, originalPrice: 449, badge: null, image: "/images/cat_dining.png", categories: ["Furniture", "Furniture > Nightstands", "Bedroom Collections"] },
  { id: "paloma-2", name: "Paloma 5 - Drawer Dresser", price: 1199, originalPrice: 1349, badge: null, image: "/images/hero.png", categories: ["Furniture", "Furniture > Dressers + Armoires", "Bedroom Collections"] },
  { id: "paloma-3", name: "Paloma 6 - Drawer Dresser", price: 1399, originalPrice: 1499, badge: null, image: "/images/cat_outdoor.png", categories: ["Furniture", "Furniture > Dressers + Armoires", "Bedroom Collections"] },
  { id: "paloma-4", name: "Paloma 3 - Drawer Dresser", price: 999, originalPrice: 1099, badge: null, image: "/images/cat_living_room.png", categories: ["Furniture", "Furniture > Dressers + Armoires", "Bedroom Collections"] },
  { id: "paloma-5", name: "Paloma 62\" Sideboard", price: 1399, originalPrice: 1549, badge: null, image: "/images/cat_bedroom.png", categories: ["Furniture", "Furniture > Sideboards + Buffets", "Bedroom Collections"] },

  { id: "wil-1", name: "Williams 2-Drawer Nightstand", price: 259, originalPrice: 319, badge: null, image: "/images/hero.png", categories: ["Furniture", "Furniture > Nightstands", "Bedroom Collections"] },
  { id: "wil-2", name: "Williams 2-Drawer Nightstand with Shelf", price: 309, originalPrice: 349, badge: null, image: "/images/cat_outdoor.png", categories: ["Furniture", "Furniture > Nightstands", "Bedroom Collections"] },
  { id: "wil-3", name: "Williams 7-Drawer Dresser", price: 1199, originalPrice: 1499, badge: null, image: "/images/cat_living_room.png", categories: ["Furniture", "Furniture > Dressers + Armoires", "Bedroom Collections"] },
  { id: "wil-4", name: "Williams 2-Drawer Mini Nightstand", price: 259, originalPrice: 299, badge: null, image: "/images/cat_bedroom.png", categories: ["Furniture", "Furniture > Nightstands", "Bedroom Collections"] },
  { id: "wil-5", name: "Williams Upholstered Bed", price: 849, originalPrice: 899, badge: null, image: "/images/cat_dining.png", categories: ["Furniture", "Furniture > Beds", "Bedroom Collections"] },

  // === SOFA & SECTIONAL COLLECTIONS ===
  { id: "daylen-1", name: "Daylen 86\" Upholstered Sofa", price: 1049, originalPrice: 1249, badge: null, image: "/images/cat_living_room.png", categories: ["Furniture", "Furniture > Sofas", "Sofa + Sectional Collections"] },
  { id: "daylen-2", name: "Daylen 2 - Piece Genuine Leather Reversible L-Sectional", price: 2399, originalPrice: 2599, badge: null, image: "/images/cat_bedroom.png", categories: ["Furniture", "Furniture > Sectionals", "Sofa + Sectional Collections"] },
  { id: "daylen-3", name: "Daylen Upholstered Armchair", price: 549, originalPrice: 579, badge: null, image: "/images/cat_outdoor.png", categories: ["Furniture", "Furniture > Accent + Lounge Chairs", "Sofa + Sectional Collections"] },
  { id: "daylen-4", name: "Daylen Upholstered Armchair", price: 1049, originalPrice: 1199, badge: null, image: "/images/cat_dining.png", categories: ["Furniture", "Furniture > Accent + Lounge Chairs", "Sofa + Sectional Collections"] },
  { id: "daylen-5", name: "Daylen 2-Piece Upholstered Reversible L-Sectional", price: 1199, originalPrice: 1399, badge: null, image: "/images/hero.png", categories: ["Furniture", "Furniture > Sectionals", "Sofa + Sectional Collections"] },

  { id: "morrell-1", name: "Morrell 5 - Piece Upholstered Reversible L-Sectional", price: 3399, originalPrice: 4299, badge: null, image: "/images/cat_living_room.png", categories: ["Furniture", "Furniture > Sectionals", "Sofa + Sectional Collections"] },
  { id: "morrell-2", name: "Morrell 3 - Piece Genuine Leather Sofa", price: 2899, originalPrice: 3499, badge: null, image: "/images/cat_bedroom.png", categories: ["Furniture", "Furniture > Sofas", "Sofa + Sectional Collections"] },
  { id: "morrell-3", name: "Morrell Genuine Leather Sofa", price: 2098, originalPrice: 2499, badge: null, image: "/images/cat_outdoor.png", categories: ["Furniture", "Furniture > Sofas", "Sofa + Sectional Collections"] },

  { id: "rae-l-1", name: "Rae Genuine Leather Upholstered Sofa", price: 2299, originalPrice: null, badge: null, image: "/images/cat_bedroom.png", categories: ["Furniture", "Furniture > Sofas", "Sofa + Sectional Collections"] },
  { id: "rae-l-2", name: "Rae Genuine Leather Upholstered Armchair", price: 1099, originalPrice: 1249, badge: null, image: "/images/cat_living_room.png", categories: ["Furniture", "Furniture > Accent + Lounge Chairs", "Sofa + Sectional Collections"] },

  { id: "rae-f-1", name: "Rae Upholstered Armchair", price: 849, originalPrice: 949, badge: null, image: "/images/cat_living_room.png", categories: ["Furniture", "Furniture > Accent + Lounge Chairs", "Sofa + Sectional Collections"] },
  { id: "rae-f-2", name: "Rae Upholstered Armchair (Set of 2)", price: 1398, originalPrice: 1599, badge: null, image: "/images/cat_bedroom.png", categories: ["Furniture", "Furniture > Accent + Lounge Chairs", "Sofa + Sectional Collections"] },
  { id: "rae-f-3", name: "Rae 84\" Upholstered Sofa", price: 1499, originalPrice: 1699, badge: null, image: "/images/cat_outdoor.png", categories: ["Furniture", "Furniture > Sofas", "Sofa + Sectional Collections"] },
  { id: "rae-f-4", name: "Rae Genuine Leather Upholstered Sofa", price: 2299, originalPrice: null, badge: null, image: "/images/cat_dining.png", categories: ["Furniture", "Furniture > Sofas", "Sofa + Sectional Collections"] },
  { id: "rae-f-5", name: "Rae 60\" Upholstered Loveseat", price: 1299, originalPrice: null, badge: null, image: "/images/hero.png", categories: ["Furniture", "Furniture > Sofas", "Sofa + Sectional Collections"] },

  // === OUTDOOR COLLECTIONS ===
  { id: "ari-1", name: "Ari 4-Piece Outdoor Rounded Aluminum Seating Group", price: 1057, originalPrice: 1850, badge: "Limited Time Only", image: "/images/cat_living_room.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },
  { id: "ari-2", name: "Ari 47\" Aluminum Outdoor Coffee Table", price: 199, originalPrice: 399, badge: "Limited Time Only", image: "/images/cat_dining.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },
  { id: "ari-3", name: "Ari 4-Piece Outdoor Rounded Aluminum Seating Group", price: 4318, originalPrice: 4999, badge: "Sale", image: "/images/cat_bedroom.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },

  { id: "emmett-1", name: "Emmett 83\" Eucalyptus Outdoor Sofa", price: 1199, originalPrice: 1799, badge: "Limited Time Only", image: "/images/cat_living_room.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },
  { id: "emmett-2", name: "Emmett Eucalyptus Outdoor 4 Piece Lounge Set", price: 2599, originalPrice: 3799, badge: "Limited Time Only", image: "/images/cat_bedroom.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },
  { id: "emmett-3", name: "Emmett 48\" Eucalyptus Patio Coffee Table", price: 209, originalPrice: 319, badge: "Limited Time Only", image: "/images/cat_outdoor.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },
  { id: "emmett-4", name: "Emmett Eucalyptus Outdoor Lounge Chair", price: 549, originalPrice: 949, badge: "Limited Time Only", image: "/images/cat_dining.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },
  { id: "emmett-5", name: "Emmett Eucalyptus Outdoor Lounge Chairs (Set of 2)", price: 899, originalPrice: 1899, badge: "Limited Time Only", image: "/images/hero.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },

  { id: "lanie-1", name: "Lanie 53\" Eucalyptus Outdoor Loveseat", price: 699, originalPrice: 899, badge: null, image: "/images/cat_living_room.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },
  { id: "lanie-2", name: "Lanie Eucalyptus Patio Chair With Cushion - Set Of 2", price: 398, originalPrice: 1098, badge: null, image: "/images/cat_bedroom.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },
  { id: "lanie-3", name: "Lanie Eucalyptus Patio Chair with Cushion", price: 429, originalPrice: 549, badge: null, image: "/images/cat_outdoor.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },
  { id: "lanie-4", name: "Lanie Eucalyptus Outdoor Sofa Set", price: 1676, originalPrice: 2699, badge: null, image: "/images/cat_dining.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },
  { id: "lanie-5", name: "Lanie 39\" Eucalyptus Outdoor Coffee Table", price: 579, originalPrice: 799, badge: null, image: "/images/hero.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },

  { id: "poly-1", name: "POLYWOOD x AllModern Folding Plastic Adirondack Chair", price: 279, originalPrice: 309, badge: null, image: "/images/cat_outdoor.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },
  { id: "poly-2", name: "POLYWOOD x AllModern Oversized Plastic Adirondack Chair", price: 312, originalPrice: 344, badge: null, image: "/images/cat_living_room.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },
  { id: "poly-3", name: "POLYWOOD x AllModern Plastic Adirondack Chair", price: 269, originalPrice: 299, badge: null, image: "/images/cat_bedroom.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },
  { id: "poly-4", name: "Modern Adirondack Rocker", price: 489, originalPrice: null, badge: null, image: "/images/cat_dining.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },
  { id: "poly-5", name: "POLYWOOD Captain Chaise", price: 789, originalPrice: null, badge: null, image: "/images/hero.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },

  { id: "farrah-1", name: "Farrah Outdoor Stacking Dining Side Chair (Set of 2)", price: 229, originalPrice: 399, badge: "Limited Time Only", image: "/images/cat_living_room.png", categories: ["Outdoor", "Outdoor > Outdoor Dining > Dining Accessories", "Outdoor Collections"] },
  { id: "farrah-2", name: "Farrah Stacking Patio Dining Side Chair (Set of 2)", price: 279, originalPrice: 369, badge: "Limited Time Only", image: "/images/cat_bedroom.png", categories: ["Outdoor", "Outdoor > Outdoor Dining > Dining Accessories", "Outdoor Collections"] },
  { id: "farrah-3", name: "Farrah Stacking Patio Dining Side Chair (Set of 2)", price: 239, originalPrice: 399, badge: "Sale", image: "/images/cat_outdoor.png", categories: ["Outdoor", "Outdoor > Outdoor Dining > Dining Accessories", "Outdoor Collections"] },
  { id: "farrah-4", name: "Farrah Premium All-Weather Outdoor Stacking Dining Armchair (Set of 2)", price: 369, originalPrice: 399, badge: "Limited Time Only", image: "/images/cat_dining.png", categories: ["Outdoor", "Outdoor > Outdoor Dining > Dining Accessories", "Outdoor Collections"] },
  { id: "farrah-5", name: "Farrah Outdoor Stacking Dining Side Chair (Set of 2)", price: 319, originalPrice: 349, badge: "Limited Time Only", image: "/images/hero.png", categories: ["Outdoor", "Outdoor > Outdoor Dining > Dining Accessories", "Outdoor Collections"] },

  { id: "kaly-1", name: "Kaly Aluminum Outdoor Lounge Chair", price: 1547, originalPrice: null, badge: null, image: "/images/cat_outdoor.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },
  { id: "kaly-2", name: "Kaly 90.6\" Wide Curved Patio Sofa with Cushions", price: 2598, originalPrice: 2738, badge: null, image: "/images/cat_dining.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },
  { id: "kaly-3", name: "Kaly 90.6\" Wide Curved Aluminum Patio Sofa with Cushions", price: 2762, originalPrice: 3699, badge: null, image: "/images/cat_bedroom.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },

  { id: "louise-1", name: "Louise Acacia Outdoor Armless Lounge Chair", price: 309, originalPrice: 399, badge: "Limited Time Only", image: "/images/cat_living_room.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },
  { id: "louise-2", name: "Louise 39.5\" Outdoor Coffee Table", price: 189, originalPrice: 249, badge: "Sale", image: "/images/cat_bedroom.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },
  { id: "louise-3", name: "Louise Acacia Outdoor Armless Lounge Chair (Set of 2)", price: 729, originalPrice: 849, badge: "Limited Time Only", image: "/images/cat_outdoor.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },
  { id: "louise-4", name: "Louise Acacia 4 - Person Patio Conversation Set with Cushions", price: 1206, originalPrice: 1399, badge: "Limited Time Only", image: "/images/cat_dining.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] },
  { id: "louise-5", name: "Louise 43\" Wide Loveseat with Cushions", price: 399, originalPrice: 449, badge: "Limited Time Only", image: "/images/hero.png", categories: ["Outdoor", "Outdoor > Outdoor Furniture", "Outdoor Collections"] }
];

async function seed() {
  console.log("Starting Seeding of Curated Products...");
  try {
    for (const item of curatedProducts) {
      const slugBase = item.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      const slug = `${slugBase}-${item.id}`;

      await prisma.product.upsert({
        where: { id: item.id },
        update: {
          name: item.name,
          price: item.price,
          originalPrice: item.originalPrice,
          badge: item.badge,
          image: item.image,
          categories: item.categories,
          slug: slug,
          description: `Expertly curated ${item.name}. Part of our beautiful ${item.categories[2] || 'Home Collections'}. High quality materials, contemporary design, built to last.`,
          shortDescription: `${item.name} offers mid-century and modern premium styling for your home.`
        },
        create: {
          id: item.id,
          name: item.name,
          price: item.price,
          originalPrice: item.originalPrice,
          badge: item.badge,
          image: item.image,
          categories: item.categories,
          slug: slug,
          description: `Expertly curated ${item.name}. Part of our beautiful ${item.categories[2] || 'Home Collections'}. High quality materials, contemporary design, built to last.`,
          shortDescription: `${item.name} offers mid-century and modern premium styling for your home.`
        }
      });
    }
    console.log("Successfully seeded", curatedProducts.length, "curated products!");
  } catch (error) {
    console.error("Error during seeding curated products:", error);
  } finally {
    await prisma.$disconnect();
    pool.end();
  }
}

seed();
