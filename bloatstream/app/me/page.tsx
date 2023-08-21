"use client";

import { signOut } from "next-auth/react";

const me = () => {
  return (
    <button
      onClick={() => {
        signOut({
          callbackUrl: "http://localhost:3000/landing",
        });
      }}
    >
      Sign Out
    </button>
  );
};

export default me;
