import { Tag } from "@prisma/client";
import { AuthorPublic } from "./AuthorPublic";

export type MealWithTags = {
  id: number;
  title: string;
  description: string;
  recipe: string | null;
  tags: Tag[]
  updatedAt: Date;
  author?: AuthorPublic
}