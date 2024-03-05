import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface ICounterState {
  count: number;
  setCount: (val: number) => void;
}

// 自定义，日志中间件
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logMiddleware = (fn: StateCreator<ICounterState, [], []>) => {
  return function (set: any, get: any, store: any) {
    // 自定义set
    const newSet = (value: any, replace: any) => {
      console.log("log:", get());
      set(value, replace);
    };

    return fn(newSet, get, store);
  };
};

const useCounterStore = create(
  persist<ICounterState>(
    (set) => ({
      count: 0,
      setCount: (val: number) => set({ count: val }),
    }),
    {
      name: "test",
    }
  )
);

export function MiddlewareExample() {
  const { count, setCount } = useCounterStore();

  return (
    <div>
      <h1>Zustand Demo</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
