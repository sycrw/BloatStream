import { Prisma } from "@prisma/client";

export type LikeFull = Prisma.LikeGetPayload<{
  include: {
    post: true;
    author: true;
  };
}>;
