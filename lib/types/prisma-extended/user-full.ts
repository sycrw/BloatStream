import { Prisma } from "@prisma/client";

export type UserFull = Prisma.UserGetPayload<{
  include: {
    posts: {
        include: {
            likes: true;
        }
    };
    Like: true;
    Notifications: true;
  };
}>;
