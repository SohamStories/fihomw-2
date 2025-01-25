"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/prisma/prisma";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    // Validate input data
    const { email, name, password, passwordconfirmation } = RegisterSchema.parse(data);

    // Check if passwords match
    if (password !== passwordconfirmation) {
      return {
        error: "Passwords do not match.",
      };
    }

    // Hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (hashError) {
      console.error("Error hashing password:", hashError);
      return {
        error: "Failed to process your password. Please try again.",
      };
    }

    // Normalize email to lowercase
    const lowercaseEmail = email.toLowerCase();

    // Check if user already exists (case-insensitive email check)
    const userExists = await prisma.user.findFirst({
      where: {
        email: lowercaseEmail,
      },
    });

    if (userExists) {
      return {
        error: "This email is already registered. Please use another email.",
      };
    }

    // Create a new user
    const user = await prisma.user.create({
      data: {
        email: lowercaseEmail,
        name,
        password: hashedPassword,
      },
    });

    return {
      success: "User created successfully!",
    };
  } catch (error) {
    console.error("Error during registration:", error);

    // Handle specific Prisma errors
    if ((error as { code: string }).code === "P2002") {
      // Prisma's unique constraint error
      return {
        error: "This email is already registered. Please use another email.",
      };
    } else if ((error as { code: string }).code === "P1001") {
      // Prisma database timeout
      return {
        error: "Unable to connect to the database. Please try again later.",
      };
    }

    // Handle unexpected errors
    return {
      error: "An unexpected error occurred. Please try again.",
    };
  }
};
