"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "asc" }
  });

  return categories.map((cat) => ({
    ...cat,
    sections: JSON.parse(cat.sections) as any[]
  }));
}

export async function addCategory(data: any) {
  const cat = await prisma.category.create({
    data: {
      id: data.id,
      title: data.title,
      description: data.description || null,
      image: data.image || null,
      badge: data.badge || null,
      color: data.color || null,
      sections: JSON.stringify(data.sections || []),
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      metaKeywords: data.metaKeywords || null,
    }
  });
  revalidatePath("/categories");
  revalidatePath("/"); // Storefront
  return cat;
}

export async function updateCategory(id: string, data: any) {
  const updateData: any = {};
  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.image !== undefined) updateData.image = data.image;
  if (data.badge !== undefined) updateData.badge = data.badge;
  if (data.color !== undefined) updateData.color = data.color;
  if (data.sections !== undefined) updateData.sections = JSON.stringify(data.sections);
  if (data.metaTitle !== undefined) updateData.metaTitle = data.metaTitle;
  if (data.metaDescription !== undefined) updateData.metaDescription = data.metaDescription;
  if (data.metaKeywords !== undefined) updateData.metaKeywords = data.metaKeywords;

  const cat = await prisma.category.update({
    where: { id },
    data: updateData,
  });
  revalidatePath("/categories");
  revalidatePath("/");
  return cat;
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({ where: { id } });
  revalidatePath("/categories");
  revalidatePath("/");
  return { success: true };
}

export async function resetCategories(initialCategories: any[]) {
  // Clear all
  await prisma.category.deleteMany({});
  
  // Re-insert
  for (const cat of initialCategories) {
    await prisma.category.create({
      data: {
        id: cat.id,
        title: cat.title,
        description: cat.description || null,
        image: cat.image,
        badge: cat.badge,
        color: cat.color,
        sections: JSON.stringify(cat.sections || []),
        metaTitle: cat.metaTitle || null,
        metaDescription: cat.metaDescription || null,
        metaKeywords: cat.metaKeywords || null,
      }
    });
  }
  revalidatePath("/categories");
  revalidatePath("/");
  return { success: true };
}
