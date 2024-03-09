"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useCardModal } from "@/hooks/use-card-modal";

interface ActionsProps {
  card: CardWithList;
}

export const Actions = ({ card }: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card ${data.title} copied`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card ${data.title} deleted`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopyCard({ id: card.id, boardId });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({ id: card.id, boardId });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        variant="gray"
        size="inline"
        className="w-full justify-start"
        onClick={onCopy}
        disabled={isLoadingCopy}
      >
        <Copy className="w-4 h-4 mr-2" />
        Copy
      </Button>
      <Button
        variant="gray"
        size="inline"
        className="w-full justify-start"
        onClick={onDelete}
        disabled={isLoadingDelete}
      >
        <Trash className="w-4 h-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
