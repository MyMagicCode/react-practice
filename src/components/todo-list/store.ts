import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IItem {
  id: string;
  status: "done" | "todo";
  content: string;
}

interface ITodoListState {
  list: IItem[];
  addItem: (item: IItem, id?: string) => void;
  updateItem: (item: IItem) => void;
  deleteItem: (id: string) => void;
  sortItem: (item1: IItem, item2: IItem) => void;
}

const useTodoListStore = create(
  persist<ITodoListState>(
    (set) => ({
      list: [],
      addItem(item, id) {
        set((state) => {
          if (id) {
            const index = state.list.findIndex((it) => it.id === id);
            const newList = [...state.list];
            newList.splice(index, 0, item);
            return {
              list: newList,
            };
          }
          return {
            list: [...state.list, item],
          };
        });
      },
      deleteItem(id) {
        set((state) => {
          return {
            list: state.list.filter((it) => it.id !== id),
          };
        });
      },
      updateItem(item) {
        set((state) => {
          return {
            list: state.list.map((it) => {
              if (it.id === item.id) {
                return item;
              } else {
                return it;
              }
            }),
          };
        });
      },
      sortItem(item1, item2) {
        set((state) => {
          // 是就过滤原来元素
          const newList = state.list.map((it) => {
            if (it.id === item1.id) {
              return item2;
            } else if (it.id === item2.id) {
              return item1;
            } else {
              return it;
            }
          });

          return { list: newList };
        });
      },
    }),
    { name: "todo-list" }
  )
);

export { useTodoListStore };
