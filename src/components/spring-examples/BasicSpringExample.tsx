/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useSpringValue,
  animated,
  useSpring,
  useTrail,
  useSpringRef,
  useChain,
} from "@react-spring/web";
import "./basic.css";
import { useEffect } from "react";

export default function BasicSpringExample() {
  return (
    <>
      <Example1></Example1>
      <Example2></Example2>
      <Example3></Example3>
      <Example4></Example4>
    </>
  );
}

// 1.作用于单个属性的useSpringValue使用
function Example1() {
  // 与我们的其他钩子不同，这个钩子不会对组件中的更新做出反应。
  // 这是设计使然。您必须使用返回 SpringValue 的方法更新所述值。
  const width = useSpringValue(0, {
    config: {
      /** 1.duration 延迟方式 */
      // duration: 2000, // 动画时长
      /** 2.定义摩擦力等参数方式(弹簧动画) */
      mass: 2, // 质量（也就是重量），质量越大，回弹惯性越大，回弹的距离和次数越多
      tension: 200, //  张力，弹簧松紧程度，弹簧越紧，回弹速度越快（越小弹簧动画越不明显，越大弹簧动画越快）
      friction: 10, // 摩擦力，增加点阻力可以抵消质量和张力的效果（回弹的幅度越大越小，太小也会造成回弹次数变多）
    },
  });

  useEffect(() => {
    // 需要使用start手动执行
    width.start(400);
  }, [width]);

  return (
    <>
      <h2>作用于单个属性的useSpringValue使用</h2>
      <animated.div className="box" style={{ width }}></animated.div>
    </>
  );
}

// 2.useSpring使用，可作用于多个属性
function Example2() {
  // 方式一，设置对象
  // const styles = useSpring({
  //   from: {
  //     width: 0,
  //     height: 0,
  //   },
  //   // 设置to后会自动执行
  //   to: {
  //     width: 300,
  //     height: 300,
  //   },
  //   config: {
  //     // duration: 2000,
  //     mass: 10,
  //     friction: 20,
  //     tension: 200,
  //   },
  // });

  // 方式二，回调函数
  const [styles, api] = useSpring(() => {
    return {
      from: {
        width: 100,
        height: 100,
      },
      config: {
        // duration: 2000,
        mass: 10,
        friction: 20,
        tension: 200,
      },
    };
  });

  const handleClick = () => {
    // 当你指定了 to，那会立刻执行动画，或者不指定 to，用 api.start 来开始动画
    api?.start({
      width: 300,
      height: 300,
    });
  };

  return (
    <>
      <h2>useSpring使用，可作用于多个属性</h2>
      <animated.div
        className="box"
        onClick={handleClick}
        style={{ ...styles }}
      ></animated.div>
    </>
  );
}

// 3.多个元素动画依次执行，useTrail使用
function Example3() {
  const [springs, api] = useTrail(3, () => ({
    from: {
      width: 0,
    },
    config: {
      duration: 1000,
    },
  }));

  useEffect(() => {
    api?.start({
      width: 300,
    });
  });

  return (
    <>
      <h2>多个元素动画依次执行，useTrail使用</h2>
      {springs.map((style, i) => {
        return (
          <animated.div
            className={"box"}
            key={`spring-trail-${i}`}
            style={style}
          ></animated.div>
        );
      })}
    </>
  );
}

// 4.动画链式调用，useChain使用
function Example4() {
  const spring1 = useSpringRef();

  const [springs1] = useTrail(
    3,
    () => ({
      ref: spring1,
      from: {
        width: 0,
      },
      to: {
        width: 300,
      },
      config: {
        duration: 1000,
      },
    }),
    []
  );

  const spring2 = useSpringRef();

  const [springs2] = useTrail(
    3,
    () => ({
      ref: spring2,
      from: {
        height: 100,
      },
      to: {
        height: 50,
      },
      config: {
        duration: 1000,
      },
    }),
    []
  );

  useChain([spring1, spring2], [0, 1], 1500);

  return (
    <>
      <h2>动画链式调用，useChain使用</h2>
      {springs1.map((style, i) => {
        return (
          <animated.div
            className="box"
            key={`spring-Chain-${i}`}
            style={{ ...style, ...springs2[i] }}
          ></animated.div>
        );
      })}
    </>
  );
}
