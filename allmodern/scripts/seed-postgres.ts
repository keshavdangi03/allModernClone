import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { departmentNavItems, categoryMenus } from "../components/layout/navigation-data";

const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_mi7elKWvxhq9@ep-bitter-leaf-ao1doyw9-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=verify-full";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seed() {
  console.log("Starting PostgreSQL database seeding...");

  try {
    // 1. Categories
    const categoryCount = await prisma.category.count();
    if (categoryCount === 0) {
      console.log("Seeding initial categories...");
      const initialCategories = departmentNavItems.map((navItem) => {
        const menuKey = Object.keys(categoryMenus).find(
          (k) => k.toLowerCase() === navItem.label.toLowerCase()
        );
        const menuData = menuKey ? (categoryMenus as any)[menuKey] : null;
        return {
          id: navItem.href.replace("/", "") || navItem.label.toLowerCase().replace(/\s+/g, "-"),
          title: navItem.label,
          description: menuData?.description || "",
          image: menuData?.image || "/images/hero.png",
          badge: menuData?.badge || "",
          color: navItem.label === "Sale" ? "#e43216" : "",
          sections: JSON.stringify(menuData?.sections || []),
        };
      });

      for (const cat of initialCategories) {
        await prisma.category.create({ data: cat });
      }
      console.log(`Seeded ${initialCategories.length} categories.`);
    } else {
      console.log("Categories already exist, skipping.");
    }

    // 2. SeoSettings
    const seoCount = await prisma.seoSettings.count();
    if (seoCount === 0) {
      console.log("Seeding SEO Settings...");
      await prisma.seoSettings.create({
        data: {
          id: "default",
          title: "AllModern - Modern Furniture & Home Decor",
          description: "Shop AllModern for everything to fit your modern lifestyle.",
          keywords: "furniture, home decor, modern, living room, bedroom, outdoor",
        }
      });
      console.log("Seeded SEO settings.");
    }

    // 3. HeaderSettings
    const headerCount = await prisma.headerSettings.count();
    if (headerCount === 0) {
      console.log("Seeding Header Settings...");
      await prisma.headerSettings.create({
        data: {
          id: "default",
          promoBarText: "Up to 60% Off | 48-Hour Markdowns",
          promoBarLink: "/sale",
          supportEmail: "service@allmodern.com",
          supportPhone: "1-800-123-4567",
        }
      });
      console.log("Seeded Header settings.");
    }

    // 4. Countdown
    const countdownCount = await prisma.countdown.count();
    if (countdownCount === 0) {
      console.log("Seeding Countdown...");
      await prisma.countdown.create({
        data: {
          id: "default",
          enabled: false,
          endDate: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
          title: "Sale Ends In:",
          color: "#1f2937",
        }
      });
      console.log("Seeded Countdown settings.");
    }

    // 5. Content Pages (Privacy Policy, Terms of Service)
    const contentPageCount = await prisma.contentPage.count();
    if (contentPageCount === 0) {
      console.log("Seeding Content Pages...");
      await prisma.contentPage.create({
        data: {
          id: "privacy-policy",
          title: "Privacy Policy",
          subtitle: "Your privacy is important to us",
          content: "This is the privacy policy for AllModern. We value your trust and are committed to protecting your personal data.",
        }
      });
      await prisma.contentPage.create({
        data: {
          id: "terms",
          title: "Terms & Conditions",
          subtitle: "Please read these terms carefully",
          content: "Welcome to AllModern. By using our website, you agree to comply with and be bound by these terms and conditions.",
        }
      });
      console.log("Seeded Content pages.");
    }

    // 6. Products Seeding
    console.log("Cleaning up existing products in database...");
    await prisma.product.deleteMany({});
    console.log("Seeding products from catalog.json...");
      const catalogPath = path.join(__dirname, "..", "public", "data", "catalog.json");
      if (fs.existsSync(catalogPath)) {
        const fileContent = fs.readFileSync(catalogPath, "utf-8");
        const catalogProducts = JSON.parse(fileContent);

        const prepared = catalogProducts.map((p: any, index: number) => {
          const slugBase = p.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
          const slug = `${slugBase}-${p.id || index}`;

          return {
            id: p.id || `product_${index}_${Date.now()}`,
            name: p.name,
            subtitle: p.subtitle || null,
            price: p.price ? parseFloat(p.price.toString()) : null,
            discountedPrice: p.discountedPrice ? parseFloat(p.discountedPrice.toString()) : (p.originalPrice ? parseFloat(p.originalPrice.toString()) : null),
            priceStr: p.priceStr || null,
            originalPrice: p.originalPrice ? parseFloat(p.originalPrice.toString()) : null,
            origPriceStr: p.origPriceStr || null,
            extraText: p.extraText || null,
            reviews: p.reviews ? parseInt(p.reviews.toString(), 10) : 0,
            rating: p.rating ? parseFloat(p.rating.toString()) : 0.0,
            badge: p.badge || null,
            image: p.image || "/images/hero.png",
            categories: p.categories || [],
            slug,
            description: p.description || p.name,
            shortDescription: p.shortDescription || p.name,
            images: p.images || [],
            variants: p.colors || p.variants || [],
            customAttributes: p.customAttributes || [],
            additionalInfo: p.additionalInfo || [],
            body: p.body || ""
          };
        });

        await prisma.product.createMany({
          data: prepared,
          skipDuplicates: true
        });
        console.log(`Successfully seeded ${prepared.length} products!`);
      } else {
        console.warn(`Catalog file not found at ${catalogPath}, skipping product seeding.`);
      }

    // Seeding Admin User
    const adminEmail = "admin@admin.np";
    const adminUser = await prisma.user.findUnique({
      where: { email: adminEmail }
    });
    if (!adminUser) {
      console.log("Seeding superuser admin...");
      const salt = crypto.randomBytes(16).toString("hex");
      const hash = crypto.pbkdf2Sync("admin123", salt, 1000, 64, "sha512").toString("hex");
      const hashedPassword = `${salt}:${hash}`;
      
      await prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          phone: "9876543210",
          role: "admin"
        }
      });
      console.log("Seeded superuser admin (admin@admin.np / admin123).");
    } else {
      console.log("Superuser admin already exists, skipping.");
    }

    console.log("PostgreSQL Database Seeding Completed Successfully.");
  } catch (error) {
    console.error("Error seeding PostgreSQL database:", error);
  } finally {
    await prisma.$disconnect();
    pool.end();
  }
}

seed();
