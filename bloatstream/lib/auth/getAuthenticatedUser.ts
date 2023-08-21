import { JWTSession } from "../types/JWTSession";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth"
//import prisma
import { prisma } from "../db/db";
import { redirect } from "next/navigation";

export const getAuthenticatedUser = async () => {
    const session = await getServerSession(authOptions) as JWTSession;
    if(!session){
        redirect(process.env.APP_URL + "/api/auth/signin");
    }
    //get user from Database
    const user = await prisma.user.findUnique({
        where:{
            id:session!.user.id,
        },
    });
    //if user not defined, redirect to sign in page
    if(!user){
        redirect(process.env.APP_URL + "/api/auth/signin");
    }
    //return user
    return user;
}