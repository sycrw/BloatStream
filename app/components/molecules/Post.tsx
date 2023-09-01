import Image from "next/image";
import { Like } from "@prisma/client";
import { LikeEnum } from "@/lib/types/enums/likes";
import ReactionBar from "../atoms/ReactionBar";
import { getAuthenticatedUser } from "@/lib/services/user";
interface Props {
  content: string;
  id: number;
  author: {
    name: string | null;
    image: string | null;
  };
  likes: Like[];
  createdAt: Date;
}

const Post = async ({ content, id, author, likes, createdAt }: Props) => {
  const user = await getAuthenticatedUser();
  const userChoice = likes.find((like) => like.authorId === user?.id);
  const userReaction = userChoice?.type
    ? LikeEnum.LIKE
    : userChoice?.type === false
    ? LikeEnum.DISLIKE
    : LikeEnum.NULL;

  const timeSincePost = () => {
    //get time since post and give it in min/ hours/days
    const now = Date.now();
    const postDate = new Date(createdAt);
    const timeSince = now - postDate.getTime();
    const years = Math.floor(timeSince / 31536000000);
    const days = Math.floor((timeSince % 31536000000) / 86400000);
    const hours = Math.floor(((timeSince % 31536000000) % 86400000) / 3600000);
    const minutes = Math.floor(
      (((timeSince % 31536000000) % 86400000) % 3600000) / 60000
    );
    const seconds = Math.floor(
      ((((timeSince % 31536000000) % 86400000) % 3600000) % 60000) / 1000
    );

    if (minutes < 60) {
      return `${minutes} min and ${seconds} sec ago`;
    }
    if (hours < 24) {
      return `${hours} h and ${minutes} min ago`;
    }
    if (days < 30) {
      return `${days} days ${hours} h ago`;
    }
    return `${years} years {day} days ago`;
  };
  return (
    <div className=" w-full rounded-lg m-4 hover:shadow-xl hover:scale-[1.01] transition-all bg-info  text-black">
      <div className="card-body">
        <div className="flex justify-between items-center rounded-md">
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
        <ReactionBar
          user={userReaction}
          postId={id}
          likesList={likes}
        ></ReactionBar>
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">{timeSincePost()}</p>
          <a href={`/post/${id}`} className="btn btn-ghost btn-circle btn-sm">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="18.418"
              height="3.91602"
            >
              <g>
                <rect height="3.91602" opacity="0" width="18.418" x="0" y="0" />
                <path
                  d="M1.95312 3.91602C3.05664 3.91602 3.93555 3.04688 3.93555 1.96289C3.93555 0.878906 3.05664 0.00976562 1.95312 0.00976562C0.878906 0.00976562 0 0.878906 0 1.96289C0 3.04688 0.878906 3.91602 1.95312 3.91602ZM9.20898 3.91602C10.293 3.91602 11.1621 3.04688 11.1621 1.96289C11.1621 0.878906 10.293 0.00976562 9.20898 0.00976562C8.13477 0.00976562 7.26562 0.878906 7.26562 1.96289C7.26562 3.04688 8.13477 3.91602 9.20898 3.91602ZM16.4648 3.91602C17.5488 3.91602 18.418 3.04688 18.418 1.96289C18.418 0.878906 17.5488 0.00976562 16.4648 0.00976562C15.3613 0.00976562 14.4922 0.878906 14.4922 1.96289C14.4922 3.04688 15.3613 3.91602 16.4648 3.91602Z"
                  className="fill-gray-500"
                  fillOpacity="0.85"
                />
              </g>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Post;
