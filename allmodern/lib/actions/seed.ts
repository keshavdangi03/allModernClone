"use server";

import { prisma } from "@/lib/prisma";
import { departmentNavItems, categoryMenus } from "@/components/layout/navigation-data";

export async function seedDatabaseIfEmpty() {
  // Check if categories exist
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
  }

  // Check if SeoSettings exist
  const seoCount = await prisma.seoSettings.count();
  if (seoCount === 0) {
    await prisma.seoSettings.create({
      data: {
        id: "default",
        title: "AllModern - Modern Furniture & Home Decor",
        description: "Shop AllModern for everything to fit your modern lifestyle.",
        keywords: "furniture, home decor, modern, living room, bedroom, outdoor",
      }
    });
  }

  // Check if HeaderSettings exist
  const headerCount = await prisma.headerSettings.count();
  if (headerCount === 0) {
    await prisma.headerSettings.create({
      data: {
        id: "default",
        promoBarText: "Up to 60% Off | 48-Hour Markdowns",
        promoBarLink: "/sale",
        supportEmail: "service@allmodern.com",
        supportPhone: "1-800-123-4567",
      }
    });
  }

  // Check if Countdown exists
  const countdownCount = await prisma.countdown.count();
  if (countdownCount === 0) {
    await prisma.countdown.create({
      data: {
        id: "default",
        enabled: false,
        endDate: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
        title: "Sale Ends In:",
        color: "#1f2937",
      }
    });
  }
}
