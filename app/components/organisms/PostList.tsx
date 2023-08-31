import { Like } from "@prisma/client";
import Post from "../molecules/Post";
import { getAllPosts } from '@/lib/"services"/posts';
import { getAuthenticatedUser } from '@/lib/"services"/user';

const PostList = async () => {
  const user = await getAuthenticatedUser();
  const posts = await getAllPosts(user);

  return (
    <div className="w-full flex flex-col items-center">
      {posts.map((post) => {
        const userLiked = post.likes.find((like) => like.authorId === user?.id);
        const likeType = userLiked ? userLiked.type : null;
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
          />
        );
      })}
    </div>
  );
};

export default PostList;
