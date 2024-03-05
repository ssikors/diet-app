"use client";

import { MealWithTags } from "@/types/MealWIthTags";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MealPage() {
  const [meal, setMeal] = useState<MealWithTags>();

  const searchParams = useSearchParams();

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
        width={400}
        height={300}
        className="rounded-lg border-4 opacity-90 mt-6"
        alt=""
        src={
          "https://cdn.pixabay.com/photo/2023/06/12/11/34/mushrooms-8058299_960_720.jpg"
        }
      />

      <section className=" w-[70%] my-8">
        <h2 className="text-center text-2xl w-full border-b-2 pb-2">Recipe:</h2>
        <p className="my-1 leading-relaxed pb-2 border-b-2 text-justify text text-zinc-800 font w-full">
          {meal?.recipe}
        </p>
      </section>
    </div>
  );
}
