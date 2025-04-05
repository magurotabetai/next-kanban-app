import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { orgLimits } from "@/lib/db/schema";
import { MAX_FREE_BOARDS } from "@/constants/board";
import { eq } from "drizzle-orm";

export const incrementAvailableCount = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await db.query.orgLimits.findFirst({
    where: eq(orgLimits.orgId, orgId),
  });

  if (orgLimit) {
    await db
      .update(orgLimits)
      .set({
        count: orgLimit.count + 1,
      })
      .where(eq(orgLimits.id, orgLimit.id));
  } else {
    await db.insert(orgLimits).values({
      orgId,
      count: 1,
    });
  }
};

export const decreaseAvailableCount = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await db.query.orgLimits.findFirst({
    where: eq(orgLimits.orgId, orgId),
  });

  if (orgLimit) {
    await db
      .update(orgLimits)
      .set({
        count: orgLimit.count - 1,
      })
      .where(eq(orgLimits.id, orgLimit.id));
  } else {
    await db.insert(orgLimits).values({
      orgId,
      count: 1,
    });
  }
};

export const hasAvailableCount = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await db.query.orgLimits.findFirst({
    where: eq(orgLimits.orgId, orgId),
  });

  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true;
  }

  return false;
};

export const getAvailableCount = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    return 0;
  }

  const orgLimit = await db.query.orgLimits.findFirst({
    where: eq(orgLimits.orgId, orgId),
  });

  if (!orgLimit) {
    return 0;
  }

  return orgLimit.count;
};
