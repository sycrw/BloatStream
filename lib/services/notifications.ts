import { NotificationType } from "@prisma/client";
import { prisma } from "../db/db";
import { threadId } from "worker_threads";

export const getNotifications = async (userId: string) => {
    const notifications = await prisma.notification.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            relatedPost:true,
            relatedLike:true,
            relatedUser:true,
        },
        
    });
    return notifications;
};



interface CreateNotificationProps {
    userId: string;
    type: NotificationType;
    relatedPostId?: number;
    relatedLikeId?: number;
    relatedUserId?: string;
}

export const createNotification = async ({userId,type,relatedLikeId,relatedPostId,relatedUserId}:CreateNotificationProps) => {
    
    //change between different types of notifications
    if(type == NotificationType.Like || type == NotificationType.Dislike){
        //check if relatedLikeId and relatedPostId and relatedUserId are defined
        if(!relatedLikeId || !relatedPostId || !relatedUserId){
            throw new Error("relatedLikeId, relatedPostId and relatedUserId must be defined");
        }
        //create notification
        const notification = await prisma.notification.create({
            data:{
                type:type,
                userId:userId,
                relatedLikeId:relatedLikeId,
                relatedPostId:relatedPostId,
                relatedUserId:relatedUserId,
            },
        });
        return notification;
    }
}