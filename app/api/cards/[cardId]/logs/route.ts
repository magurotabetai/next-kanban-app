import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { ENTITY_TYPE } from "@/lib/enums";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const auditLogs = await prisma.auditLog.findMany({
      where: {
        orgId,
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    return NextResponse.json(auditLogs);
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
