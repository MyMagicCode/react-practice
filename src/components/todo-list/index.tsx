import { DndProvider } from "react-dnd";
import GarbageBin from "./GarbageBin";
import List from "./List";
import NewItem from "./NewItem";
import { HTML5Backend } from "react-dnd-html5-backend";

const TodoListIndex = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-[600px] h-[700px]  mx-auto mt-8 flex justify-between">
        <div className="w-[360px]">
          <List />
        </div>
        <div className="w-[220px]">
          <NewItem className="mt-4" />
          <GarbageBin className="mt-4" />
        </div>
      </div>
    </DndProvider>
  );
};

export default TodoListIndex;
