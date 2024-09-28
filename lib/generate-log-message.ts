import { AuditLog } from "@prisma/client";
import { ACTION } from "./enums";
export const generateLogMessage = (log: AuditLog) => {
  const { action, entityType, entityTitle } = log;

  switch (action) {
    case ACTION.CREATE:
      return `created ${entityType.toLowerCase()} ${entityTitle}`;
    case ACTION.UPDATE:
      return `updated ${entityType.toLowerCase()} ${entityTitle}`;
    case ACTION.DELETE:
      return `deleted ${entityType.toLowerCase()} ${entityTitle}`;
    default:
      return `unkown action ${entityType.toLowerCase()} ${entityTitle}`;
  }
};
