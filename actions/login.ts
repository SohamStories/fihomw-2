"use server";

import { signIn } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (data: z.infer<typeof LoginSchema>) => {

        // Directly parse and validate the data
        const validatedData = LoginSchema.parse(data);
        const { email, password } = validatedData;

        // Find user from database
        const userExists = await prisma.user.findFirst({
            where: { email: email },
        });

        // Check if user exists and has a password
        if (!userExists || !userExists.password) {
            return { error: "User Not Found" };
        }

        try {

            
            // Attempt to sign in using credentials
            await signIn("credentials", {
                email: userExists.email,
                password,
                redirectTo: '/dashboard'// Handle redirect manually
            })
        }
         catch (error) {
        // Handle Zod validation errors
      if(error instanceof AuthError) {

        switch (error.type) {
            case "CredentialsSignin" :
                return {
                    error: "Invalid Credentials "
                };
                default: 
                return {
                    error: "Please confirm your email address"
                };
        }
      
    }
    throw error;
}
return {success: "User Login successfully!"}
}