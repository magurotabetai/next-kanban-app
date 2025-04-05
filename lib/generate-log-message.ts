import { AuditLog } from "@/lib/db/schema";

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityType, entityTitle } = log;

  switch (action) {
    case "CREATE":
      return `created ${entityType.toLowerCase()} ${entityTitle}`;
    case "UPDATE":
      return `updated ${entityType.toLowerCase()} ${entityTitle}`;
    case "DELETE":
      return `deleted ${entityType.toLowerCase()} ${entityTitle}`;
    default:
      return `unkown action ${entityType.toLowerCase()} ${entityTitle}`;
  }
};
