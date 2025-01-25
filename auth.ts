import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma/prisma";
import authConfig from "./auth.config";
import { getUserbyId } from "./data/user";
import { getAccountUserId } from "./data/account";

export const { auth, handlers: { GET, POST }, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    ...authConfig,

    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") {
                return true; // Allow non-credential providers like Google
            }

            const existingUser = await getUserbyId(user.id ?? "");

            if (!existingUser) {
                return false; // Deny sign-in if user not found
            }
            return true; // Allow sign-in if user exists
        },

        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserbyId(token.sub);

            if (!existingUser) return token;

            const existingAccount = await getAccountUserId(existingUser.id);

            token.isOauth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.image = existingUser.image;

            return token;
        },

        async session({ token, session }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                    isOauth: token.isOauth,
                }
            };
        },

        // Redirect after login

    }
});
