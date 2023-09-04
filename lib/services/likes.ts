import { prisma } from "../db/db";

export const getLikesCountToUserByUserId = async (userId: string):Promise<number> => {
    //get it where the post is from the user
    const likes = await prisma.like.count({
        where: {
            post: {
                authorId: userId,
            },
            type:true,
        }
    });
    return likes;
}
export const getDislikesCountToUserByUserId = async (userId: string):Promise<number> => {
    //get it where the post is from the user
    const likes = await prisma.like.count({
        where: {
            post: {
                authorId: userId,
            },
            type:false,
        }
    });
    return likes;
}
