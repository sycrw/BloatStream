import Image from "next/image";
import StatsVertical from "../molecules/StatsVertical";
import { User } from "@prisma/client";

interface UserHeaderProps {
  user: User;
  likesCount: number;
  dislikesCount: number;
  postCount: number;
}

const UserHeader = ({
  user,
  likesCount,
  dislikesCount,
  postCount,
}: UserHeaderProps) => {
  const reactionStats = [
    {
      title: "Comments",
      value: "0",
    },
    {
      title: "Likes",
      value: String(likesCount),
    },
    {
      title: "Dislikes",
      value: String(dislikesCount),
    },
  ];
  //post, followers, following
  const userStats = [
    {
      title: "Posts",
      value: String(postCount),
    },
    {
      title: "Followers",
      value: "0",
    },
    {
      title: "Following",
      value: "0",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="flex lg:flex-row flex-col justify-center">
        <div className="flex items-center m-2">
          <Image
            src={user.image || "/person.svg"}
            alt=""
            width={100}
            height={100}
            className="rounded-full m-2"
          />
          {/* name */}
          <h1 className="text-2xl font-bold m-2">{user.name}</h1>
        </div>
        <div className="m-2 flex justify-center items-center">
          <StatsVertical stats={userStats} />
        </div>
      </div>
      <div className="grid grid-rows-2 lg:grid-cols-2">
        <div className="m-2 flex justify-center items-center">
          <StatsVertical stats={reactionStats} />
        </div>
        <div className="m-2 flex justify-center items-center">
          {/* follow button  full size of container*/}
          <button className="btn btn-info">Follow</button>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
