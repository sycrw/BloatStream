import { Follows } from "@prisma/client";
import { prisma } from "../db/db";

export async function followUser(followerId:string, followingId:string):Promise<Follows> {
    const follow = await prisma.follows.create({
        data: {
            followerId,
            followingId,
        }
    });
    return follow;
}

export async function unfollowUser(followerId:string, followingId:string) {
    await prisma.follows.deleteMany({
        where: {
            followerId,
            followingId,
        }
    });
}

export async function checkIfUserFollows(followerId:string, followingId:string):Promise<boolean> {
    const follow = await prisma.follows.findFirst({
        where: {
            followerId,
            followingId,
        }
    });
    return follow !== null;
}
