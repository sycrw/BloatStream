import Image from "next/image";

const page = () => {
  //mock post data
  const data = {
    id: 1,
    content: "content",
    createdAt: "2021-09-27T00:00:00.000Z",
    author: {
      id: 1,
      name: "name",
      image:
        "https://lh3.googleusercontent.com/a/AAcHTtemskJ9VB-iDVmV1BFFxEGa2K05R6CW90Zdowkc6kg7=s96-c",
    },
    likes: [
      {
        id: 1,
        userId: 1,
        postId: 1,
        createdAt: "2021-09-27T00:00:00.000Z",
        updatedAt: "2021-09-27T00:00:00.000Z",
      },
    ],
  };

  return (
    <div className="w-3/4 m-auto rounded-lg ">
      <div className="card-body bg-info rounded-lg">
        <div className="card-title flex justify-around me-2">
          <h5>{data.author.name}</h5>
          <Image
            src={data.author.image}
            width={60}
            height={60}
            unoptimized
            alt="author image"
            className="rounded-full shadow-sm hover:shadow-xl"
          ></Image>
        </div>
        <div>
          <p className="card-text">{data.content}</p>
        </div>
      </div>
    </div>
  );
};

export default page;
