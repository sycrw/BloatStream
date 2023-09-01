import { Like } from "@prisma/client";
import Post from "../molecules/Post";
import { getAllPosts } from "@/lib/services/posts";
import { getAuthenticatedUser } from "@/lib/services/user";

const PostList = async () => {
  const user = await getAuthenticatedUser();
  const posts = await getAllPosts(user);

  return (
    <div className="w-9/12 flex flex-col items-center p-4 border-gray-500 m-auto ">
      {posts.map((post) => {
        const author = {
          name: post.author.name,
          image: post.author.image,
        };

        return (
          <Post
            key={post.id}
            content={post.content}
            author={author}
            likes={post.likes as unknown as Like[]}
            id={post.id}
            createdAt={post.createdAt}
          />
        );
      })}
    </div>
  );
};

export default PostList;
