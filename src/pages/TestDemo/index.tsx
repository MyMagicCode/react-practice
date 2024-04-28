import { RefObject, useRef } from "react";
import useMutateObserver from "../../hook/useMutateObserver";
import MutateObserver from "../../common/MutateObserver";

const TestHook = () => {
  const divRef1 = useRef<HTMLDivElement>(null);
  const divRef2 = useRef<HTMLDivElement>(null);

  useMutateObserver(divRef1, (a, b) => {
    console.log("监视触发", a, b);
  });

  const handleDivAdd = (ref: RefObject<HTMLElement>) => {
    const p = document.createElement("p");
    p.textContent = "111";
    ref.current?.appendChild(p);
  };

  return (
    <div>
      <h2 className=" font-bold text-lg text-center">测试useMutateObserver</h2>
      <div ref={divRef1} className="w-[300px] mx-auto">
        受useMutateObserver监控元素
        <button
          className="block bg-slate-400 text-white py-2 px-4 rounded-lg"
          onClick={() => handleDivAdd(divRef1)}>
          添加元素
        </button>
      </div>
      <MutateObserver
        onMutate={(a, b) => {
          console.log("监视触发", a, b);
        }}>
        <div className="w-[300px] mx-auto">
          受MutateObserver组件监控元素
          <div ref={divRef2}></div>
          <button
            className="block bg-slate-400 text-white py-2 px-4 rounded-lg"
            onClick={() => handleDivAdd(divRef2)}>
            添加元素
          </button>
        </div>
      </MutateObserver>
    </div>
  );
};

export default TestHook;
