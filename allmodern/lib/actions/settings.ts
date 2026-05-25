"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- SEO Settings ---

export async function getSeoSettings() {
  return await prisma.seoSettings.findUnique({
    where: { id: "default" }
  });
}

export async function updateSeoSettings(data: any) {
  const result = await prisma.seoSettings.upsert({
    where: { id: "default" },
    update: {
      title: data.title,
      description: data.description,
      keywords: data.keywords,
    },
    create: {
      id: "default",
      title: data.title,
      description: data.description,
      keywords: data.keywords,
    }
  });
  revalidatePath("/", "layout");
  return result;
}

// --- Header Settings ---

export async function getHeaderSettings() {
  return await prisma.headerSettings.findUnique({
    where: { id: "default" }
  });
}

export async function updateHeaderSettings(data: any) {
  const result = await prisma.headerSettings.upsert({
    where: { id: "default" },
    update: {
      promoBarText: data.promoBarText,
      promoBarLink: data.promoBarLink,
      supportEmail: data.supportEmail,
      supportPhone: data.supportPhone,
    },
    create: {
      id: "default",
      promoBarText: data.promoBarText,
      promoBarLink: data.promoBarLink,
      supportEmail: data.supportEmail,
      supportPhone: data.supportPhone,
    }
  });
  revalidatePath("/", "layout");
  return result;
}

// --- Countdown ---

export async function getCountdown() {
  return await prisma.countdown.findUnique({
    where: { id: "default" }
  });
}

export async function updateCountdown(data: any) {
  const result = await prisma.countdown.upsert({
    where: { id: "default" },
    update: {
      enabled: data.enabled,
      endDate: data.endDate,
      title: data.title,
      color: data.color,
    },
    create: {
      id: "default",
      enabled: data.enabled,
      endDate: data.endDate,
      title: data.title,
      color: data.color,
    }
  });
  revalidatePath("/", "layout");
  return result;
}
