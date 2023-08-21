import { User } from "@prisma/client";
import { prisma } from "../db/db";

export const getAllPosts = async (user: User) => {
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
    },
  });
  return posts;
};
