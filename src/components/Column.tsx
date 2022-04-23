import { HTMLProps } from "react";
import { IBoardWithTasks, ITask } from "../types";

interface ColumnProps extends Omit<HTMLProps<HTMLDivElement>, "children"> {
  column: IBoardWithTasks;
  children: (task: ITask) => JSX.Element;
}

export const Column: React.FC<ColumnProps> = (props) => {
  const { column, children, ...rest } = props;
  return (
    <div {...rest} className="h-full">
      <header className="bg-gray-100 p-4">
        <h2 className="font-bold text-xl">{column.title}</h2>
      </header>
      <ul className="flex flex-col gap-4 p-1 h-full">
        {column.tasks.map((task) => (
          <li key={task.id} className="cursor-grab">
            {children(task)}
          </li>
        ))}
      </ul>
    </div>
  );
};
