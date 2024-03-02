import { forwardRef, PropsWithChildren } from "react";


export interface TransformOffset {
  x: number;
  y: number;
}
interface TransformProps extends PropsWithChildren {
  offset: TransformOffset;
}

const Transform = forwardRef<HTMLDivElement, TransformProps>((props, ref) => {
  const { children, offset } = props;
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        zIndex: 1,
        left: offset.x ?? 0,
        top: offset.y ?? 0,
      }}
    >
      {children}
    </div>
  );
});

export default Transform;
