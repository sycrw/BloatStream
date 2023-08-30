"use client";

import Image from "next/image";
import { Like } from "@/lib/types/enums/likes";
import RatingButton from "../atoms/RatingButton";
import { useState } from "react";
interface Props {
  content: string;
  id: number;
  author: {
    name: string | null;
    image: string | null;
    like: Like;
  };
  rating: {
    likes: number;
    dislikes: number;
  };
}

const Post = ({ content, id, author, rating }: Props) => {
  const [error, setError] = useState("");

  return (
    <div className=" sm:w-80 md:w-96 lg:w-[500px] xl:w-[550px] 2xl:w-[600px] w-52 rounded-lg m-4 hover:shadow-xl hover:scale-[1.01] transition-all bg-info text-primary-content">
      <div className="card-body">
        <div className="flex justify-between items-center shadow-md rounded-md p-2">
          <h2 className="text-lg font-bold">{author.name}</h2>
          <Image
            className=" w-10  rounded-full shadow-sm hover:shadow-xl"
            src={author.image || "/person.svg"}
            alt="author image"
            unoptimized={true}
            width={40}
            height={40}
          />
        </div>
        <p>{content}</p>
        <div className="flex justify-between items-center mt-2">
          <RatingButton
            art={Like.LIKE}
            PostId={id}
            value={rating.likes}
            active={author.like == Like.LIKE}
            onError={(error) => setError(error)}
          />
          <RatingButton
            art={Like.DISLIKE}
            PostId={id}
            value={rating.dislikes}
            active={author.like == Like.DISLIKE}
            onError={(error) => setError(error)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Post;
