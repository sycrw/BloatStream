"use client";

import { getAuthenticatedUser } from "@/lib/auth/getAuthenticatedUser";
import { signOut } from "next-auth/react";

const me = () => {
  return (
    <button
      onClick={() => {
        signOut();
      }}
    >
      Sign Out
    </button>
  );
};

export default me;
