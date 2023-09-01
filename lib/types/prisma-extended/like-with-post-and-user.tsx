import { Prisma } from "@prisma/client";

export type LikeWithPostAndUser = Prisma.LikeGetPayload<{
  include: {
    post: true;
    author: true;
  };
}>;
