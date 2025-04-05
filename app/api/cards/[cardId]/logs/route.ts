import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { NextResponse } from "next/server";
import { auditLogs } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ cardId: string }>; }
) {
  try {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { cardId } = await params;

    const logs = await db.query.auditLogs.findMany({
      where: and(
        eq(auditLogs.orgId, orgId),
        eq(auditLogs.entityId, cardId),
        eq(auditLogs.entityType, "CARD")
      ),
      orderBy: [desc(auditLogs.createdAt)],
      limit: 3,
    });

    return NextResponse.json(logs);
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
