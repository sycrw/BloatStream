"use client";

import { Like } from "@/lib/types/enums/likes";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RatingButtonProps {
  art: Like;
  PostId: number;
  value: number;
  active: boolean;
  onError: (error: string) => void;
}

const RatingButton = ({
  art,
  PostId,
  value,
  active,
  onError,
}: RatingButtonProps) => {
  const router = useRouter();
  const postLike = () => {
    const removed = active;
    onError("");
    fetch(`/api/posts/${PostId}/likes`, {
      method: "POST",
      body: JSON.stringify({
        type: removed ? "REMOVE" : art === Like.LIKE ? "LIKE" : "DISLIKE",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        console.log(data);
        //refresh the page
        router.refresh();
      })
      .catch((error) => {
        onError(error.message);
      });
  };

  return (
    <button
      onClick={postLike}
      className={`flex bg-transparent border-none text-gray-600 ${
        art === Like.LIKE ? "like" : art === Like.DISLIKE ? "dislike" : ""
      } 
      ${
        active && art === Like.LIKE
          ? "likeActive"
          : active && art === Like.DISLIKE
          ? "dislikeActive"
          : ""
      }
      `}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="19.248"
        height="20.5566"
        // className=" fill-gray-500 m-2"
      >
        <g>
          <rect height="20.5566" opacity="0" width="19.248" x="0" y="0" />
          <path d="M0 13.7402C0 16.6309 1.80664 19.0527 4.22852 19.0527L5.94727 19.0527C4.18945 17.7734 3.4668 15.8398 3.4668 13.6426C3.47656 11.2012 4.42383 9.45312 5.26367 8.39844L3.86719 8.39844C1.68945 8.39844 0 10.7422 0 13.7402ZM4.81445 13.6621C4.81445 17.2266 7.59766 19.9805 12.1387 19.9805L13.4668 19.9805C14.7266 19.9805 15.6641 19.8926 16.1914 19.7461C16.9531 19.5605 17.6855 19.0918 17.6855 18.1738C17.6855 17.793 17.5879 17.5195 17.4707 17.3145C17.3926 17.1875 17.4121 17.0898 17.5293 17.041C18.1348 16.7871 18.6328 16.2207 18.6328 15.4492C18.6328 15.0098 18.5059 14.6191 18.291 14.3555C18.1836 14.209 18.1934 14.0723 18.3789 13.9746C18.8086 13.7207 19.1211 13.1738 19.1211 12.5391C19.1211 12.0801 18.9746 11.6016 18.7207 11.3672C18.5645 11.2305 18.5938 11.1328 18.75 10.9863C19.0527 10.7324 19.248 10.293 19.248 9.73633C19.248 8.79883 18.5156 8.02734 17.5488 8.02734L14.1113 8.02734C13.2422 8.02734 12.666 7.57812 12.666 6.85547C12.666 5.55664 14.2969 3.1543 14.2969 1.43555C14.2969 0.527344 13.7109 0 12.9492 0C12.2461 0 11.9043 0.478516 11.5332 1.21094C10.0781 4.0332 8.14453 6.31836 6.66992 8.27148C5.41992 9.93164 4.81445 11.3672 4.81445 13.6621Z" />
        </g>
      </svg>
      <p className=" m-2">{value}</p>
    </button>
  );
};

export default RatingButton;
