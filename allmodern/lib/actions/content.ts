"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Content Pages (Privacy, Terms) ---

export async function getContentPage(id: string) {
  return await prisma.contentPage.findUnique({
    where: { id }
  });
}

export async function updateContentPage(id: string, data: any) {
  const result = await prisma.contentPage.upsert({
    where: { id },
    update: {
      title: data.title,
      subtitle: data.subtitle,
      content: data.content,
    },
    create: {
      id,
      title: data.title,
      subtitle: data.subtitle,
      content: data.content,
    }
  });
  revalidatePath(`/${id.replace("_", "-")}`); // e.g., /privacy-policy
  return result;
}

// --- Testimonials ---

export async function getTestimonials() {
  return await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export async function addTestimonial(data: any) {
  const result = await prisma.testimonial.create({
    data: {
      name: data.name,
      designation: data.designation,
      rating: data.rating,
      comment: data.comment,
      avatar: data.avatar || null,
    }
  });
  revalidatePath("/");
  return result;
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  return { success: true };
}

// --- Hero Banners ---

export async function getHeroBanners() {
  return await prisma.heroBanner.findMany({
    orderBy: { createdAt: "asc" }
  });
}

export async function addHeroBanner(data: any) {
  const result = await prisma.heroBanner.create({
    data: {
      title: data.title,
      subtitle: data.subtitle,
      image: data.image,
      ctaText: data.ctaText,
      ctaLink: data.ctaLink,
    }
  });
  revalidatePath("/");
  return result;
}

export async function updateHeroBanner(id: string, data: any) {
  const result = await prisma.heroBanner.update({
    where: { id },
    data: {
      title: data.title,
      subtitle: data.subtitle,
      image: data.image,
      ctaText: data.ctaText,
      ctaLink: data.ctaLink,
    }
  });
  revalidatePath("/");
  return result;
}

export async function deleteHeroBanner(id: string) {
  await prisma.heroBanner.delete({ where: { id } });
  revalidatePath("/");
  return { success: true };
}

// --- Hero Slider ---

export async function getHeroSliders() {
  return await prisma.heroSlider.findMany({
    orderBy: { createdAt: "asc" }
  });
}

export async function addHeroSlider(data: any) {
  const result = await prisma.heroSlider.create({
    data: {
      name: data.name,
      image: data.image,
      link: data.link,
    }
  });
  revalidatePath("/");
  return result;
}

export async function updateHeroSlider(id: string, data: any) {
  const result = await prisma.heroSlider.update({
    where: { id },
    data: {
      name: data.name,
      image: data.image,
      link: data.link,
    }
  });
  revalidatePath("/");
  return result;
}

export async function deleteHeroSlider(id: string) {
  await prisma.heroSlider.delete({ where: { id } });
  revalidatePath("/");
  return { success: true };
}
