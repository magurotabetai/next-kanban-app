import { auth, currentUser } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { auditLogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

interface Props {
  entityId: string;
  entityType: "BOARD" | "LIST" | "CARD";
  entityTitle: string;
  action: "CREATE" | "UPDATE" | "DELETE";
}

export const createAuditLog = async (props: Props) => {
  try {
    const { orgId } = await auth();
    const user = await currentUser();

    if (!orgId || !user) {
      throw new Error("User not found");
    }

    const { entityId, entityType, entityTitle, action } = props;
    await db.insert(auditLogs).values({
      action,
      entityType,
      entityId,
      entityTitle,
      orgId,
      userId: user.id,
      userImage: user.imageUrl,
      userName: user.firstName + " " + user.lastName,
    });
  } catch (error) {}
};
