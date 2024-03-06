"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MealWithTags } from "@/types/MealWIthTags";
import { Tag } from "@prisma/client";

const schema = z.object({
  title: z.string(),
  description: z.string().min(8),
  recipe: z.string().min(16),
  tags: z.array(z.string()).nullable(),
});

type MealForm = z.infer<typeof schema>;

export default function EditMealPage() {
  const [meal, setMeal] = useState<MealWithTags>();
  const [tags, setTags] = useState<Tag[]>([]);

  const fetchTags = async () => {
    const res = await axios.get("/api/tags");
    const data = res.data;
    setTags(data);
  };

  const router = useRouter();
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
    fetchTags();
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<MealForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: meal?.title,
      description: meal?.description,
      recipe: meal?.recipe!,
    },
  });

  const onSubmit: SubmitHandler<MealForm> = async (data) => {
    console.log(searchParams.get("id"));
    try {
      await axios.put("/api/meals/", { data,
        params: { id: searchParams.get("id") },
      });
      router.push(`/meals/meal?id=${meal?.id}`);
    } catch {
      setError("root", { message: "Server error" });
    }
  };

  return (
    <div className="">
      <form
        className="flex flex-col gap-2 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="border-2"
          defaultValue={meal?.title}
          type="text"
          {...register("title")}
        ></input>
        {errors.title && (
          <div className="text-red-500">{errors.title.message}</div>
        )}
        <textarea
          className="border-2"
          defaultValue={meal?.description}
          {...register("description")}
        ></textarea>
        {errors.description && (
          <div className="text-red-500">{errors.description.message}</div>
        )}
        <textarea
          className="border-2"
          defaultValue={meal?.recipe!}
          {...register("recipe")}
        ></textarea>
        {errors.recipe && (
          <div className="text-red-500">{errors.recipe.message}</div>
        )}
        <div className="text-left">
          {tags.map((item) => (
            <div key={item.name} className="space-y-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value={item.id}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register("tags")}
                />
                <label className="ml-3 min-w-0 flex-1 text-gray-500">
                  {item.name}
                </label>
              </div>
            </div>
          ))}
        </div>
        {errors.tags && (
          <div className="text-red-500">{errors.tags.message}</div>
        )}

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
}
