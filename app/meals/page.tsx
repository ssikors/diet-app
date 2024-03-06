"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MealItem } from "../components/meals/MealItem";
import { MealWithTags } from "@/types/MealWIthTags";
import { Button } from "../components/basic/Button";
import { TagFilter } from "../components/meals/TagFilter";
import { Tag } from "@prisma/client";

export default function Home() {
  const [meals, setMeals] = useState<MealWithTags[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const fetchTags = async () => {
    const res = await axios.get("/api/tags");
    const data = res.data;
    setTags(data);
  };

  const fetchMeals = async () => {
    if (selectedTags.length == 0) {
      const res = await axios.get("/api/meals");
      const data = res.data;
      setMeals(data);
    } else {
      const res = await axios.get("/api/meals/", {
        params: {
          tags: JSON.stringify(selectedTags),
        },
      });
      const data = res.data;
      setMeals(data);
    }
  };

  useEffect(() => {
    fetchTags();
    fetchMeals();
  }, []);

  return (
    <>
      <div className="flex flex-col text-center items-center">
        <span className="flex flex-row w-[95%] bg-neutral-100 justify-start gap-16 items-center border-2 border-b-0">
          <TagFilter
            tags={tags}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
          <Button onClick={fetchMeals}>Search</Button>
          <Button>
            <Link href={"/meals/new"}>New meal</Link>
          </Button>
        </span>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 w-[95%] border-2 pt-8">
          {meals.map((item) => (
            <MealItem key={item.id} meal={item} />
          ))}
        </div>
      </div>
    </>
  );
}
