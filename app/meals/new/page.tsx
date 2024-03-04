"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

const schema = z.object({
  title: z.string(),
  description: z.string().min(8),
  recipe: z.string().min(16)
});

type MealForm = z.infer<typeof schema>;

export default function NewMealPage() {
  const router = useRouter()

  // handleSubmit validates in the background
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<MealForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<MealForm> = async (data) => {
    try {
      await axios.post("/api/meals", data)
      router.push("/meals")
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
