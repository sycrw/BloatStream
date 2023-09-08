import Image from "next/image";
import { NotificationFull } from "@/lib/types/prisma-extended/notification-full";
import { NotificationType } from "@prisma/client";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  notification: NotificationFull;
}

const SingleNotification = ({ notification }: Props) => {
  const router = useRouter();
  const notificationMessage = () => {
    switch (notification.type) {
      case NotificationType.Like:
        return `${notification.relatedUser!.name} liked your post`;
      case NotificationType.Dislike:
        return `${notification.relatedUser!.name} disliked your post`;
      case NotificationType.Follow:
        return `${notification.relatedUser!.name} followed you`;
      case NotificationType.Post:
        return `${notification.relatedUser!.name} posted`;
      default:
        return "error";
    }
  };
  const [seen, setSeen] = useState(notification.seen);
  const RedirectUser = () => {
    if (
      notification.type === NotificationType.Like ||
      notification.type === NotificationType.Dislike
    ) {
      router.push(`/post/${notification.relatedPost!.id}`);
    } else if (notification.type === NotificationType.Follow) {
      router.push(`/user/${notification.relatedUser!.id}`);
    } else if (notification.type === NotificationType.Post) {
      router.push(`/post/${notification.relatedPost!.id}`);
    }
  };

  const handleClick = () => {
    //PUT to update notification to seen
    fetch(`/api/notifications/${notification.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          setSeen(true);
        } else {
          console.log("error");
        }
      })
      .then(() => {
        router.refresh();
        RedirectUser();
      });
  };

  return (
    <li
      className={`py-4 flex justify-between w-full hover:bg-slate-50 `}
      onClick={() => handleClick()}
    >
      <div className="flex justify-start items-center ">
        <Image
          className="h-10 w-10 rounded-full"
          src={notification.relatedUser!.image!}
          alt=""
          unoptimized
          width={40}
          height={40}
        />
        <div className="ml-3">
          <h1 className="text-l font-medium text-gray-900">
            {notificationMessage()}
          </h1>
          <p className="text-sm text-gray-500">
            {notification.createdAt.toUTCString()}
          </p>
        </div>
      </div>
      <div className="w-3/12">
        {/* if not seen blue dot */}
        {!seen && (
          <div className="flex justify-center items-center h-full">
            <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
          </div>
        )}
      </div>
    </li>
  );
};

export default SingleNotification;
