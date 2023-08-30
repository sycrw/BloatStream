import { Like } from "@/lib/types/enums/likes";
import Post from "../molecules/Post";
import { getAllPosts } from '@/lib/"services"/posts';
import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";

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
          like:
            likeType == true
              ? Like.LIKE
              : likeType == false
              ? Like.DISLIKE
              : Like.NULL,
        };
        const rating = {
          likes: post.likes.filter((like) => like.type).length,
          dislikes: post.likes.filter((like) => !like.type).length,
        };
        return (
          <Post
            key={post.id}
            content={post.content}
            author={author}
            rating={rating}
            id={post.id}
          />
        );
      })}
    </div>
  );
};

export default PostList;
