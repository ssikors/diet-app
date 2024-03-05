import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const tags = await prisma.tag.findMany()
  return NextResponse.json(tags)
}