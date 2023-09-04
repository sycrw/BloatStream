import PostList from "./components/organisms/PostList";
import { getAllPosts } from "@/lib/services/posts";
import { getAuthenticatedUser } from "@/lib/services/user";
import { getServerSession } from "next-auth";
import { use } from "react";

export default async function Home() {
  const user = await getAuthenticatedUser();
  const posts = await getAllPosts(user);
  return (
    <>
      <PostList posts={posts} user={user} />
    </>
  );
}
