import { Prisma } from "@prisma/client";

export type PostFull = Prisma.PostGetPayload<{
  include: {
    likes: true;
    author: true;
  };
}>;
