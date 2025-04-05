import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ListContainer } from "./_components/list-container";
import { lists, cards } from "@/lib/db/schema";
import { eq, and, asc } from "drizzle-orm";

interface BoardIdPageProps {
  params: Promise<{ boardId: string }>;
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const { boardId } = await params;

  const listsWithCards = await db.query.lists.findMany({
    where: and(
      eq(lists.boardId, boardId),
      eq(lists.boardId, boardId) // TODO: board.orgIdの条件を追加する必要があります
    ),
    with: {
      cards: {
        orderBy: [asc(cards.order)],
      },
    },
    orderBy: (lists, { asc }) => [asc(lists.order)],
  });

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer data={listsWithCards} boardId={boardId} />
      Board ID!
    </div>
  );
};

export default BoardIdPage;
