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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));

  if (id) {

    const meal = await prisma.meal.findFirst({
      where: { id: id },
      include: { tags: true },
    });
    return NextResponse.json(meal);
  }

  const meals = await prisma.meal.findMany({ include: { tags: true } });
  return NextResponse.json(meals);
}
