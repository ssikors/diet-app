"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Tag } from "@prisma/client";

const schema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  recipe: z.string().min(16),
  tags: z.optional(z.array(z.string())),
});

type MealForm = z.infer<typeof schema>;

export default function NewMealPage() {
  const [tags, setTags] = useState<Tag[]>([]);

  const fetchTags = async () => {
    const res = await axios.get("/api/tags");
    const data = res.data;
    setTags(data);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const router = useRouter();

  // handleSubmit validates in the background
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<MealForm>({
    resolver: zodResolver(schema),
    defaultValues: {tags: []}
  });

  const onSubmit: SubmitHandler<MealForm> = async (data) => {
    console.log(data);
    try {
      await axios.post("/api/meals", data);
      router.push("/meals");
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
          placeholder="Title"
          type="text"
          {...register("title")}
        ></input>
        {errors.title && (
          <div className="text-red-500">{errors.title.message}</div>
        )}
        <textarea
          className="border-2"
          placeholder="Description"
          {...register("description")}
        ></textarea>
        {errors.description && (
          <div className="text-red-500">{errors.description.message}</div>
        )}
        <textarea
          className="border-2"
          placeholder="Recipe"
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
