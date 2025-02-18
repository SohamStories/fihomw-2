"use server";

import { signIn } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (data: z.infer<typeof LoginSchema>) => {
    const validatedData = LoginSchema.parse(data);
    const { email, password } = validatedData;

    const userExists = await prisma.user.findFirst({
        where: { email },
    });

    if (!userExists || !userExists.password) {
        return { error: "User Not Found" };
    }

    try {
        const result = await signIn("credentials", {
            email: userExists.email,
            password,
            redirect: false, // ✅ Prevent automatic redirects
        });

        if (result?.error) {
            return { error: "Invalid Credentials" };
        }

        // ✅ Return success with a redirect URL
        return { success: "User logged in successfully!", redirectUrl: "/dashboard" };
    } catch (error) {
        if (error instanceof AuthError) {
            return {
                error: error.type === "CredentialsSignin" ? "Invalid Credentials" : "Please confirm your email address",
            };
        }
        throw error;
    }
};
