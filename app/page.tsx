import Link from "next/link";
import { Button } from "./components/basic/Button";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Meals suited for your diet
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Our app makes it easy for you to find the meals you need.
          Browse through recipes posted by other users or share your own ideas!
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href={"/meals"}>
            <Button>Get started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
