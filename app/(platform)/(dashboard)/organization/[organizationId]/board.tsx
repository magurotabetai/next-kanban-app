import { deleteBoard } from "@/actions/delete-board";
import { FormDelete } from "./form-delete";

interface BoardProps {
  title: string;
  id: string;
}

export const Board = ({ title, id }: BoardProps) => {
  const deleteBoardWithId = deleteBoard.bind(null, id);

  return (
    <form className="flex items-center gap-x-2" action={deleteBoardWithId}>
      <p>Board Title: {title}</p>
      <FormDelete />
    </form>
  );
};
