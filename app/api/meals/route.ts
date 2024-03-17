import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const postMeal = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  recipe: z.string().min(16),
  tags: z.optional(z.array(z.string())),
  imageLink: z.optional(z.string()),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ status: 401 });
  }

  const validation = postMeal.safeParse(body);

  if (!validation.success) {
    console.log(validation.error);
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const tagIds = body.tags.map((item: string) => Number(item));
  const tags = await prisma.tag.findMany({ where: { id: { in: tagIds } } });

  const author = await prisma.user.findFirst({
    where: { email: session.user?.email },
  });

  if (!author) {
    return NextResponse.json({ status: 401 });
  }

  const newMeal = await prisma.meal.create({
    data: {
      title: body.title,
      description: body.description,
      recipe: body.recipe,
      tags: { connect: tags },
      authorId: author.id,
      imageLink: body.imageLink,
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

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ status: 401 });
  }

  const meal = await prisma.meal.findFirst({
    where: {
      id: id,
    },
    include: { author: true },
  });

  if (meal?.author?.email == session.user?.email) {
    const deleteMeal = await prisma.meal.delete({
      where: {
        id: id,
      },
    });

    console.log(deleteMeal);

    return NextResponse.json({ message: "Record deleted." }, { status: 200 });
  } else {
    return NextResponse.json({ status: 401 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  const tags = searchParams.get("tags");

  if (id) {
    const meal = await prisma.meal.findFirst({
      where: { id: id },
      include: { tags: true, author: { select: { name: true, email: true } } },
    });
    return NextResponse.json(meal);
  }

  if (tags) {
    const tagIds: number[] = JSON.parse(tags);
    const meals = await prisma.meal.findMany({
      include: { tags: true, author: false },
      where: { tags: { some: { id: { in: tagIds } } } },
    });
    return NextResponse.json(meals);
  }

  const meals = await prisma.meal.findMany({
    include: { tags: true, author: false },
  });
  return NextResponse.json(meals);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const session = await getServerSession(authOptions);


  if (!session) {
    return NextResponse.json({ status: 401 });
  }

  const validation = postMeal.safeParse(body.data);

  if (!validation.success) {
    console.log(validation.error.errors);
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const tagIds = body.data.tags.map((item: string) => Number(item));
  const tags = await prisma.tag.findMany({ where: { id: { in: tagIds } } });

  const meal = await prisma.meal.findFirst({
    where: {
      id: Number(body.params.id),
    },
    include: { author: true },
  });

  if (meal?.author?.email == session.user?.email) {
    const updateMeal = await prisma.meal.update({
      where: {
        id: Number(body.params.id),
      },
      data: {
        title: body.data.title,
        description: body.data.description,
        recipe: body.data.recipe,
        tags: { set: tags },
        imageLink: body.data.imageLink,
      },
    });

    return NextResponse.json(updateMeal, { status: 201 });
  } else {
    return NextResponse.json({ status: 401 });
  }
}
