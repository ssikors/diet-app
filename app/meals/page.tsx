"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

type Meal = {
  id: number;
  title: string;
  description: string;
  updatedAt: string;
};

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
    <>
      <button>
        <div className="grid grid-cols-3 gap-4">
          {meals.map((item) => (
            <div className="flex flex-col">
              <div>{item.title}</div>
              <div>{item.description}</div>
            </div>
          ))}
        </div>
        <Link href={"/meals/new"}>New meal</Link>
      </button>
    </>
  );
}
