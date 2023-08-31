import NextAuth,{type NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";
import {JWT} from "next-auth/jwt";
import {prisma} from "@/lib/db/db";
export const authOptions:NextAuthOptions = {
    adapter:PrismaAdapter(prisma) as Adapter,
    session:{
        strategy:"jwt",
    },
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        session: async ({ session, token }:{session:any,token:JWT}) => {
            if (session?.user) {
                session.user.id = token.uid;
            }
            return session;
        },
        jwt: async ({ user, token }) => {
            if (user) {
                token.uid = user.id;
                console.log(token,"token");
            }
            return token;
        },

    },
}

const handler = NextAuth(authOptions);
export {handler as GET,handler as POST};