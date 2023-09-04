import { Like, User } from "@prisma/client";

import Post from "../molecules/Post";
import { PostFull } from "@/lib/types/prisma-extended/post-full";
import { getAllPosts } from "@/lib/services/posts";
import { getAuthenticatedUser } from "@/lib/services/user";

interface PostListProps {
  posts: PostFull[];
  user: User;
}
const PostList = async ({ posts, user }: PostListProps) => {
  return (
    <div className="w-9/12 flex flex-col items-center p-4 border-gray-500 m-auto ">
      {posts.map((post) => {
        const author = {
          name: post.author.name,
          image: post.author.image,
        };

        return <Post key={post.id} post={post} user={user} />;
      })}
    </div>
  );
};

export default PostList;
