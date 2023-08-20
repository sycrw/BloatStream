import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";
import { getServerSession } from "next-auth";
import { json } from "stream/consumers";

export default async function Home() {
  const sessionUser = await getServerSession();
  console.log(sessionUser);
  const user = await getAuthenticatedUser();

  return (
    <>
      <h1>Welcome {user.name}</h1>
    </>
  );
}
