import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return false;
  }

  const orgSubscription = await prisma.orgSubscription.findUnique({
    where: {
      orgId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCustomerId: true,
      stripePriceId: true,
      stripeCurrentPeriodEnd: true,
    },
  });

  if (!orgSubscription) {
    return false;
  }

  const isValid =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
};
