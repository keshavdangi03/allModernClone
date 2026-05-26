import { NextResponse } from "next/server";
import { Pool } from "pg";
import { categoryMenus } from "@/components/layout/navigation-data";

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_mi7elKWvxhq9@ep-bitter-leaf-ao1doyw9-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
  max: 3,
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, title, description, image, badge, color, sections, "metaTitle", "metaDescription", "metaKeywords", "createdAt", "updatedAt"
       FROM "Category"
       ORDER BY "createdAt" ASC`
    );
    
    // Auto-backfill empty descriptions in the DB for default categories if they are null/empty
    for (const cat of result.rows) {
      if (cat.description === null || cat.description === "") {
        const menuKey = Object.keys(categoryMenus).find(
          (k) => k.toLowerCase() === cat.title.toLowerCase() || 
                 k.toLowerCase() === cat.id.toLowerCase()
        );
        const menuData = menuKey ? (categoryMenus as any)[menuKey] : null;
        if (menuData && menuData.description) {
          try {
            await pool.query(
              `UPDATE "Category" SET description = $1 WHERE id = $2`,
              [menuData.description, cat.id]
            );
            cat.description = menuData.description;
          } catch (e: any) {
            console.error(`Failed to backfill description for category ${cat.id}:`, e.message);
          }
        }
      }
    }
    
    const categories = result.rows.map(cat => ({
      ...cat,
      sections: typeof cat.sections === 'string' ? JSON.parse(cat.sections) : cat.sections
    }));
    
    return NextResponse.json(categories);
  } catch (error: any) {
    console.error("[API /admin/categories] Error:", error.message, error.stack);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
