import { Tag } from "@prisma/client";

export type MealWithTags = {
  id: number;
  title: string;
  description: string;
  recipe: string | null;
  tags: Tag[]
  updatedAt: Date;
}