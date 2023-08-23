"use client";

interface RatingButtonProps {
  art: "like" | "dislike";
  PostId: number;
  value: number;
}

const RatingButton = ({ art, PostId, value }: RatingButtonProps) => {
  const postLike = () => {
    console.log("like");
  };

  return art == "like" ? <button>
    {/* like svg button */}
    
  </button> : <button></button>;
};

export default RatingButton;
