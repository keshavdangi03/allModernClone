import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { categoryMenus } from "@/components/layout/navigation-data";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "asc" },
    });
    // Backfill descriptions if missing
    for (const cat of categories) {
      if (!cat.description) {
        const menuKey = Object.keys(categoryMenus).find(
          (k) => k.toLowerCase() === cat.title.toLowerCase() || k.toLowerCase() === cat.id.toLowerCase()
        );
        const menuData = menuKey ? (categoryMenus as any)[menuKey] : null;
        if (menuData && menuData.description) {
          try {
            await prisma.category.update({
              where: { id: cat.id },
              data: { description: menuData.description },
            });
            cat.description = menuData.description;
          } catch (e: any) {
            console.error(`Failed to backfill description for category ${cat.id}:`, e.message);
          }
        }
      }
    }
    const result = categories.map((cat: any) => ({
      ...cat,
      sections: typeof cat.sections === "string" ? JSON.parse(cat.sections) : cat.sections,
    }));
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[API /admin/categories] Error:", error.message, error.stack);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
