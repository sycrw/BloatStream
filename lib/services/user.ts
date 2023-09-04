import { JWTSession } from "../types/JWTSession";
import { User } from "@prisma/client";
import { UserFull } from "../types/prisma-extended/user-full";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth"
import { prisma } from "../db/db";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

export const getAuthenticatedUser = async ():Promise<User> => {
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
        await signIn(
            "google",{
                redirect:true,
                callbackUrl:process.env.APP_URL + "/",
            }
        )
        throw new Error("User not found");
    }
    //return user
    return user;
}

export const getUserById = async (id:string) => {
    const user = await prisma.user.findUnique({
        where:{
            id,
        },
    });
    if(!user){
        throw new Error("User not found");
    }
    return user
}
