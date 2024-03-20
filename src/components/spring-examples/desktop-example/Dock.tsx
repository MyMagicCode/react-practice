import { animated, useSpringValue } from "@react-spring/web";
import { clamp } from "@react-spring/shared";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { DockProvider } from "./DockContext";

interface DockProps extends PropsWithChildren {}

export const DOCK_ZOOM_LIMIT = [-100, 50];

export default function Dock({ children }: DockProps) {
  const [hovered, setHovered] = useState(false);
  const [width, setWidth] = useState(0);
  const dockRef = useRef<HTMLDivElement>(null!);

  const zoomLevel = useSpringValue(1, {
    onChange: (e) => {
      console.log("e", e);
    },
  });

  useEffect(() => {
    setWidth(dockRef.current.clientWidth);
  }, []);

  return (
    <DockProvider value={{ hovered, width }}>
      <animated.div
        className="dock"
        ref={dockRef}
        onMouseOver={(e) => {
          setHovered(true);
        }}
        onMouseOut={() => {
          setHovered(false);
        }}
        style={{
          x: "-50%",
          scale: zoomLevel
            .to({
              range: [DOCK_ZOOM_LIMIT[0], 1, DOCK_ZOOM_LIMIT[1]],
              output: [2, 1, 0.5],
            })
            .to((value) => {
              return clamp(0.5, 2, value);
            }),
        }}>
        {children}
      </animated.div>
    </DockProvider>
  );
}
