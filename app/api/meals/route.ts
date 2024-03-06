import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const postMeal = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  recipe: z.string().min(16),
  tags: z.array(z.string()),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = postMeal.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const tagIds = body.tags.map((item: string) => Number(item));
  const tags = await prisma.tag.findMany({ where: { id: { in: tagIds } } });

  console.log(tags);

  const newMeal = await prisma.meal.create({
    data: {
      title: body.title,
      description: body.description,
      recipe: body.recipe,
      tags: { connect: tags },
    },
  });

  return NextResponse.json(newMeal, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  if (!id) {
    return NextResponse.json({ message: "No ID specified" }, { status: 400 });
  }

  const deleteMeal = await prisma.meal.delete({
    where: {
      id: id,
    },
  });

  console.log(deleteMeal);

  return NextResponse.json({ message: "Record deleted." }, { status: 200 });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  const tags = searchParams.get("tags");

  if (id) {
    const meal = await prisma.meal.findFirst({
      where: { id: id },
      include: { tags: true },
    });
    return NextResponse.json(meal);
  }

  if (tags) {
    const tagIds: number[] = JSON.parse(tags);
    const meals = await prisma.meal.findMany({
      include: { tags: true },
      where: { tags: { some: { id: { in: tagIds } } } },
    });
    return NextResponse.json(meals);
  }

  const meals = await prisma.meal.findMany({ include: { tags: true } });
  return NextResponse.json(meals);
}
