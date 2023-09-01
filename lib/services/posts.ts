import { User } from "@prisma/client";
import { prisma } from "../db/db";

export const getAllPosts = async (user: User | null) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      author: {
        select: {
          image: true,
          name: true,
        },
      },
      likes: {
        select: {
          authorId: true,
          type: true,
          createdAt:true,
          author: {
            select: {
              image: true,
              name: true,
            },
          },
        },
      }
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