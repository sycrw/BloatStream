//PUT request to update all notifications from unread to read

import { NextRequest, NextResponse } from "next/server";

import { getAuthenticatedUser } from "@/lib/services/user";
import { prisma } from "@/lib/db/db";

export async function PUT(req: NextRequest, res: NextResponse) {
    //get authenticated user
    //if no user, return error
    //if user, update all notifications
    //return notifications
    const user = await getAuthenticatedUser();
    if (!user) {
        return NextResponse.json({ error: "not authenticated" }, { status: 401 });
    }
    //check if notification already has been read
    const dbres = await prisma.notification.updateMany({
        where: {
            userId: user.id,
            seen: false,
        },
        data: {
            seen: true,
        },
    });
    return NextResponse.json(dbres, { status: 200 });  
}

//DELETE request to delete notification

export async function DELETE(req: NextRequest, res: NextResponse) {
    const user = await getAuthenticatedUser();
    if (!user) {
        return NextResponse.json({ error: "not authenticated" }, { status: 401 });
    }
    //deleta all notifications
    const dbres = await prisma.notification.deleteMany({
        where: {
            userId: user.id,
        },
    });
    return NextResponse.json(dbres, { status: 200 });
}
    