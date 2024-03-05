"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MealItem } from "../components/meals/MealItem";
import { Meal } from "@prisma/client";

export default function Home() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const fetchMeals = async () => {
    const res = await axios.get("/api/meals");
    const data = res.data;
    setMeals(data);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <div className="flex flex-col text-center items-center">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 w-[95%]">
        {meals.map((item) => (
          <MealItem key={item.id} meal={item} />
        ))}
      </div>
      <button className="m-8">
        <Link href={"/meals/new"}>New meal</Link>
      </button>
    </div>
  );
}
