import { auth, currentUser } from "@clerk/nextjs/server";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import prisma from "@/lib/prisma";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async (props: Props) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!orgId || !user) {
      throw new Error("User not found");
    }

    const { entityId, entityType, entityTitle, action } = props;
    await prisma.auditLog.create({
      data: {
        action,
        entityType,
        entityId,
        entityTitle,
        orgId,
        userId: user.id,
        userImage: user.imageUrl,
        userName: user.firstName + " " + user.lastName,
      },
    });
  } catch (error) {}
};
