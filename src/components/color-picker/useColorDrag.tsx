import { useState } from "react";
import { TransformOffset } from "./Transform";

interface ColorDargProps {
  offset?: TransformOffset;
}

export function useColorDrag(props: ColorDargProps) {
  const { offset } = props;

  const [offsetValue, setOffsetValue] = useState<TransformOffset>(()=>{
    return offset || { x: 0, y: 0 }
  });

}
