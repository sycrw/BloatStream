import { LikeFull } from "../types/prisma-extended/like-full";
import { PostFull } from "../types/prisma-extended/post-full";
import { User } from "@prisma/client";
import { prisma } from "../db/db";

export const getAllPosts = async (user: User | null):Promise<PostFull[]> => {
  const posts = await prisma.post.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      author: true,
      likes: {
        include: {
          author: true,
        },
      },
    },
  });
  return posts;
};

export const getPostById = async (postId: number) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(postId),
    },
    include: {
      //include everything
      author:true,
      likes:true,
    },
  });
  return post;
};

export const getAmountOfPostsByUserId = async (userId: string) => {
  const amount = await prisma.post.count({
    where: {
      authorId: userId,
    },
  });
  return amount;
}

export const getPostsOfUser = async (userId: string):Promise<PostFull[]> => {
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    include: {
      likes:{
        include:{
          author:true,
        }
      },
      author:true,
    },
  });
  return posts;
}