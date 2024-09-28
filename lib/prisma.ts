import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    result: {
      auditLog: {
        action: {
          needs: { action: true },
          compute(auditLog) {
            return auditLog.action as 'CREATE' | 'UPDATE' | 'DELETE';
          },
        },
        entityType: {
          needs: { entityType: true },
          compute(auditLog) {
            return auditLog.entityType as 'BOARD' | 'LIST' | 'CARD';
          },
        },
      },
    },
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
