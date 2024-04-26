import { useDrop } from "react-dnd";
import { useTodoListStore } from "./store";
import CS from "classnames";

const Gap = ({ id }: { id?: string }) => {
  const addItem = useTodoListStore((store) => store.addItem);
  const [{ isOver }, drop] = useDrop({
    accept: ["new-item"],
    drop(_, monitor) {
      if (monitor.getItemType() === "new-item") {
        addItem(
          {
            id: Date.now().toString(),
            status: "todo",
            content: "新的待办事项",
          },
          id
        );
      }
    },
    collect(monitor) {
      return { isOver: monitor.isOver() };
    },
  });

  const classNames = CS("w-full h-4 leading-4", isOver ? " bg-cyan-200" : "");

  return <div ref={drop} className={classNames}></div>;
};

export default Gap