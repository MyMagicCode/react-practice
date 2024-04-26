import CS from "classnames";
import { CSSProperties } from "react";
import { useDrop } from "react-dnd";
import { IItem, useTodoListStore } from "./store";

interface GarbageBinProps {
  className?: string;
  style?: CSSProperties;
}

const GarbageBin = (props: GarbageBinProps) => {
  const deleteItem = useTodoListStore((store) => store.deleteItem);
  const { className, style } = props;
  const [{ isOver }, drop] = useDrop({
    accept: ["item"],
    drop(item: IItem) {
      deleteItem(item.id);
    },
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
  });
  const classNames = CS(
    "w-full h-[200px] bg-red-400 rounded-xl",
    "text-center leading-[200px] text-stone-50 text-[22px]",
    "border-2 border-red-400",
    isOver ? " bg-red-300 border-dashed" : "",
    className
  );

  return (
    <div ref={drop} style={style} className={classNames}>
      删除
    </div>
  );
};

export default GarbageBin;
