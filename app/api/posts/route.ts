import { NextRequest, NextResponse } from "next/server";

import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";
import { prisma } from "@/lib/db/db";

//post endpoint for creating a post
export async function POST (req:NextRequest, res:NextResponse) {
    const user = await getAuthenticatedUser();
    const data:{content:string} = await req.json();

    if(!data.content || data.content.length === 0 || data.content === ""){
        return NextResponse.json({error:"content is required"}, {status: 400});
    }
    if(data.content.length > 500){
        return NextResponse.json({error:"content is too long"}, {status: 400});
    }
    if(!user){
        return NextResponse.json({error:"not authenticated"}, {status: 401});
    }

   const dbres = await prisma.post.create({
        data:{
            content:data.content,
            authorId:user.id,
            }
        }
    )
    console.log(dbres);
                


   return NextResponse.json({},{status: 201});


}
