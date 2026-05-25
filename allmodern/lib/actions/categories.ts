"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "asc" }
  });
  
  return categories.map(cat => ({
    ...cat,
    sections: JSON.parse(cat.sections)
  }));
}

export async function addCategory(data: any) {
  const cat = await prisma.category.create({
    data: {
      id: data.id,
      title: data.title,
      image: data.image || null,
      badge: data.badge || null,
      color: data.color || null,
      sections: JSON.stringify(data.sections || []),
    }
  });
  revalidatePath("/admin/categories");
  revalidatePath("/"); // Storefront
  return cat;
}

export async function updateCategory(id: string, data: any) {
  const updateData: any = {};
  if (data.title !== undefined) updateData.title = data.title;
  if (data.image !== undefined) updateData.image = data.image;
  if (data.badge !== undefined) updateData.badge = data.badge;
  if (data.color !== undefined) updateData.color = data.color;
  if (data.sections !== undefined) updateData.sections = JSON.stringify(data.sections);

  const cat = await prisma.category.update({
    where: { id },
    data: updateData,
  });
  revalidatePath("/admin/categories");
  revalidatePath("/");
  return cat;
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
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
        image: cat.image,
        badge: cat.badge,
        color: cat.color,
        sections: JSON.stringify(cat.sections || []),
      }
    });
  }
  revalidatePath("/admin/categories");
  revalidatePath("/");
  return { success: true };
}
