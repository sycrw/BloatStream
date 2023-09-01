"use client";

import Image from "next/image";
import { Like } from "@prisma/client";
import { LikeEnum } from "@/lib/types/enums/likes";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ReactionBarProps {
  user: LikeEnum;
  postId: number;
  likesList: Like[];
}

const ReactionBar = ({ user, postId, likesList }: ReactionBarProps) => {
  //bar with like and dislike buttons, and buttons to redirect to see more about who liked/disliked
  const [userReaction, setUserReaction] = useState<LikeEnum>(user);
  const [likesAmout, setLikesAmount] = useState<number>(
    likesList.filter((like: any) => like.type).length
  );
  const [dislikesAmount, setDislikesAmount] = useState<number>(
    likesList.filter((like: any) => like.type === false).length
  );
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const handleUserReaction = (type: LikeEnum) => {
    if (type === LikeEnum.NULL) {
      throw new Error("User reaction cannot be null");
    }
    const isRemove: boolean = userReaction === type;
    if (type == LikeEnum.DISLIKE) {
      if (userReaction == LikeEnum.LIKE) {
        setLikesAmount(likesAmout - 1);
        setDislikesAmount(dislikesAmount + 1);
        setUserReaction(LikeEnum.DISLIKE);
      }
      if (userReaction == LikeEnum.NULL) {
        setDislikesAmount(dislikesAmount + 1);
        setUserReaction(LikeEnum.DISLIKE);
      }
      if (userReaction == LikeEnum.DISLIKE) {
        setDislikesAmount(dislikesAmount - 1);
        setUserReaction(LikeEnum.NULL);
      }
    }
    if (type == LikeEnum.LIKE) {
      if (userReaction == LikeEnum.DISLIKE) {
        setLikesAmount(likesAmout + 1);
        setDislikesAmount(dislikesAmount - 1);
        setUserReaction(LikeEnum.LIKE);
      }
      if (userReaction == LikeEnum.NULL) {
        setLikesAmount(likesAmout + 1);
        setUserReaction(LikeEnum.LIKE);
      }
      if (userReaction == LikeEnum.LIKE) {
        setLikesAmount(likesAmout - 1);
        setUserReaction(LikeEnum.NULL);
      }
    }
    //post request to update like/dislike
    fetch(`/api/posts/${postId}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: !isRemove ? type : "REMOVE",
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong! Your Like Wasnt Registered");
      })
      .then((data) => {
        router.refresh();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const openModal = () => {
    const modal: any = document.getElementById(`likes${postId}`);
    modal?.showModal();
  };
  console.log(likesList);

  return (
    <>
      <div className="flex justify-between items-center shadow-md rounded-md p-1">
        <div className="flex justify-between items-center">
          <button
            className="btn btn-ghost btn-circle btn-sm"
            onClick={() => handleUserReaction(LikeEnum.LIKE)}
          >
            {userReaction == LikeEnum.DISLIKE ||
            userReaction == LikeEnum.NULL ? (
              <img src="heart.svg" alt="" />
            ) : (
              <img src="heart.fill.svg" alt="" />
            )}
          </button>
          <button
            className="btn btn-ghost btn-circle btn-sm"
            onClick={() => openModal()}
          >
            {likesAmout}
          </button>
        </div>
        <div className="flex justify-between items-center">
          <button
            className="btn btn-ghost btn-circle btn-sm"
            onClick={() => handleUserReaction(LikeEnum.DISLIKE)}
          >
            {userReaction == LikeEnum.LIKE || userReaction == LikeEnum.NULL ? (
              <img src="hand.thumbsdown.svg" alt="" />
            ) : (
              <img src="hand.thumbsdown.fill.svg" alt="" />
            )}
          </button>
          <button
            className="btn btn-ghost btn-circle btn-sm"
            onClick={() => openModal()}
          >
            {dislikesAmount}
          </button>
        </div>
        {/* error */}
      </div>
      <div className="w-full text-center">
        {error && <p className=" text-red-500">{error}</p>}
      </div>
      <dialog id={`likes${postId}`} className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Likes/Dislikes</h3>
          {/* list container */}
          <div>
            <ul className="divide-y divide-gray-200">
              {likesList.map((like: any, i: number) => {
                const date = new Date(like.createdAt);
                return (
                  <li className="py-4 flex justify-between" key={i}>
                    <div className="flex ">
                      <Image
                        unoptimized
                        src={like.author.image}
                        width={40}
                        height={40}
                        alt="image"
                        className=" rounded-full w-10 h-10"
                      ></Image>
                      <div className="flex flex-row">
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {like.author.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {date.toUTCString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    {like.type ? (
                      //make the image keep its original size
                      <Image
                        src={"/heart.fill.svg"}
                        width={20}
                        height={20}
                        alt="image"
                        className="w-5 h-5"
                      ></Image>
                    ) : (
                      <Image
                        src={"/hand.thumbsdown.fill.svg"}
                        width={20}
                        height={20}
                        alt="image"
                        className="w-5 h-5"
                      ></Image>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default ReactionBar;
