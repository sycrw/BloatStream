import { NextRequest, NextResponse } from "next/server";

import { getAuthenticatedUser } from "@/lib/services/user";
import { prisma } from "@/lib/db/db";

//put request to update notification from unread to read
export async function PUT (req:NextRequest, res:NextResponse,) {
    //url = https://-----/api/notifications/[id]
    //get id from url
    const id = Number(req.url.split("/")[5]) ;
    //get authenticated user
    //if no user, return error
    //if user, update notification
    //return notification
    const user = await getAuthenticatedUser();
    if(!user){
        return NextResponse.json({error:"not authenticated"}, {status: 401});
    }
    //get notification
    const notification = await prisma.notification.findUnique({
        where:{
            id:Number(id)
        }
    })
    //if notification doesn't exist, return error or user doesn't own notification, return error
   if(!notification){
        return NextResponse.json({error:"notification doesn't exist"}, {status: 401});
   }    
    if(notification.userId != user.id){
        return NextResponse.json({error:"not authenticated"}, {status: 401});
    }
    const dbres = await prisma.notification.update({
        where:{
            id:id
        },
        data:{
            seen:true
        }
    })
    return NextResponse.json(dbres,{status:200});
}