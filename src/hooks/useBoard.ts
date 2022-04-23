import { useState, useMemo } from "react";
import { columnsArr, tasksArr } from "../mock-data";
import { IBoard, ITask, Status } from "../types";

interface UseBoardProps {
  tasks: ITask[];
  columns: IBoard[];
}

export const useBoard = (props: UseBoardProps) => {
  const [columns, setColumns] = useState<IBoard[]>(props.columns);
  const [tasks, setTasks] = useState<ITask[]>(props.tasks);

  const addColumn = () => {
    const name = prompt("Enter new board name", "");
    if (!name) {
      return alert("You must enter name");
    }

    if (columns.find((board) => board.title === name)) {
      return alert("Board with this name already exists");
    }

    const newColumn: IBoard = {
      id: name.replace(" ", "-").toLowerCase(),
      title: name,
    };

    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  const addTask = () => {
    const title = prompt("Enter new board title", "");
    if (!title) {
      return alert("You must enter title");
    }

    const lastTask = tasks.pop();

    const newTask: ITask = {
      id: lastTask ? lastTask.id + 1 : 1,
      title,
      status: "todo",
      order: lastTask ? lastTask.order + 1 : 1,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const boardContent = useMemo(() => {
    return columns.map((column) => ({
      ...column,
      tasks: tasks
        .filter((task) => task.status === column.id)
        .sort((a, b) => a.order - b.order),
    }));
  }, [tasks, columns]);

  const changeStatus = (id: number, status: Status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, status };
        }
        return task;
      })
    );
  };

  const changeOrder = (id: number, order: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, order };
        }
        return task;
      })
    );
  };

  const changeTaskStatus = (taskId: number, newStatus: Status) => {
    const neededTask = tasks.find((task) => task.id === taskId);
    const neededBoard = boardContent.find((board) => board.id === newStatus);

    if (!neededTask || !neededBoard) {
      return;
    }

    if (neededTask.status === newStatus) {
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const lastTaskInBoard = neededBoard.tasks.pop();

          task.status = newStatus;
          task.order = lastTaskInBoard ? lastTaskInBoard.order + 1 : 1;
        }

        return task;
      })
    );
  };

  return {
    addColumn,
    addTask,
    boardContent,
    changeOrder,
    changeStatus,
  };
};
