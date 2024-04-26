import { CSSProperties } from "react";
import CS from "classnames";
import { useDrag } from "react-dnd";

interface NewItemProps {
  className?: string;
  style?: CSSProperties;
}

const NewItem = (props: NewItemProps) => {
  const { className } = props;

  const [{ dragging }, darg] = useDrag(() => ({
    type: "new-item",
    item: {
      type: "new-item",
    },
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      };
    },
  }));

  const classNames = CS(
    "w-full h-12 text-xl rounded-xl bg-cyan-800",
    " text-white flex justify-center items-center",
    "border-2 border-cyan-800",
    dragging ? "border-dashed bg-white" : "",
    className
  );

  return (
    <div ref={darg} className={classNames}>
      添加待办事项
    </div>
  );
};

export default NewItem;
