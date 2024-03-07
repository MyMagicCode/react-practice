import React, { CSSProperties, useMemo } from "react";
import cs from "classnames";
import "./style.scss";
import { useConfigContext } from "./ConfigContext";

export type SizeType = "small" | "middle" | "large" | number | undefined;

interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode[];
  className?: string;
  style?: CSSProperties;
  direction?: "horizontal" | "vertical"; // 对其方向
  align?: "start" | "end" | "center" | "baseline"; // 子元素对齐模式
  size?: SizeType | [SizeType, SizeType];
  wrap?: boolean;
  split?: React.ReactNode; // 间隔元素
}

function Space(props: SpaceProps) {
  const { space } = useConfigContext();

  const {
    style,
    className,
    children,
    direction = "horizontal",
    align,
    size = space?.size || "small",
    split,
    wrap,
    ...other
  } = props;

  const childNodes = React.Children.toArray(children);

  const nodes = childNodes.map((child: any, index) => {
    const key = (child && child.key) || `space-item-${index}`;
    return (
      <>
        <div key={key} className="space-item">
          {child}
        </div>
        {index < childNodes.length - 1 && split && (
          <span key={`space-split-${index}`}>{split}</span>
        )}
      </>
    );
  });

  const [horizontalSize, verticalSize] = useMemo(() => {
    return (Array.isArray(size) ? size : [size, size]).map((item) =>
      getNumberSize(item)
    );
  }, [size]);

  // 子元素对齐模式,默认为center，horizontal模式有效
  const mergedAlign = direction === "horizontal" && !align ? "center" : align;

  const calcClassNames = cs(
    "space",
    `space-${direction}`,
    { [`space-align-${mergedAlign}`]: mergedAlign, [`space-wrap`]: wrap },
    className
  );

  const otherStyle: CSSProperties = {
    columnGap: horizontalSize,
    rowGap: verticalSize,
  };

  return (
    <div
      style={{ ...otherStyle, ...style }}
      className={calcClassNames}
      {...other}
    >
      {nodes}
    </div>
  );
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};
function getNumberSize(size: SizeType) {
  return typeof size === "string" ? spaceSize[size] : size || 0;
}

export default Space;
