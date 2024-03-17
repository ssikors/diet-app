"use client";

import { MealWithTags } from "@/types/MealWIthTags";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/app/components/basic/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function MealPage() {
  const [meal, setMeal] = useState<MealWithTags>();

  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const router = useRouter();

  const deleteMeal = async () => {
    const res = await axios.delete("/api/meals/", {
      params: {
        id: searchParams.get("id"),
      },
    });

    if (res.status != 200) {
      console.log("Error");
    } else {
      router.push("/meals");
    }
  };

  const fetchMeal = async () => {
    const res = await axios.get("/api/meals/", {
      params: {
        id: searchParams.get("id"),
      },
    });
    const data = res.data;
    setMeal(data);
  };

  useEffect(() => {
    fetchMeal();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-3xl font-semibold p-1 px-3">
        {meal ? meal.title : ""}
      </h1>
      <div className="mt-6 w-[65%]">
        <p className="w-full py-1 text-lg text-zinc-600 font-light text-center">
          {meal?.description}
        </p>
      </div>

      <Image
        width={480}
        height={360}
        className="rounded-lg border-4 opacity-90 mt-6"
        alt=""
        src={
          meal?.imageLink ? meal.imageLink : "https://cdn.pixabay.com/photo/2018/06/12/15/08/question-mark-3470783_960_720.jpg"
        }
      />
      <div className="flex flex-row w-[70%] gap-3 justify-center mt-4">
        {meal?.tags.map((item) => (
          <div key={item.name} className="bg-orange-800 px-2 h-8  py-1 rounded-lg text-white font-bold shadow-lg">
            {item.name}
          </div>
        ))}
      </div>

      <section className="w-[80%] md:w-[50%] lg:w-[40%] mt-24 mb-4">
        <h2 className="text-center text-2xl w-full border-b-2 pb-2">Recipe:</h2>
        <p className="my-1 leading-relaxed pb-2 border-b-2 text-justify text text-zinc-800 font w-full">
          {meal?.recipe?.split("\n").map((str) => (
            <>
              {str}
              <br />
            </>
          ))}
        </p>
      </section>
      {meal?.author && session?.user && meal.author.email == session?.user?.email ? <section className="flex flex-row gap-16">
        <Link
          href={{
            pathname: "/meals/edit",
            query: {
              id: meal?.id,
            },
          }}
        >
          <Button>Edit</Button>
        </Link>

        <button
          onClick={deleteMeal}
          className="my-3 bg-red-700 hover:bg-red-800 py-1 w-36 text-white font-semibold rounded-md border-2 border-red-800"
        >
          Delete
        </button>
      </section> : ""}
      
    </div>
  );
}
