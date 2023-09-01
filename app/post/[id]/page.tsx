import Image from "next/image";
import { getPostById } from "@/lib/services/posts";

const page = async ({ params }: { params: { id: number } }) => {
  //get id from url: https://..../post/[id]
  const post = await getPostById(params.id);
  console.log(post);

  return <div className="w-3/4 m-auto rounded-lg "></div>;
};

export default page;
