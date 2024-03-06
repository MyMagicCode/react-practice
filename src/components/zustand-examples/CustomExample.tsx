import { useEffect } from "react";
import { create } from "./CustomZustand";

interface ICounterState {
  count: number;
  setCount: (val: number) => void;
}

const useCounterStore = create<ICounterState>((set) => ({
  count: 0,
  setCount: (val: number) => set({ count: val }),
}));

export function CustomExample() {
  // 使用方式一
  // const { count, setCount } = useCounterStore();
  // 使用方式二
  const count = useCounterStore((state) => state.count);
  const setCount = useCounterStore((state) => state.setCount);

  useEffect(() => {
    // 监听state变化
    const unsubscribe = useCounterStore.subscribe((state) => {
      console.log("state", state);
    });
    return () => {
      // 取消监听
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Zustand Demo</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
