import { IBoard, ITask } from "./types";

export const boardsArr: IBoard[] = [
  {
    id: "todo",
    title: "To Do",
  },
  {
    id: "in-progress",
    title: "In Progress",
  },
  {
    id: "done",
    title: "Done",
  },
];

export const tasksArr: ITask[] = [
  {
    id: 1,
    status: "todo",
    order: 1,
    title: "Task 1",
  },
  {
    id: 2,
    status: "todo",
    order: 2,
    title: "Task 2",
  },
  {
    id: 3,
    status: "todo",
    order: 3,
    title: "Task 3",
  },
  {
    id: 4,
    status: "in-progress",
    order: 1,
    title: "Task 4",
  },
  {
    id: 6,
    status: "in-progress",
    order: 2,
    title: "Task 6",
  },
  {
    id: 7,
    status: "todo",
    order: 4,
    title: "Task 7",
  },
  {
    id: 8,
    status: "done",
    order: 1,
    title: "Task 8",
  },
  {
    id: 9,
    status: "todo",
    order: 5,
    title: "Task 9",
  },
];
