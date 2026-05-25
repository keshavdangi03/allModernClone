import { NextResponse } from "next/server";
import { Pool } from "pg";

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
      `SELECT id, title, image, badge, color, sections, "createdAt", "updatedAt"
       FROM "Category"
       ORDER BY "createdAt" ASC`
    );
    
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
