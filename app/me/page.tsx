import SignOutButton from "../components/atoms/SignOutButton";
import { User } from "@prisma/client";
import { getAuthenticatedUser } from "@/lib/services/user";
import { signOut } from "next-auth/react";

const me = async () => {
  const user: User = (await getAuthenticatedUser()) as User;
  return (
    <div>
      <h1>Me</h1>
      <p>{user.name!}</p>
      <p>{user.email!}</p>
      <SignOutButton />
    </div>
  );
};

export default me;
