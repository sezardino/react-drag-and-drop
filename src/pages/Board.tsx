import { useEffect, useMemo, useState } from "react";
import { BoardElement } from "../components/BordElement";
import { boardsArr, tasksArr } from "../mock-data";
import { IBoard, ITask, Status } from "../types";

const Board = () => {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);

  // fetch data
  useEffect(() => {
    setBoards(boardsArr);
    setTasks(tasksArr);
  }, []);

  const columnDrop = (taskId: number, newStatus: Status) => {
    const neededTask = tasks.find((task) => task.id === taskId);
    const neededBoard = boardsContent.find((board) => board.id === newStatus);

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

  const cardDrop = (currentTaskId: number, dropTaskId: number) => {
    const currentTask = tasks.find((task) => task.id === currentTaskId);
    const dropTask = tasks.find((task) => task.id === dropTaskId);
    const neededBoard = boards.find((board) => board.id === dropTask?.status);

    if (!currentTask || !dropTask || !neededBoard) {
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === currentTaskId) {
          task.status = dropTask.status;
          task.order = dropTask.order + 1;
        }
        return task;
      })
    );
  };

  const addNewBoard = () => {
    const name = prompt("Enter new board name", "");
    if (!name) {
      return alert("You must enter name");
    }

    if (boards.find((board) => board.title === name)) {
      return alert("Board with this name already exists");
    }

    const newBoard: IBoard = {
      id: name.replace(" ", "-").toLowerCase(),
      title: name,
    };

    setBoards([...boards, newBoard]);
  };

  const boardsContent = useMemo(() => {
    return boards.map((board) => ({
      ...board,
      tasks: tasks
        .filter((task) => task.status === board.id)
        .sort((a, b) => a.order - b.order),
    }));
  }, [tasks]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-semibold">Board DND</h1>
      <BoardElement
        boards={boardsContent}
        columnDrop={columnDrop}
        cardDrop={cardDrop}
      />
    </div>
  );
};

export default Board;
