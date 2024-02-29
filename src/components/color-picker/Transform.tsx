import { forwardRef, PropsWithChildren } from "react";

interface TransformProps extends PropsWithChildren {
  offset: { x: number; y: number };
}

const Transform = forwardRef<HTMLDivElement, TransformProps>((props, ref) => {
  const { children, offset } = props;
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        zIndex: 1,
        left: offset.x + "px",
        top: offset.y + "px",
        transform: `translate(50%,50%)`,
      }}
    >
      {children}
    </div>
  );
});

export default Transform;
