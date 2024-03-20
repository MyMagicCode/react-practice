import { UseSpringProps, useSpring } from "@react-spring/web";
import { useEffect, useMemo } from "react";

export default function useMousePosition(
  springProps: UseSpringProps,
  springDeps?: readonly any[]
) {
  const [{ x, y }, api] = useSpring({ x: 0, y: 0, ...springProps }, springDeps);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      api.start({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(() => ({ x, y }), [x, y]);
}
