import CS from "classnames";
import { useDrag, useDrop } from "react-dnd";
import { IItem, useTodoListStore } from "./store";
import { Fragment, useState } from "react";

const List = () => {
  const list = useTodoListStore((state) => state.list);
  return (
    <div className="h-full border-2 border-black px-1 py-2 overflow-scroll overflow-x-hidden">
      {list.map((item) => {
        return (
          <Fragment key={item.id}>
            <Gap id={item.id} />
            <Item value={item} />
          </Fragment>
        );
      })}
      <Gap />
    </div>
  );
};

interface ItemProps {
  value: IItem;
}
const Item = ({ value }: ItemProps) => {
  const updateItem = useTodoListStore((store) => store.updateItem);
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

  const handleDoubleClick = () => {
    setIsEdit(true);
    setEditingContent(value.content);
  };

  const classNames = CS(
    "w-full h-12 bg-gray-600 rounded-xl",
    " flex justify-start items-center text-xl",
    "text-zinc-50 ",
    "border-2 border-gray-600",
    dragging ? "border-dashed bg-white" : ""
  );

  return (
    <div ref={darg} className={classNames} onDoubleClick={handleDoubleClick}>
      <input
        type="checkbox"
        checked={value.status === "done"}
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

const Gap = ({ id }: { id?: string }) => {
  const addItem = useTodoListStore((store) => store.addItem);
  const [{ isOver }, drop] = useDrop({
    accept: ["item", "new-item"],
    drop(item, monitor) {
      if (monitor.getItemType() === "new-item") {
        addItem(
          {
            id: Date.now().toString(),
            status: "todo",
            content: "" + Date.now().toString(),
          },
          id
        );
      } else {
        addItem(item as IItem, id);
      }
    },
    collect(monitor) {
      return { isOver: monitor.isOver() };
    },
  });

  const classNames = CS("w-full h-4 leading-4", isOver ? " bg-cyan-200" : "");

  return <div ref={drop} className={classNames}></div>;
};

export default List;
