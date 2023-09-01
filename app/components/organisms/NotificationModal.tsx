"use client";

import { Notification } from "@prisma/client";
import { NotificationFull } from "@/lib/types/prisma-extended/notification-full";
import SingleNotification from "../molecules/SingleNotification";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface NotificationModalProps {
  notifications: NotificationFull[];
}

const NotificationModal = ({ notifications }: NotificationModalProps) => {
  const searchParams = useSearchParams();
  const active: boolean = searchParams.get("notificationModal") === "true";
  const router = useRouter();
  //hooks for data
  const [error, setError] = useState<string>("");

  function deleteAllNotifications(): void {
    //api request to delete all notifications
    setError("");
    fetch(`/api/notifications`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        router.replace("?notificationModal=false");
        router.refresh();
      } else {
        setError("Error deleting notifications");
      }
    });
  }

  function markAllAsSeen(): void {
    setError("");
    fetch(`/api/notifications`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          setError("Error marking notifications as seen");
        }
      })
      .then(() => {
        console.log("mark all as seen");
        window.location.reload();
      });
  }

  return (
    active && (
      <dialog id="my_modal_2" className="modal modal-open ">
        <form method="dialog" className="modal-box flex flex-col">
          <h2 className="text-2xl font-bold text-center mb-2">Notifications</h2>
          {/* buttons to delete or mark all as seen */}
          <div className="flex justify-evenly items-center">
            <button
              className="btn btn-ghost"
              onClick={() => deleteAllNotifications()}
            >
              Delete All
            </button>
            <button className="btn btn-ghost" onClick={() => markAllAsSeen()}>
              Mark All
            </button>
          </div>
          <p className="text-s text-red-500">{error || ""}</p>
          <ul className="divide-y divide-gray-200 w-full">
            {notifications.map((notification, i: number) => {
              return <SingleNotification notification={notification} key={i} />;
            })}
          </ul>
        </form>
        <form
          method="dialog"
          className="modal-backdrop"
          onClick={() => {
            //set urlSearchParams to false
            router.replace("?notificationModal=false");
          }}
        ></form>
      </dialog>
    )
  );
};

export default NotificationModal;
