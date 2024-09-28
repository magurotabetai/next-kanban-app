import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { MAX_FREE_BOARDS } from "@/constants/board";

export const incrementAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await prisma.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (orgLimit) {
    await prisma.orgLimit.update({
      where: {
        id: orgLimit.id,
      },
      data: {
        count: {
          increment: 1,
        },
      },
    });
  } else {
    await prisma.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};

export const decreaseAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await prisma.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (orgLimit) {
    await prisma.orgLimit.update({
      where: {
        id: orgLimit.id,
      },
      data: {
        count: {
          decrement: 1,
        },
      },
    });
  } else {
    await prisma.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};

export const hasAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await prisma.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true;
  }

  return false;
};

export const getAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return 0;
  }

  const orgLimit = await prisma.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (!orgLimit) {
    return 0;
  }

  return orgLimit.count;
};
