//post endpoint to make a new follow

import { NextRequest, NextResponse } from "next/server";

import { NotificationType } from "@prisma/client";
import { checkIfUserFollows } from "@/lib/services/follow";
import { createNotification } from "@/lib/services/notifications";
import { getAuthenticatedUser } from "@/lib/services/user";
import { prisma } from "@/lib/db/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const user = await getAuthenticatedUser();
  //get followerId from token
  const followerId = user.id;
  //get followingId from body
  const { followingId } = await req.json();
  //if no followingId, return error
  if (!followingId) {
    return NextResponse.json({ error: "no followingId" }, { status: 400 });
  }
  //if followingId is same as followerId, return error
  if (followingId === followerId) {
    return NextResponse.json(
      { error: "cannot follow yourself" },
      { status: 400 }
    );
  }
  //check if user already follows
  const alreadyFollows = await checkIfUserFollows(followerId, followingId);
  //if user already follows, return error
  if (alreadyFollows) {
    return NextResponse.json({ error: "already following" }, { status: 400 });
  }
  //if user does not follow, create follow
  const follow = await prisma.follows.create({
    data: {
      followerId,
      followingId,
    },
  });
  //new notification
  const notification = await createNotification({
    userId: followingId,
    type: NotificationType.Follow,
    relatedUserId: followerId,
  });
  console.log(notification, "notification");
  return NextResponse.json(follow, { status: 200 });
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const user = await getAuthenticatedUser();
  //get followerId from token
  const followerId = user.id;
  //get followingId from body
  const { followingId } = await req.json();
  //if no followingId, return error
  if (!followingId) {
    console.log("no followingId");
    return NextResponse.json({ error: "no followingId" }, { status: 400 });
  }
  //if followingId is same as followerId, return error
  if (followingId === followerId) {
    return NextResponse.json(
      { error: "cannot unfollow yourself" },
      { status: 400 }
    );
  }
  //check if user does not follow
  const alreadyFollows = await checkIfUserFollows(followerId, followingId);
  //if user does not follow, return error
  if (!alreadyFollows) {
    return NextResponse.json({ error: "not following" }, { status: 400 });
  }
  //if user does follow, delete follow
  await prisma.follows.deleteMany({
    where: {
      followerId: followerId,
      followingId: followingId,
    },
  });
  return NextResponse.json({ success: true }, { status: 200 });
}
