"use client";

import Image from "next/image";
import { Like } from "@prisma/client";
import { LikeEnum } from "@/lib/types/enums/likes";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ReactionBarProps {
  likes: number;
  dislikes: number;
  user: LikeEnum;
  postId: number;
  likesList: any;
}

const ReactionBar = ({
  likes,
  dislikes,
  user,
  postId,
  likesList,
}: ReactionBarProps) => {
  //bar with like and dislike buttons, and buttons to redirect to see more about who liked/disliked
  const [userReaction, setUserReaction] = useState<LikeEnum>(user);
  const [likesAmout, setLikesAmount] = useState<number>(likes);
  const [dislikesAmount, setDislikesAmount] = useState<number>(dislikes);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const handleUserReaction = (type: LikeEnum) => {
    if (type === LikeEnum.NULL) {
      throw new Error("User reaction cannot be null");
    }
    console.log("user reaction", userReaction);
    console.log("type", type);
    const isRemove: boolean = userReaction === type;
    console.log("user is removing his reaction", isRemove);
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
        console.log(data);
        router.refresh();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  console.log("likes list", likesList);

  const openModal = () => {
    const modal: any = document.getElementById("likes");
    modal?.showModal();
  };

  return (
    <>
      <div className="flex justify-between items-center shadow-md rounded-md p-2">
        <div className="flex justify-between items-center">
          <button
            className="btn btn-ghost btn-circle btn-sm"
            onClick={() => handleUserReaction(LikeEnum.LIKE)}
          >
            {userReaction == LikeEnum.DISLIKE ||
            userReaction == LikeEnum.NULL ? (
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="19.3945"
                height="18.5254"
              >
                <g>
                  <rect
                    height="18.5254"
                    opacity="0"
                    width="19.3945"
                    x="0"
                    y="0"
                  />
                  <path
                    d="M0 6.49414C0 10.6543 3.48633 14.7461 8.99414 18.2617C9.19922 18.3887 9.49219 18.5254 9.69727 18.5254C9.90234 18.5254 10.1953 18.3887 10.4102 18.2617C15.9082 14.7461 19.3945 10.6543 19.3945 6.49414C19.3945 3.03711 17.0215 0.595703 13.8574 0.595703C12.0508 0.595703 10.5859 1.45508 9.69727 2.77344C8.82812 1.46484 7.34375 0.595703 5.53711 0.595703C2.37305 0.595703 0 3.03711 0 6.49414ZM1.57227 6.49414C1.57227 3.89648 3.25195 2.16797 5.51758 2.16797C7.35352 2.16797 8.4082 3.31055 9.0332 4.28711C9.29688 4.67773 9.46289 4.78516 9.69727 4.78516C9.93164 4.78516 10.0781 4.66797 10.3613 4.28711C11.0352 3.33008 12.0508 2.16797 13.877 2.16797C16.1426 2.16797 17.8223 3.89648 17.8223 6.49414C17.8223 10.127 13.9844 14.043 9.90234 16.7578C9.80469 16.8262 9.73633 16.875 9.69727 16.875C9.6582 16.875 9.58984 16.8262 9.50195 16.7578C5.41016 14.043 1.57227 10.127 1.57227 6.49414Z"
                    fill="#000000"
                    fillOpacity="0.85"
                  />
                </g>
              </svg>
            ) : (
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="19.3945"
                height="18.5254"
              >
                <g>
                  <rect
                    height="18.5254"
                    opacity="0"
                    width="19.3945"
                    x="0"
                    y="0"
                  />
                  <path
                    d="M9.69727 18.5254C9.90234 18.5254 10.1953 18.3887 10.4102 18.2617C15.9082 14.7461 19.3945 10.6543 19.3945 6.49414C19.3945 3.03711 17.0215 0.595703 13.9551 0.595703C12.0508 0.595703 10.5859 1.65039 9.69727 3.26172C8.82812 1.66016 7.34375 0.595703 5.43945 0.595703C2.37305 0.595703 0 3.03711 0 6.49414C0 10.6543 3.48633 14.7461 8.99414 18.2617C9.19922 18.3887 9.49219 18.5254 9.69727 18.5254Z"
                    fill="#FF0000"
                    fillOpacity="0.85"
                  />
                </g>
              </svg>
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
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="19.8926"
                height="21.2793"
              >
                <g>
                  <rect
                    height="21.2793"
                    opacity="0"
                    width="19.8926"
                    x="0"
                    y="0"
                  />
                  <path
                    d="M19.8926 6.85547C19.8926 3.69141 17.832 1.04492 15.3418 1.04492L12.2266 1.04492C10.9863 0.390625 9.48242 0 7.80273 0L6.49414 0C5.32227 0 4.30664 0.0683594 3.63281 0.244141C2.32422 0.556641 1.50391 1.47461 1.50391 2.62695C1.50391 2.86133 1.54297 3.08594 1.60156 3.29102C0.957031 3.78906 0.595703 4.49219 0.595703 5.2832C0.595703 5.66406 0.664062 6.03516 0.810547 6.34766C0.371094 6.79688 0.117188 7.45117 0.117188 8.13477C0.117188 8.57422 0.234375 9.04297 0.419922 9.38477C0.15625 9.76562 0 10.3027 0 10.8594C0 12.2754 1.10352 13.3887 2.50977 13.3887L6.07422 13.3887C6.28906 13.3887 6.42578 13.4863 6.42578 13.6719C6.42578 14.6875 4.82422 17.0703 4.82422 18.9844C4.82422 20.3027 5.74219 21.2402 7.00195 21.2402C7.92969 21.2402 8.55469 20.7617 9.16016 19.5898C10.3125 17.3828 11.6797 15.4199 13.9062 12.7051L15.6934 12.7051C18.0176 12.7051 19.8926 10.0781 19.8926 6.85547ZM14.3945 6.9043C14.3945 8.94531 13.9355 10.2441 12.666 11.9531C11.25 13.8379 9.27734 16.1133 7.87109 18.9258C7.50977 19.6289 7.28516 19.7949 6.94336 19.7949C6.54297 19.7949 6.26953 19.5117 6.26953 18.9844C6.26953 17.4512 7.87109 15.1465 7.87109 13.6719C7.87109 12.5977 6.99219 11.9434 5.86914 11.9434L2.50977 11.9434C1.9043 11.9434 1.44531 11.4844 1.44531 10.8594C1.44531 10.4102 1.58203 10.127 1.95312 9.76562C2.12891 9.60938 2.14844 9.4043 2.00195 9.22852C1.69922 8.7793 1.5625 8.50586 1.5625 8.13477C1.5625 7.68555 1.77734 7.31445 2.20703 6.98242C2.44141 6.80664 2.53906 6.5625 2.39258 6.26953C2.1582 5.83008 2.04102 5.625 2.04102 5.2832C2.04102 4.78516 2.36328 4.39453 3.04688 4.04297C3.26172 3.92578 3.31055 3.75 3.21289 3.53516C2.98828 2.95898 2.95898 2.87109 2.95898 2.62695C2.95898 2.17773 3.28125 1.81641 3.96484 1.64062C4.52148 1.49414 5.41016 1.43555 6.48438 1.43555L7.69531 1.43555C11.7188 1.44531 14.3945 3.73047 14.3945 6.9043ZM18.4473 6.85547C18.4473 9.27734 17.1387 11.2598 15.6934 11.2598C15.4102 11.2598 15.127 11.2598 14.8438 11.2598C15.5371 9.94141 15.8398 8.57422 15.8398 6.93359C15.8398 5.18555 15.2148 3.66211 14.0918 2.5C14.502 2.5 14.9219 2.5 15.3418 2.5C16.9922 2.5 18.4473 4.48242 18.4473 6.85547Z"
                    fill="#000000"
                    fillOpacity="0.85"
                  />
                </g>
              </svg>
            ) : (
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="19.2383"
                height="20.0111"
              >
                <g>
                  <rect
                    height="20.0111"
                    opacity="0"
                    width="19.2383"
                    x="0"
                    y="0"
                  />
                  <path
                    d="M19.2383 6.24091C19.2383 3.35028 17.4219 0.928406 15.0098 0.928406L13.291 0.928406C15.0488 2.2077 15.8301 4.1413 15.791 6.33856C15.7617 8.77997 14.8145 10.528 13.9648 11.5827L15.3711 11.5827C17.5488 11.5827 19.2383 9.23895 19.2383 6.24091ZM14.4824 6.30927C14.541 2.74481 11.6504 0.0494996 7.10938 0.0104371L5.79102 0.000671446C4.52148-0.00909418 3.58398 0.0885621 3.05664 0.235046C2.29492 0.420593 1.5625 0.879578 1.5625 1.80731C1.5625 2.17841 1.66016 2.46161 1.77734 2.66669C1.85547 2.78387 1.8457 2.8913 1.71875 2.94012C1.12305 3.18427 0.615234 3.76044 0.615234 4.52216C0.615234 4.97137 0.742188 5.35223 0.966797 5.62567C1.07422 5.77216 1.05469 5.89911 0.878906 6.00653C0.439453 6.26044 0.126953 6.80731 0.126953 7.44208C0.126953 7.90106 0.273438 8.37958 0.527344 8.61395C0.693359 8.75067 0.664062 8.84833 0.498047 8.99481C0.195312 9.24872 0 9.68817 0 10.2448C0 11.1823 0.732422 11.9538 1.69922 11.9538L5.13672 11.9538C6.00586 11.9538 6.58203 12.403 6.58203 13.1257C6.58203 14.4245 4.96094 16.8171 4.96094 18.5358C4.96094 19.4538 5.53711 19.9811 6.30859 19.9811C7.00195 19.9811 7.34375 19.5026 7.71484 18.7702C9.16992 15.9479 11.1035 13.6628 12.5781 11.6999C13.8281 10.0397 14.4434 8.61395 14.4824 6.30927Z"
                    //brown fill
                    fill="#FF0000"
                    fillOpacity="0.85"
                  />
                </g>
              </svg>
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
      <dialog id="likes" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Likes/Dislikes</h3>
          {/* list container */}
          <div>
            <ul className="divide-y divide-gray-200">
              {
                //map likes list
                likesList.map((like: any, i: number) => {
                  console.log(like);
                  const date = new Date(like.createdAt).toUTCString();
                  return (
                    <li
                      className="py-4 flex justify-between items-center"
                      key={i}
                    >
                      <div className="flex justify-start">
                        <Image
                          src={like.author.image}
                          width={40}
                          height={40}
                          className="rounded-full"
                          alt="image"
                        ></Image>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {like.author.name}
                          </p>
                          <p className="text-sm text-gray-500">{date}</p>
                        </div>
                      </div>
                      {like.type ? (
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="19.3945"
                          height="18.5254"
                        >
                          <g>
                            <rect
                              height="18.5254"
                              opacity="0"
                              width="19.3945"
                              x="0"
                              y="0"
                            />
                            <path
                              d="M9.69727 18.5254C9.90234 18.5254 10.1953 18.3887 10.4102 18.2617C15.9082 14.7461 19.3945 10.6543 19.3945 6.49414C19.3945 3.03711 17.0215 0.595703 13.9551 0.595703C12.0508 0.595703 10.5859 1.65039 9.69727 3.26172C8.82812 1.66016 7.34375 0.595703 5.43945 0.595703C2.37305 0.595703 0 3.03711 0 6.49414C0 10.6543 3.48633 14.7461 8.99414 18.2617C9.19922 18.3887 9.49219 18.5254 9.69727 18.5254Z"
                              fill="#FF0000"
                              fillOpacity="0.85"
                            />
                          </g>
                        </svg>
                      ) : (
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="19.2383"
                          height="20.0111"
                        >
                          <g>
                            <rect
                              height="20.0111"
                              opacity="0"
                              width="19.2383"
                              x="0"
                              y="0"
                            />
                            <path
                              d="M19.2383 6.24091C19.2383 3.35028 17.4219 0.928406 15.0098 0.928406L13.291 0.928406C15.0488 2.2077 15.8301 4.1413 15.791 6.33856C15.7617 8.77997 14.8145 10.528 13.9648 11.5827L15.3711 11.5827C17.5488 11.5827 19.2383 9.23895 19.2383 6.24091ZM14.4824 6.30927C14.541 2.74481 11.6504 0.0494996 7.10938 0.0104371L5.79102 0.000671446C4.52148-0.00909418 3.58398 0.0885621 3.05664 0.235046C2.29492 0.420593 1.5625 0.879578 1.5625 1.80731C1.5625 2.17841 1.66016 2.46161 1.77734 2.66669C1.85547 2.78387 1.8457 2.8913 1.71875 2.94012C1.12305 3.18427 0.615234 3.76044 0.615234 4.52216C0.615234 4.97137 0.742188 5.35223 0.966797 5.62567C1.07422 5.77216 1.05469 5.89911 0.878906 6.00653C0.439453 6.26044 0.126953 6.80731 0.126953 7.44208C0.126953 7.90106 0.273438 8.37958 0.527344 8.61395C0.693359 8.75067 0.664062 8.84833 0.498047 8.99481C0.195312 9.24872 0 9.68817 0 10.2448C0 11.1823 0.732422 11.9538 1.69922 11.9538L5.13672 11.9538C6.00586 11.9538 6.58203 12.403 6.58203 13.1257C6.58203 14.4245 4.96094 16.8171 4.96094 18.5358C4.96094 19.4538 5.53711 19.9811 6.30859 19.9811C7.00195 19.9811 7.34375 19.5026 7.71484 18.7702C9.16992 15.9479 11.1035 13.6628 12.5781 11.6999C13.8281 10.0397 14.4434 8.61395 14.4824 6.30927Z"
                              //brown fill
                              fill="#FF0000"
                              fillOpacity="0.85"
                            />
                          </g>
                        </svg>
                      )}
                    </li>
                  );
                })
              }
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
