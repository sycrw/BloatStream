import { NextRequest, NextResponse } from "next/server";

import { NotificationType } from "@prisma/client";
import { createNotification } from "@/lib/services/notifications";
import { getAuthenticatedUser } from '@/lib/services/user';
import { prisma } from "@/lib/db/db";

//post endpoint for creating a post
enum LikeType {
    LIKE = "LIKE",
    DISLIKE = "DISLIKE",
    REMOVE = "REMOVE"
}

export async function POST (req:NextRequest, res:NextResponse,) {
    //url = https://-----/api/posts/[id]/likes
    //get id from url
    const id = Number(req.url.split("/")[5]) ;
    const user = await getAuthenticatedUser();
    const data:{type:LikeType} = await req.json();
    
    //if type in data is not one of the enum values, return error
    if(!Object.values(LikeType).includes(data.type)){
        return NextResponse.json({error:"invalid type"}, {status: 400});
    }
    //if no PostId in data, return error
    if(!user){
        return NextResponse.json({error:"not authenticated"}, {status: 401});
    }
    //delete like if it exists
    //if post does not exist, return error
    const post = await prisma.post.findUnique({
        where:{
            id:id
        }
    })
    if(!post){
        return NextResponse.json({error:"post not found"}, {status: 404});
    }

    let dbres = await prisma.like.deleteMany({
        where:{
            authorId:user.id,
            postId:id
        }
    })
    //if type is not REMOVE, create a new like
    let like;
    if(data.type !== LikeType.REMOVE){
        like = await prisma.like.create({
            data:{
                type: data.type === LikeType.LIKE ? true : false,
                authorId:user.id,
                postId:id
            }
        })
    }
    //create notification
    if(data.type !== LikeType.REMOVE){
    const notification = createNotification({
        userId:post.authorId,
        type: data.type === LikeType.LIKE ? NotificationType.Like : NotificationType.Dislike,
        relatedLikeId:like?.id,
        relatedPostId:post.id,
        relatedUserId:user.id
    })
    }

   return NextResponse.json({dbres},{status: 201});
}
