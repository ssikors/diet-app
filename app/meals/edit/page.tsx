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
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  recipe: z.string().min(16),
  tags: z.optional(z.array(z.string())),
  imageLink: z.optional(z.string())
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

  useEffect(() => {
    if (meal) {
      reset({
        title: meal?.title,
        description: meal?.description,
        recipe: meal?.recipe!,
        tags: [],
        imageLink: meal?.imageLink
      });
    }
  }, [meal]);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MealForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: meal?.title,
      description: meal?.description,
      recipe: meal?.recipe!,
      tags: [],
    },
  });

  const onSubmit: SubmitHandler<MealForm> = async (data) => {
    try {
      await axios.put("/api/meals/", {
        data,
        params: { id: searchParams.get("id") },
      });
      router.push(`/meals/meal?id=${meal?.id}`);
    } catch {
      setError("root", { message: "Server error" });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form
        className="flex flex-col bg-neutral-100 border-2 p-4 px-8 rounded-md gap-2 items-left w-[80%] lg:w-[50%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="font-semibold text-lg">Meal:</label>
        <input
          className="border-2 border-black rounded-md p-1 sm:w-96"
          defaultValue={meal?.title}
          type="text"
          {...register("title")}
        ></input>
        {errors.title && (
          <div className="text-red-500">{errors.title.message}</div>
        )}
        <label className="font-semibold text-lg">Description:</label>
        <textarea
          className="border-2 border-black rounded-md p-1 w-full h-48"
          defaultValue={meal?.description}
          {...register("description")}
        ></textarea>
        {errors.description && (
          <div className="text-red-500">{errors.description.message}</div>
        )}
        <label className="font-semibold text-lg">Recipe:</label>
        <textarea
          className="border-2 border-black rounded-md p-1  h-80 w-full"
          defaultValue={meal?.recipe!}
          {...register("recipe")}
        ></textarea>
        {errors.recipe && (
          <div className="text-red-500">{errors.recipe.message}</div>
        )}
        <label className="font-semibold text-lg">Image:</label>
        <input
          className="border-2 border-black rounded-md p-1"
          placeholder="Image link"
          type="text"
          {...register("imageLink")}
        ></input>
        <label className="font-semibold text-lg">Tags:</label>
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
                <label className="ml-3 min-w-0 flex-1 text-black">
                  {item.name}
                </label>
              </div>
            </div>
          ))}
        </div>
        {errors.tags && (
          <div className="text-red-500">{errors.tags.message}</div>
        )}

        <div className="w-full flex flex-col items-center">
          <button
            className="my-3 bg-green-700 hover:bg-green-800 py-1 w-36 text-white font-semibold rounded-md border-2 border-green-800"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Loading..." : "Save"}
          </button>
          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}
        </div>
      </form>
    </div>
  );
}
