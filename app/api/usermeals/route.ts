import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  const tags = searchParams.get("tags");

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({message: "error"},{ status: 401 });
  }

  if (tags) {
    const tagIds: number[] = JSON.parse(tags);
    const meals = await prisma.meal.findMany({
      include: { tags: true, author: { select: { name: true, email: true } } },
      where: {
        tags: { some: { id: { in: tagIds } } },
        author: { email: session.user?.email },
      },
    });
    return NextResponse.json(meals);
  }

  const meals = await prisma.meal.findMany({
    include: { tags: true, author: { select: { name: true, email: true } } },
    where: { author: { email: session.user?.email } },
  });
  return NextResponse.json(meals);
}
