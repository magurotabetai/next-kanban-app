import prisma from "@/lib/prisma";
import { create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { Board } from "./board";

const OrganizationPage = async () => {
  const boards = await prisma.board.findMany();

  return (
    <div className="flex flex-col space-y-4">
      <form action={create}>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
          className="border-black border p-1"
        />
        <Button type="submit">Create</Button>
      </form>
      <div className="space-y-2">
        {boards.map((board) => (
          <Board key={board.id} title={board.title} id={board.id} />
        ))}
      </div>
    </div>
  );
};

export default OrganizationPage;
