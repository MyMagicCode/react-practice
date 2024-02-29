import CS from "classnames";
import { Color } from "./Color";

interface HandlerProps {
  color: Color;
  size?: "default" | "small";
}

function Handler({ color, size = "default" }: HandlerProps) {
  const classNames = CS("color-picker-handler", {
    "color-picker-handler-small": size === "small",
  });
  return (
    <div
      className={classNames}
      style={{ backgroundColor: color.toRgbString() }}
    ></div>
  );
}

export default Handler;
