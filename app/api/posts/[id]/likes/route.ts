import { NextRequest, NextResponse } from "next/server";

import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";
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
console.log(id,"id");
    const user = await getAuthenticatedUser();
    const data:{type:LikeType} = await req.json();
    console.log(data);
    
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

    const dbres = await prisma.like.deleteMany({
        where:{
            authorId:user.id,
            postId:id
        }
    })
    console.log(dbres);
    //if type is not REMOVE, create a new like
    if(data.type !== LikeType.REMOVE){
        const dbres = await prisma.like.create({
            data:{
                type: data.type === LikeType.LIKE ? true : false,
                authorId:user.id,
                postId:id
            }
        })
        console.log(dbres);
    }

   return NextResponse.json({action: data.type},{status: 201});
}
