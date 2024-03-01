"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface MealForm {
  title: string;
  description: string;
}

export default function NewMealPage() {
  // handleSubmit validates in the background
  const { register, handleSubmit } = useForm<MealForm>();

  const onSubmit: SubmitHandler<MealForm> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form
        className="flex flex-col gap-2 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="border-2"
          placeholder="Title"
          {...register("title", { required: true })}
        ></input>
        <input
          className="border-2"
          placeholder="Description"
          {...register("description", { required: true })}
        ></input>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
