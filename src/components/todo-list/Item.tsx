import { useState } from "react";
import { IItem, useTodoListStore } from "./store";
import CS from "classnames";
import { useDrag, useDrop } from "react-dnd";

interface ItemProps {
  value: IItem;
}
const Item = ({ value }: ItemProps) => {
  const updateItem = useTodoListStore((store) => store.updateItem);
  const sortItem = useTodoListStore((store) => store.sortItem);
  const [isEdit, setIsEdit] = useState(false);
  const [editingContent, setEditingContent] = useState("");

  const [{ dragging }, darg] = useDrag({
    type: "item",
    item: { ...value },
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      };
    },
  });

  const [,drop] = useDrop({
    accept:"item",
    hover(item:IItem) {
        if(item.id !== value.id){
          sortItem(item,value)
        }
    },
  })

  const handleDoubleClick = () => {
    setIsEdit(true);
    setEditingContent(value.content);
  };

  const classNames = CS(
    "w-full h-12 bg-gray-600 rounded-xl",
    " flex justify-start items-center text-xl",
    "text-zinc-50 cursor-move",
    "border-2 border-gray-600",
    dragging ? "border-dashed bg-white" : ""
  );

  return (
    <div ref={(el)=>darg(drop(el))} className={classNames} onDoubleClick={handleDoubleClick}>
      <input
        type="checkbox"
        defaultChecked={value.status === "done"}
        onClick={() =>
          updateItem({
            ...value,
            status: value.status === "done" ? "todo" : "done",
          })
        }
        className="h-[25px] w-[25px] mx-3"
      />
      {isEdit ? (
        <input
          value={editingContent}
          className="text-slate-900"
          onChange={(e) => setEditingContent(e.target.value)}
          onBlur={() => {
            setIsEdit(false);
            updateItem({
              ...value,
              content: editingContent,
            });
          }}
          type="text"
        />
      ) : (
        <p>{value.content}</p>
      )}
    </div>
  );
};

export default Item