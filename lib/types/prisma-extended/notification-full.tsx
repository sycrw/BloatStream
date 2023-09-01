import { Prisma } from "@prisma/client";

export type NotificationFull = Prisma.NotificationGetPayload<{
  include: {
    relatedLike: true;
    relatedPost: true;
    relatedUser: true;
  };
}>;
