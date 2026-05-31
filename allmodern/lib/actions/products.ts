"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

// Interface matching catalog.json & schema
export interface ProductData {
  id: string;
  name: string;
  subtitle?: string | null;
  price?: number | null;
  priceStr?: string | null;
  originalPrice?: number | null;
  origPriceStr?: string | null;
  extraText?: string | null;
  reviews?: number | null;
  rating?: number | null;
  badge?: string | null;
  image: string;
  categories: string[];
  slug?: string;
  description?: string | null;
  shortDescription?: string | null;
  images?: any;
  variants?: any;
  customAttributes?: any;
  additionalInfo?: any;
  body?: string | null;
}

export async function getProducts() {
  try {
    // 1. Check if we have products in database
    const count = await prisma.product.count();
    
    // 2. If empty, seed from catalog.json
    if (count === 0) {
      console.log("Postgres database is empty. Seeding catalog.json...");
      const catalogPath = path.join(process.cwd(), "public", "data", "catalog.json");
      if (fs.existsSync(catalogPath)) {
        const fileContent = fs.readFileSync(catalogPath, "utf-8");
        const catalogProducts: ProductData[] = JSON.parse(fileContent);
        
        // Prepare products data
        const prepared = catalogProducts.map((p, index) => {
          // Generate unique slug
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
            priceStr: p.priceStr || null,
            originalPrice: p.originalPrice ? parseFloat(p.originalPrice.toString()) : null,
            origPriceStr: p.origPriceStr || null,
            extraText: p.extraText || null,
            reviews: p.reviews || 0,
            rating: p.rating || 0.0,
            badge: p.badge || null,
            image: p.image || "/images/hero.png",
            categories: p.categories || [],
            slug,
            description: p.description || p.name,
            shortDescription: p.shortDescription || p.name,
            images: p.images || [],
            variants: p.variants || [],
            customAttributes: p.customAttributes || [],
            additionalInfo: p.additionalInfo || [],
            body: p.body || ""
          };
        });

        // Insert in chunks/bulk
        await prisma.product.createMany({
          data: prepared,
          skipDuplicates: true
        });
        
        console.log(`Successfully seeded ${prepared.length} products to Postgres!`);
      }
    }

    // 3. Return all products sorted by createdAt desc
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" }
    });
    return products;
  } catch (error) {
    console.error("Error in getProducts server action:", error);
    return [];
  }
}

export async function addProduct(data: ProductData) {
  try {
    const slugBase = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    const slug = `${slugBase}-${data.id || Date.now()}`;

    const newProduct = await prisma.product.create({
      data: {
        id: data.id || `custom_${Date.now()}`,
        name: data.name,
        subtitle: data.subtitle || null,
        price: data.price ? parseFloat(data.price.toString()) : null,
        priceStr: data.priceStr || null,
        originalPrice: data.originalPrice ? parseFloat(data.originalPrice.toString()) : null,
        origPriceStr: data.origPriceStr || null,
        extraText: data.extraText || null,
        reviews: data.reviews || 0,
        rating: data.rating || 0.0,
        badge: data.badge || null,
        image: data.image || "/images/hero.png",
        categories: data.categories || [],
        slug,
        description: data.description || "",
        shortDescription: data.shortDescription || "",
        images: data.images || [],
        variants: data.variants || [],
        customAttributes: data.customAttributes || [],
        additionalInfo: data.additionalInfo || [],
        body: data.body || ""
      }
    });

    revalidatePath("/products");
    revalidatePath("/");
    return { success: true, product: newProduct };
  } catch (error: any) {
    console.error("Error in addProduct server action:", error);
    return { success: false, error: error.message };
  }
}

export async function updateProduct(id: string, data: ProductData) {
  try {
    const slugBase = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    const slug = `${slugBase}-${id}`;

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        subtitle: data.subtitle || null,
        price: data.price ? parseFloat(data.price.toString()) : null,
        priceStr: data.priceStr || null,
        originalPrice: data.originalPrice ? parseFloat(data.originalPrice.toString()) : null,
        origPriceStr: data.origPriceStr || null,
        extraText: data.extraText || null,
        reviews: data.reviews || 0,
        rating: data.rating || 0.0,
        badge: data.badge || null,
        image: data.image || "/images/hero.png",
        categories: data.categories || [],
        slug,
        description: data.description || "",
        shortDescription: data.shortDescription || "",
        images: data.images || [],
        variants: data.variants || [],
        customAttributes: data.customAttributes || [],
        additionalInfo: data.additionalInfo || [],
        body: data.body || ""
      }
    });

    revalidatePath("/products");
    revalidatePath("/");
    return { success: true, product: updated };
  } catch (error: any) {
    console.error("Error in updateProduct server action:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id }
    });
    revalidatePath("/products");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error in deleteProduct server action:", error);
    return { success: false, error: error.message };
  }
}

export async function getProductBySlug(slug: string) {
  try {
    let product = await prisma.product.findUnique({
      where: { slug }
    });
    if (!product) {
      product = await prisma.product.findUnique({
        where: { id: slug }
      });
    }
    return product;
  } catch (error) {
    console.error("Error in getProductBySlug server action:", error);
    return null;
  }
}
