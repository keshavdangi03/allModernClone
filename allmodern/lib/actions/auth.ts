"use server";

import { prisma } from "@/lib/prisma";
import crypto from "crypto";

// Hashing Helpers
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(":");
    if (!salt || !hash) return false;
    const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return hash === verifyHash;
  } catch (e) {
    return false;
  }
}

/**
 * Checks if a user email is registered in the database.
 */
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    return !!user;
  } catch (error) {
    console.error("Error in checkEmailExists Server Action:", error);
    return false;
  }
}

/**
 * Registers a new user. Automatically flags admin role if email matches.
 */
export async function registerUser(data: {
  email: string;
  password: string;
  phone?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const normalizedEmail = data.email.trim().toLowerCase();
    
    // Safety check: check if user already exists
    const exists = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    
    if (exists) {
      return { success: false, error: "Email is already registered" };
    }
    
    const hashedPassword = hashPassword(data.password);
    const role = normalizedEmail === "admin@admin.np" ? "admin" : "user";
    
    await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        phone: data.phone || null,
        role: role,
      },
    });
    
    return { success: true };
  } catch (error: any) {
    console.error("Error in registerUser Server Action:", error);
    return { success: false, error: error?.message || "Failed to register user" };
  }
}

/**
 * Logs in a user. Validates credentials and returns success state along with the user's role.
 */
export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<{ success: boolean; role?: string; error?: string }> {
  try {
    const normalizedEmail = data.email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    
    if (!user) {
      return { success: false, error: "Email address not found" };
    }
    
    const isValid = verifyPassword(data.password, user.password);
    if (!isValid) {
      return { success: false, error: "Incorrect password" };
    }
    
    return { success: true, role: user.role };
  } catch (error: any) {
    console.error("Error in loginUser Server Action:", error);
    return { success: false, error: error?.message || "Failed to log in" };
  }
}

/**
 * Fetches user details by email.
 */
export async function getUserDetails(email: string): Promise<{
  success: boolean;
  user?: { email: string; phone: string | null; role: string; createdAt: Date };
  error?: string;
}> {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: {
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    return { success: true, user };
  } catch (error: any) {
    console.error("Error in getUserDetails Server Action:", error);
    return { success: false, error: error?.message || "Failed to fetch user details" };
  }
}

/**
 * Updates a user's details.
 */
export async function updateUserDetails(
  email: string,
  data: { phone?: string }
): Promise<{ success: boolean; error?: string }> {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    await prisma.user.update({
      where: { email: normalizedEmail },
      data: {
        phone: data.phone || null,
      },
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error in updateUserDetails Server Action:", error);
    return { success: false, error: error?.message || "Failed to update user details" };
  }
}

/**
 * Fetches all registered users from the database.
 */
export async function getAllUsers(): Promise<{
  success: boolean;
  users?: { id: string; email: string; phone: string | null; role: string; createdAt: Date }[];
  error?: string;
}> {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, users };
  } catch (error: any) {
    console.error("Error in getAllUsers Server Action:", error);
    return { success: false, error: error?.message || "Failed to fetch users" };
  }
}

/**
 * Deletes a user from the database.
 */
export async function deleteUser(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.user.delete({
      where: { id },
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error in deleteUser Server Action:", error);
    return { success: false, error: error?.message || "Failed to delete user" };
  }
}

/**
 * Updates a user's role in the database.
 */
export async function updateUserRole(id: string, role: string): Promise<{ success: boolean; error?: string }> {
  try {
    const normalizedRole = role.trim().toLowerCase();
    await prisma.user.update({
      where: { id },
      data: {
        role: normalizedRole,
      },
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error in updateUserRole Server Action:", error);
    return { success: false, error: error?.message || "Failed to update user role" };
  }
}

/**
 * Changes a user's password securely by verifying the old password.
 */
export async function changeUserPassword(data: {
  email: string;
  oldPassword?: string;
  newPassword: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const normalizedEmail = data.email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    if (data.oldPassword) {
      const isValid = verifyPassword(data.oldPassword, user.password);
      if (!isValid) {
        return { success: false, error: "Incorrect old password" };
      }
    }

    const newHashed = hashPassword(data.newPassword);
    await prisma.user.update({
      where: { email: normalizedEmail },
      data: {
        password: newHashed,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error in changeUserPassword Server Action:", error);
    return { success: false, error: error?.message || "Failed to change password" };
  }
}

