import { useRef } from "react";
import { Color } from "./Color";
import Handler from "./Handler";
import Transform from "./Transform";
import { useColorDrag } from "./useColorDrag";
import { calculateColor, calculateOffset } from "./utils";

function Palette({ color, onChange }: { color: Color,onChange:(color:Color)=>void }) {
  const transformRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [offset, onStartDrag] = useColorDrag({
    containerRef,
    targetRef: transformRef,
    color: color,
    calculate: () => {
      return calculateOffset(containerRef, transformRef, color);
    },
    onChangeOffset:(offset)=>{
      const newColor = calculateColor(offset,containerRef,transformRef,color)
      onChange(newColor)
    }
  });


  return (
    <div
      className="color-picker-palette"
      onMouseDown={onStartDrag}
      ref={containerRef}
    >
      <Transform ref={transformRef} offset={offset}>
        <Handler color={color} />
      </Transform>
      <div
        className="color-picker-palette-main"
        style={{
          backgroundColor: `hsl(${color.toHsl().h},100%, 50%)`,
          backgroundImage:
            "linear-gradient(0deg, #000, transparent),linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0))",
        }}
      />
    </div>
  );
}

export default Palette;
