"use client";

import { User } from "@prisma/client";
import { followUser } from "@/lib/services/follow";
import { handleClientScriptLoad } from "next/script";
import { useRouter } from "next/navigation";

interface FollowButtonProps {
  isFollowing: boolean;
  userToFollowId: string;
  userThatIsFollowingId: string;
}

const FollowButton = ({
  isFollowing,
  userThatIsFollowingId,
  userToFollowId,
}: FollowButtonProps) => {
  const router = useRouter();
  const handleFollowUser = () => {
    // follow user
    fetch("/api/follow", {
      method: "POST",
      body: JSON.stringify({
        followingId: userToFollowId,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        console.log(data);
        router.refresh();
      })
      .catch((err) => {
        alert("You cant follow yourself");
      });
  };

  const handleUnfollowUser = () => {
    // unfollow user
    fetch("/api/follow", {
      method: "DELETE",
      body: JSON.stringify({
        followingId: userToFollowId,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          alert("Something went wrong!");
        }
      })
      .then((data) => {
        console.log(data);
        router.refresh();
      });
  };

  return isFollowing ? (
    <button
      className="btn btn-secondary"
      onClick={() => {
        handleUnfollowUser();
      }}
    >
      Unfollow
    </button>
  ) : (
    <button
      className="btn btn-info"
      onClick={() => {
        handleFollowUser();
      }}
    >
      Follow
    </button>
  );
};

export default FollowButton;
