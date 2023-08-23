"use client";

import { signOut } from "next-auth/react";

const Button = () => {
  return (
    <div>
      <button onClick={() => signOut()} className="btn bg-info text-primary">
        SignOut
      </button>
    </div>
  );
};

export default Button;
