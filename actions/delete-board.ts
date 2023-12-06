"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteBoard(id: string) {
  await prisma.board.delete({
    where: {
      id,
    },
  });

  revalidatePath("/organization/org_2Z7EYcotuTKFfCKgOh718ur1WuW");
}
