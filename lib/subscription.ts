import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { orgSubscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    return false;
  }

  const orgSubscription = await db.query.orgSubscriptions.findFirst({
    where: eq(orgSubscriptions.orgId, orgId),
  });

  if (!orgSubscription) {
    return false;
  }

  const isValid =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
};
