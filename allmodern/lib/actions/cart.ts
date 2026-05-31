"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCart(guestToken: string | null, email: string | null) {
  try {
    if (!guestToken && !email) {
      return [];
    }

    let userId: string | null = null;

    if (email) {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (user) {
        userId = user.id;

        // Merge guest items if guestToken exists
        if (guestToken) {
          const guestItems = await prisma.cartItem.findMany({
            where: { guestToken, userId: null },
          });

          for (const guestItem of guestItems) {
            const existingUserItem = await prisma.cartItem.findFirst({
              where: {
                userId: user.id,
                productId: guestItem.productId,
                color: guestItem.color,
                protection: guestItem.protection,
              },
            });

            if (existingUserItem) {
              // Combine quantities and delete duplicate guest item
              await prisma.cartItem.update({
                where: { id: existingUserItem.id },
                data: { quantity: existingUserItem.quantity + guestItem.quantity },
              });
              await prisma.cartItem.delete({
                where: { id: guestItem.id },
              });
            } else {
              // Relink guest item to authenticated user
              await prisma.cartItem.update({
                where: { id: guestItem.id },
                data: { userId: user.id, guestToken: null },
              });
            }
          }
        }
      }
    }

    // Query cart items
    const items = await prisma.cartItem.findMany({
      where: userId
        ? { userId }
        : { guestToken: guestToken || undefined, userId: null },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return items;
  } catch (error) {
    console.error("Error in getCart server action:", error);
    return [];
  }
}

export async function addToCart(
  productId: string,
  quantity: number,
  color: string | null,
  protection: boolean,
  guestToken: string | null,
  email: string | null
) {
  try {
    if (!guestToken && !email) {
      throw new Error("No cart identifier provided (guest token or email).");
    }

    let userId: string | null = null;
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (user) {
        userId = user.id;
      }
    }

    // Check if item already exists in cart with same configurations
    const existingItem = await prisma.cartItem.findFirst({
      where: userId
        ? {
            userId,
            productId,
            color,
            protection,
          }
        : {
            guestToken,
            userId: null,
            productId,
            color,
            protection,
          },
    });

    if (existingItem) {
      const updated = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: { product: true },
      });
      return { success: true, item: updated };
    } else {
      const newItem = await prisma.cartItem.create({
        data: {
          userId,
          guestToken: userId ? null : guestToken,
          productId,
          quantity,
          color,
          protection,
        },
        include: { product: true },
      });
      return { success: true, item: newItem };
    }
  } catch (error: any) {
    console.error("Error in addToCart server action:", error);
    return { success: false, error: error.message };
  }
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  try {
    if (quantity <= 0) {
      await prisma.cartItem.delete({
        where: { id: itemId },
      });
      return { success: true, deleted: true };
    }

    const updated = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
      include: { product: true },
    });

    return { success: true, item: updated };
  } catch (error: any) {
    console.error("Error in updateCartItemQuantity server action:", error);
    return { success: false, error: error.message };
  }
}

export async function removeFromCart(itemId: string) {
  try {
    await prisma.cartItem.delete({
      where: { id: itemId },
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error in removeFromCart server action:", error);
    return { success: false, error: error.message };
  }
}

export async function updateCartItemProtection(itemId: string, protection: boolean) {
  try {
    const updated = await prisma.cartItem.update({
      where: { id: itemId },
      data: { protection },
      include: { product: true },
    });
    return { success: true, item: updated };
  } catch (error: any) {
    console.error("Error in updateCartItemProtection server action:", error);
    return { success: false, error: error.message };
  }
}
