/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnimatedProps, animated, useTransition } from "@react-spring/web";
import React, { CSSProperties, useState } from "react";
import "./transition.scss";

export default function TransitionExample() {
  return <Example2 />;
}

type PageItem = {
  (props: AnimatedProps<{ style: CSSProperties }>): React.ReactElement;
};

const pages: Array<PageItem> = [
  ({ style }) => (
    <animated.div style={{ ...style, backgroundColor: "lightblue" }}>
      A
    </animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, backgroundColor: "lightgreen" }}>
      B
    </animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, backgroundColor: "lightpink" }}>
      C
    </animated.div>
  ),
];
/** 例子一：使用useTransition,实现组件切换动画 */
function Example1() {
  const [index, set] = useState(0);

  const transitions = useTransition(index, {
    from: {
      transform: "translate3d(100%,0,0)",
      opacity: 0,
    },
    enter: {
      transform: "translate3d(0%,0,0)",
      opacity: 1,
    },
    leave: {
      transform: "translate3d(-50%,0,0)",
      opacity: 0,
    },
  });

  const handleClick = () => {
    set((i) => (i + 1) % 3);
  };

  return (
    <div className="container" onClick={handleClick}>
      {transitions((style, index) => {
        const Page = pages[index];
        return <Page style={style} />;
      })}
    </div>
  );
}

/**例子二：使用useTransition,实现列表过度动画化 */
function Example2() {
  const [list, setList] = useState(() => [
    {
      text: "zhang",
      id: 1,
    },
    {
      text: "wang",
      id: 2,
    },
  ]);

  const transitions = useTransition(list, {
    config: {
      duration: 200,
    },
    // 避免初始的数据触发动画
    initial: {
      transform: "translate3d(0%,0,0)",
      opacity: 1,
    },
    from: {
      transform: "translate3d(100%,0,0)",
      opacity: 0,
    },
    enter: {
      transform: "translate3d(0%,0,0)",
      opacity: 1,
    },
    leave: {
      transform: "translate3d(-50%,0,0)",
      opacity: 0,
    },
  });

  return (
    <div className="list">
      {transitions((style, item) => {
        return (
          <animated.div className="list-item" style={style}>
            <span>{item.text}</span>
            <span
              className="list-item-btn"
              onClick={() => {
                setList(list.filter((it) => it.id !== item.id));
              }}>
              x
            </span>
          </animated.div>
        );
      })}

      <div
        className="btn"
        onClick={() => {
          setList([...list, { text: "add", id: list.length + 1 }]);
        }}>
        Add
      </div>
    </div>
  );
}
