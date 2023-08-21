import { JWTSession } from "../types/JWTSession";
import { TURBO_TRACE_DEFAULT_MEMORY_LIMIT } from "next/dist/shared/lib/constants";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth"
//import prisma
import { prisma } from "../db/db";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

export const getAuthenticatedUser = async () => {
    const session = await getServerSession(authOptions) as JWTSession;
    if(!session){
        console.log("signin")
        redirect("/api/auth/signin");
    }
    //get user from Database
    const user = await prisma.user.findUnique({
        where:{
            id:session!.user.id,
        },
    });
    //if user not defined, redirect to sign in page
    if(!user){
        signIn(
            "google",{
                redirect:true,
                callbackUrl:process.env.APP_URL + "/api/auth/signin",
            }
        )
        return user;
    }
    //return user
    return user;
}