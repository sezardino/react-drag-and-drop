import { HTMLProps } from "react";
import { IBoardWithTasks, ITask, Status } from "../types";
import { Card } from "./Card";
import { Column } from "./Column";

interface BoardElementProps extends HTMLProps<HTMLUListElement> {
  columns: IBoardWithTasks[];
  changeStatus: (id: number, status: Status) => void;
  changeOrder: (id: number, order: number) => void;
}

export const BoardElement: React.FC<BoardElementProps> = (props) => {
  const { columns, changeStatus, changeOrder, ...rest } = props;
  const CARD_BG_CLASS = "after:bg-red-500";

  const toggleCardBorder = (target: HTMLElement) => {
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

  const cardDragStart = (evt: React.DragEvent, task: ITask) => {
    evt.dataTransfer.setData("task", JSON.stringify(task));
  };

  const columnDragEnter = (evt: React.DragEvent) => {
    evt.preventDefault();
    toggleCardBorder(evt.target as HTMLElement);
  };

  const columnDragLeave = (evt: React.DragEvent) => {
    const target = evt.target as HTMLElement;
    toggleCardBorder(target);
  };

  const onCardDrop = (evt: React.DragEvent, dropTask: ITask) => {
    evt.preventDefault();
    evt.stopPropagation();
    const task: ITask = JSON.parse(evt.dataTransfer.getData("task"));
    toggleCardBorder(evt.target as HTMLElement);

    if (task.id === dropTask.id) {
      return;
    }

    if (task.status !== dropTask.status) {
      changeStatus(task.id, dropTask.status);
    }

    const newOrder = dropTask.order + 1;
    changeOrder(task.id, newOrder);
  };

  const onColumnDrop = (evt: React.DragEvent, boardId: Status) => {
    evt.preventDefault();
    const task: ITask = JSON.parse(evt.dataTransfer.getData("task"));
    changeStatus(task.id, boardId);
  };

  return (
    <ul {...rest} className="flex gap-5 mt-5">
      {columns.map((column) => (
        <li
          key={column.id}
          className="min-w-[320px] bg-gray-200 max-h-screen h-screen rounded-lg shadow-lg"
        >
          <Column
            onDragOver={(evt) => evt.preventDefault()}
            onDrop={(evt) => onColumnDrop(evt, column.id)}
            onDragEnter={columnDragEnter}
            onDragLeave={columnDragLeave}
            column={column}
          >
            {(task) => (
              <Card
                task={task}
                className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-1"
                data-card
                draggable
                onDragStart={(evt) => cardDragStart(evt, task)}
                onDrop={(evt) => onCardDrop(evt, task)}
              />
            )}
          </Column>
        </li>
      ))}
    </ul>
  );
};
