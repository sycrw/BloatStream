import Image from "next/image";
import { Like } from "@prisma/client";
import { LikeEnum } from "@/lib/types/enums/likes";
import ReactionBar from "../atoms/ReactionBar";
import { getAuthenticatedUser } from '@/lib/"services"/user';
interface Props {
  content: string;
  id: number;
  author: {
    name: string | null;
    image: string | null;
  };
  likes: Like[];
}

const Post = async ({ content, id, author, likes }: Props) => {
  const likeAmount = likes.filter((like) => like.type === true).length;
  const dislikeAmount = likes.filter((like) => like.type === false).length;
  //check if current user liked/disliked post
  //id of the current user
  const user = await getAuthenticatedUser();
  const userChoice = likes.find((like) => like.authorId === user?.id);
  const userReaction = userChoice?.type
    ? LikeEnum.LIKE
    : userChoice?.type === false
    ? LikeEnum.DISLIKE
    : LikeEnum.NULL;

  return (
    <div className=" sm:w-80 md:w-96 lg:w-[500px] xl:w-[550px] 2xl:w-[600px] w-52 rounded-lg m-4 hover:shadow-xl hover:scale-[1.01] transition-all bg-info  text-black">
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
      </div>
    </div>
  );
};

export default Post;
