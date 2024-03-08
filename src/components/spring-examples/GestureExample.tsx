import { useSprings, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import "./gesture.css";
import { useRef } from "react";

const pages = [
  "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];

function GestureExample() {
  const width = window.innerWidth;
  const pageIndex = useRef(0);

  const [views, viewApi] = useSprings(pages.length, (index) => ({
    x: index * width,
    scale: 1,
  }));

  /**
   * movement 是拖动距离 [x, y]
    direction 是拖动方向 [x, y]，1 代表向左（向上）、-1 代表向右（向下）。
    active 是当前是否在拖动。
    cancel 方法可以中止事件。
   */
  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], cancel }) => {
      // 判断是否拖动过一半了
      if (active && Math.abs(mx) > width / 2) {
        if (xDir === 1) {
          pageIndex.current -= pageIndex.current === 0 ? 0 : 1;
        } else if (xDir === -1) {
          pageIndex.current += pageIndex.current === pages.length - 1 ? 0 : 1;
        }
        cancel();
      }
      viewApi.start((i) => {
        // 减少动画数量
        if (i < pageIndex.current - 1 || i > pageIndex.current + 1)
          return { display: "none" };
        // 计算每个的偏移量
        const x = (i - pageIndex.current) * width + (active ? mx : 0);
        // 按比例缩小 宽比上拖动的距离
        const scale = active ? 1 - Math.abs(mx) / width : 1;
        return { x, scale };
      });
    }
  );
  return (
    <div className="wrapper" {...bind()}>
      {views.map(({ x, scale }, index) => {
        return (
          <animated.div
            key={`wrapper-page-${index}`}
            className="page"
            style={{ x }}
          >
            <animated.div
              style={{
                scale,
                backgroundImage: `url(${pages[index]})`,
              }}
            />
          </animated.div>
        );
      })}
    </div>
  );
}

export default GestureExample;
