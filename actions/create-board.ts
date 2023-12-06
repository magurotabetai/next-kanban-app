"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const CreateBoard = z.object({
  title: z.string(),
});

export async function create(formData: FormData) {
  const { title } = CreateBoard.parse({
    title: formData.get("title"),
  });

  await prisma.board.create({
    data: {
      title,
    },
  });

  revalidatePath("/organization/org_2Z7EYcotuTKFfCKgOh718ur1WuW");
}
