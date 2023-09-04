import { getAmountOfPostsByUserId, getPostsOfUser } from "@/lib/services/posts";
import { getAuthenticatedUser, getUserById } from "@/lib/services/user";
import {
  getDislikesCountToUserByUserId,
  getLikesCountToUserByUserId,
} from "@/lib/services/likes";

import PostList from "@/app/components/organisms/PostList";
import UserHeader from "@components/organisms/UserHeader";
import { get } from "http";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  console.log(params);
  const { id } = params;
  let currentUser = await getAuthenticatedUser();
  let user, likesCount, dislikesCount;
  try {
    user = await getUserById(id);
    if (!user) throw new Error("User not found");
  } catch (err: any) {
    if (err.message === "User not found") {
      redirect("/404");
    }
  }
  dislikesCount = await getDislikesCountToUserByUserId(id);
  likesCount = await getLikesCountToUserByUserId(id);
  const postCount = await getAmountOfPostsByUserId(id);
  const post = await getPostsOfUser(id);

  return (
    <div className="w-9/12 flex flex-col items-center justify-center m-auto">
      <UserHeader
        user={user!}
        likesCount={likesCount}
        dislikesCount={dislikesCount}
        postCount={postCount}
      />
      <PostList posts={post} user={currentUser} />
    </div>
  );
};

export default Page;
