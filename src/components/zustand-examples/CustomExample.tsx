import { useEffect } from "react";
import { create } from "./CustomZustand";

interface ICounterState {
  count: number;
  bar: number;
  setCount: (val: number) => void;
}

const useCounterStore = create<ICounterState>((set) => ({
  count: 0,
  bar: 999,
  setCount: (val: number) => set({ count: val }),
}));

export function CustomExample() {
  return (
    <>
      <Foo />
      <Bar />
    </>
  );
}

function Foo() {
  // 使用方式一
  // const { count, setCount } = useCounterStore();
  // 使用方式二
  const count = useCounterStore((state) => state.count);
  const setCount = useCounterStore((state) => state.setCount);

  console.log("render Foo");

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

function Bar() {
  const bar = useCounterStore((state) => state.bar);
  console.log("render Bar");
  return <div>Bar Number is {bar}</div>;
}
