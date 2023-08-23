import RatingButton from "../atoms/RatingButton";

interface Props {
  content: string;
  id: number;
  author: {
    name: string | null;
    image: string | null;
  };
  rating: {
    likes: number;
    dislikes: number;
  };
}

const Post = ({ content, id, author, rating }: Props) => {
  return (
    <div className=" sm:w-80 md:w-96 lg:w-[500px] xl:w-[550px] 2xl:w-[600px] w-52 rounded-lg m-4 hover:shadow-xl hover:scale-[1.01] transition-all bg-info text-primary-content">
      <div className="card-body">
        <div className="flex justify-between items-center shadow-md rounded-md p-2">
          <h2 className="text-lg font-bold">{author.name}</h2>
          <img
            className=" w-10  rounded-full shadow-sm hover:shadow-xl"
            src={author.image || "/person.svg"}
            alt="author image"
          />
        </div>
        <p>{content}</p>
        {/* Progress bar on how many likes and dis likes, scaling from the center */}
        <div className="flex justify-between items-center">
          <img src="" alt="" />
        </div>
        <div className="flex justify-between items-center"></div>
      </div>
    </div>
  );
};

export default Post;
