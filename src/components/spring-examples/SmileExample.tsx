import {
  useTrail,
  animated,
  useSpringRef,
  useSprings,
  useChain,
} from "@react-spring/web";
import { useEffect } from "react";

const STROKE_WIDTH = 0.5;

const MAX_WIDTH = 150;
const MAX_HEIGHT = 100;

const COORDS = [
  [50, 30],
  [90, 30],
  [50, 50],
  [60, 60],
  [70, 60],
  [80, 60],
  [90, 50],
];

export default function SmileExample() {
  const gridApi = useSpringRef();

  const linePositions = useTrail(16, {
    ref: gridApi,
    from: {
      x2: 0,
      y2: 0,
    },
    to: {
      x2: MAX_WIDTH,
      y2: MAX_HEIGHT,
    },
  });

  const boxApi = useSpringRef();

  const [boxSpring] = useSprings(7, (i) => ({
    ref: boxApi,
    from: {
      scale: 0,
    },
    to: {
      scale: 1,
    },
    delay: i * 200, // 延迟时间
    config: {
      mass: 2,
      tension: 220,
    },
  }));

  useEffect(() => {
    gridApi.start();
  }, [gridApi]);

  useChain([gridApi, boxApi], [0, 1], 1500);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#cfcfcf",
      }}
    >
      <div
        style={{
          width: "600px",
          height: "600px",
          margin: "50px auto 0px auto",
          color: "#fff",
        }}
      >
        <svg viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
          <g>
            {/* 横线 */}
            {linePositions.map(({ x2 }, index) => {
              return (
                <animated.line
                  key={`horizontal-${index}`}
                  x1={0}
                  y1={index * 10}
                  x2={x2}
                  y2={index * 10}
                  strokeWidth={STROKE_WIDTH}
                  stroke="currentColor"
                ></animated.line>
              );
            })}
            {linePositions.map(({ y2 }, index) => {
              return (
                <animated.line
                  key={`vertical-${index}`}
                  x1={index * 10}
                  y1={0}
                  x2={index * 10}
                  y2={y2}
                  strokeWidth={STROKE_WIDTH}
                  stroke="currentColor"
                ></animated.line>
              );
            })}
            {boxSpring.map(({ scale }, index) => {
              return (
                <animated.rect
                  width={10}
                  height={10}
                  key={`spring-rect-${index}`}
                  fill="currentColor"
                  style={{
                    transform: `translate(${COORDS[index][0]}px,${COORDS[index][1]}px)`,
                    transformOrigin: "5px 5px",
                    scale,
                  }}
                ></animated.rect>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
