import { HTMLProps } from "react";
import { IBoardWithTasks, Status } from "../types";
import { Card } from "./Card";
import { Column } from "./Column";

interface BoardElementProps extends HTMLProps<HTMLUListElement> {
  boards: IBoardWithTasks[];
  columnDrop: (taskId: number, newStatus: Status) => void;
  cardDrop: (currentTaskId: number, dropTaskId: number) => void;
}

export const BoardElement: React.FC<BoardElementProps> = (props) => {
  const { boards, columnDrop, cardDrop, ...rest } = props;
  const CARD_BG_CLASS = "after:bg-red-500";

  const toggleCardBorder = (target: HTMLDivElement) => {
    const card = target.closest("[data-card]");
    if (!card) {
      return;
    }

    if (card.classList.contains(CARD_BG_CLASS)) {
      card.classList.remove(CARD_BG_CLASS);
      return;
    }
    card.classList.add(CARD_BG_CLASS);
  };

  const cardDragStart = (
    evt: React.DragEvent<HTMLDivElement>,
    taskId: number
  ) => {
    evt.dataTransfer.setData("taskId", taskId.toString());
  };

  const columnDragEnter = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    toggleCardBorder(evt.target as HTMLDivElement);
  };

  const columnDragLeave = (evt: React.DragEvent<HTMLDivElement>) => {
    const target = evt.target as HTMLDivElement;
    toggleCardBorder(target);
  };

  const onCardDrop = (
    evt: React.DragEvent<HTMLDivElement>,
    dropTaskId: number
  ) => {
    evt.preventDefault();
    evt.stopPropagation();
    const taskId = +evt.dataTransfer.getData("taskId");
    toggleCardBorder(evt.target as HTMLDivElement);

    if (taskId === dropTaskId) {
      return;
    }

    cardDrop(taskId, dropTaskId);
  };

  const onColumnDrop = (
    evt: React.DragEvent<HTMLDivElement>,
    boardId: Status
  ) => {
    evt.preventDefault();
    const taskId = +evt.dataTransfer.getData("taskId");
    columnDrop(taskId, boardId);
  };

  return (
    <ul {...rest} className="flex gap-5 mt-5">
      {boards.map((board) => (
        <li
          key={board.id}
          className="min-w-[320px] bg-gray-200 max-h-screen h-screen rounded-lg shadow-lg"
        >
          <Column
            onDragOver={(evt) => evt.preventDefault()}
            onDrop={(evt) => onColumnDrop(evt, board.id)}
            onDragEnter={columnDragEnter}
            onDragLeave={columnDragLeave}
            board={board}
          >
            {(task) => (
              <Card
                task={task}
                className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-1"
                data-card
                draggable
                onDragStart={(evt) => cardDragStart(evt, task.id)}
                onDrop={(evt) => onCardDrop(evt, task.id)}
              />
            )}
          </Column>
        </li>
      ))}
    </ul>
  );
};
