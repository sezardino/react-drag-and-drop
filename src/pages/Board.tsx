import { BoardElement, Button } from "../components";
import { useBoard } from "../hooks";
import { columnsArr, tasksArr } from "../mock-data";

const Board = () => {
  const { addColumn, addTask, boardContent, changeStatus, changeOrder } =
    useBoard({ columns: columnsArr, tasks: tasksArr });

  return (
    <div className="container mx-auto mt-8">
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Board DND</h1>
        <div className="flex gap-2">
          <Button onClick={addColumn}>Add new Column</Button>
          <Button onClick={addTask}>Create Task</Button>
        </div>
      </header>
      <BoardElement
        columns={boardContent}
        changeOrder={changeOrder}
        changeStatus={changeStatus}
      />
    </div>
  );
};

export default Board;
