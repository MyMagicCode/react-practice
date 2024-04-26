import { create } from "zustand";

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
}

const useTodoListStore = create<ITodoListState>((set) => ({
  list: [],
  addItem(item, id) {
    set((state) => {
      if (id) {
        const index = state.list.findIndex((it) => it.id === id);
        // 判断是否是换位置，是就过滤原来元素
        const newList = state.list.filter((it) => it.id !== item.id);
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
}));

export { useTodoListStore };
