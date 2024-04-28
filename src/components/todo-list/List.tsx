import { useTodoListStore } from "./store";
import { Fragment } from "react";
import Gap from "./Gap";
import Item from "./Item";

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

export default List;
