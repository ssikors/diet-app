"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import { CiLogout } from "react-icons/ci";

const SignIn = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex flex-row gap-3 font-light">
        <p>Welcome, {session.user.name}</p>
        <button className="scale-125" onClick={() => signOut()}>
          <CiLogout />
        </button>
      </div>
    );
  }

  return (
    <button
      className="text-white bg-green-500 font-semibold py-1 scale-90 hover:scale-100 hover:bg-green-600 px-3 rounded-lg"
      onClick={() => signIn()}
    >
      Log in
    </button>
  );
};

export default SignIn;
