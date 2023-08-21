"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

const PostModal = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  //hooks for data
  const [content, setContent] = useState("");

  const [error, setError] = useState("");

  const [count, setCount] = useState(0);

  const sendPost = async () => {
    setError("");
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ content }),
    });
    if (res.ok) {
      setContent("");
      router.replace("/");
    } else {
      res.json().then((data) => {
        setError(data.error);
      });
    }
  };

  return (
    searchParams.get("modal") === "true" && (
      <dialog id="my_modal_2" className="modal modal-open ">
        <form method="dialog" className="modal-box flex flex-col">
          <h2 className="text-2xl font-bold text-center mb-2">New Post</h2>
          <textarea
            className="textarea textarea-bordered textarea-info resize-none h-64 mb-2"
            value={content}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setContent(e.target.value);
              }
              setCount(e.target.value.length);
            }}
            placeholder="your bloated ideas"
          />
          <div className="flex justify-between">
            {error && <p className="text-red-500">{error}</p>}
            <p className="text-right text-gray-500">{count}/500</p>
          </div>
          <button className="btn btn-info" onClick={sendPost}>
            Post
          </button>
        </form>
        <form
          method="dialog"
          className="modal-backdrop"
          onClick={() => {
            //set urlSearchParams to false
            console.log("clicked");
            router.replace("?modal=false");
          }}
        >
          <button>close</button>
        </form>
      </dialog>
    )
  );
};

export default PostModal;
