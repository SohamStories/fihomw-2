import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { prisma } from "./prisma/prisma";



export default {

    providers: [
        Google({

            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET|| "",

        }),
        Credentials({

            async authorize(credentials) {

                const validatedData = LoginSchema.safeParse(credentials);

                if(!validatedData.success) return null;

                const { email, password } = validatedData.data;

                const user = await prisma.user.findFirst({
                    where: {
                        email: email,
                    }
                });

                
                if(!user || !user.password || !user.email ){
                    return null;
                }

                const passwordmatch = await bcrypt.compare(password,user.password);

                if(passwordmatch) {
                    return user;
                }

                return null;
            }

             

        })
    ]
} satisfies NextAuthConfig