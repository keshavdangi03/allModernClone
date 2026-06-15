import { NextResponse } from "next/server";
import { Pool } from "pg";

// Use pg directly — bypass Prisma adapter for this route to avoid SSR pool issues
let connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_Cq5f2oXJUYiQ@ep-snowy-dust-ao57p5ia-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

if (connectionString.includes("ep-bitter-leaf-ao1doyw9")) {
  connectionString = "postgresql://neondb_owner:npg_Cq5f2oXJUYiQ@ep-snowy-dust-ao57p5ia-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
}

const pool = new Pool({
  connectionString,
  max: 3,
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, name, price, "originalPrice", image, categories, slug, reviews, "discountedPrice", badge, subtitle
       FROM "Product"
       ORDER BY "createdAt" DESC`
    );
    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error("[API /admin/products] Error:", error.message, error.stack);
    return NextResponse.json(
      { error: error.message, detail: error.detail || "" },
      { status: 500 }
    );
  }
}
