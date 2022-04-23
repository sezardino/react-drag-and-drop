export type Status = string;

export interface ITask {
  status: Status;
  title: string;
  order: number;
  id: number;
}

export interface IBoard {
  id: Status;
  title: string;
}

export interface IBoardWithTasks extends IBoard {
  tasks: ITask[];
}
