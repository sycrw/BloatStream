import PostList from "./components/organisms/PostList";
import PostModal from "./components/organisms/PostModal";
import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";
import { getServerSession } from "next-auth";

interface Props {
  searchParams: Record<string, string> | undefined | null;
}

export default async function Home({ searchParams }: Props) {
  const sessionUser = await getServerSession();
  const user = await getAuthenticatedUser();
  return (
    <>
      <PostList />
    </>
  );
}
