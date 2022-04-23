import { HTMLProps } from "react";
import cn from "classnames";

import { ITask } from "../types";

interface ICard extends HTMLProps<HTMLDivElement> {
  task: ITask;
}

export const Card: React.FC<ICard> = (props) => {
  const { task, className, ...rest } = props;
  return (
    <div
      {...rest}
      className={cn(
        "bg-white py-3 px-2 rounded-md relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-10",
        className
      )}
    >
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <div className="flex justify-between font-semibold text-md mt-4">
        <small>id: {task.id}</small>
        <small>status: {task.status}</small>
      </div>
    </div>
  );
};
