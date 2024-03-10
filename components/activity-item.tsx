import { format } from "date-fns";
import { AuditLog } from "@prisma/client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { generateLogMessage } from "@/lib/generate-log-message";

interface ActivityProps {
  auditLog: AuditLog;
}

export const ActivityItem = ({ auditLog }: ActivityProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={auditLog.userImage} alt={auditLog.userName} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700">
            {auditLog.userName}
          </span>{" "}
          {generateLogMessage(auditLog)}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(auditLog.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
};
