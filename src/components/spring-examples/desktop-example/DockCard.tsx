import {
  animated,
  useIsomorphicLayoutEffect,
  useSpringValue,
} from "@react-spring/web";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useDockContext } from "./DockContext";
import useMousePosition from "./hook/useMousePostion";

interface DockCardProps extends PropsWithChildren {}

const INITIAL_WIDTH = 48;

export default function DockCard({ children }: DockCardProps) {
  const dockContext = useDockContext();
  const cardRef = useRef<HTMLButtonElement>(null!);
  // 存放元素的中心点在页面的位置
  const [cardCenterX, setCardCenterX] = useState(0);

  const opacity = useSpringValue(0);

  // 宽度动画
  const size = useSpringValue(INITIAL_WIDTH, {
    config: {
      mass: 0.1,
      tension: 320,
    },
  });

  useEffect(() => {
    const { x, width } = cardRef.current.getBoundingClientRect();
    setCardCenterX(x + width / 2);
  }, []);

  // 鼠标移动的时候计算宽高
  useMousePosition(
    {
      onChange({ value }) {
        // 边界判断和hover状态才触发
        if (value.x > 0 && dockContext.hovered) {
          const mouseX = value.x;

          const { width } = dockContext;
          // 计算这个弧度值的余弦值。余弦函数的值在 -π/2 到 π/2 的范围内从 0 增加到 1，然后减少到 0。
          //  12次方是使得相邻的差距更大
          const transformedValue =
            INITIAL_WIDTH +
            36 *
              Math.cos((((mouseX - cardCenterX) / width) * Math.PI) / 2) ** 12;
          size.start(transformedValue);
        }
      },
    },
    [dockContext, cardCenterX]
  );

  // 当hovered 为false的时候重置状态
  useIsomorphicLayoutEffect(() => {
    if (!dockContext.hovered) {
      size.start(INITIAL_WIDTH);
    }
  }, [dockContext]);

  const handleClick = () => {
    opacity.start(0.5);
    setTimeout(() => {
      opacity.start(0);
    }, 1000);
  };

  return (
    <div className="dock-card-container">
      <animated.button
        onClick={handleClick}
        ref={cardRef}
        className="dock-card"
        style={{ width: size, height: size }}>
        {children}
      </animated.button>
      <animated.div style={{ opacity }} className="dock-dot"></animated.div>
    </div>
  );
}
