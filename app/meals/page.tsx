"use client"

import Link from "next/link";

export default function Home() {
  return (
    <>
      <button>
        <Link href={"/meals/new"}>New meal</Link>
      </button>
    </>
  );
}
