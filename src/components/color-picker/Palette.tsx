import { Color } from "./Color";
import Handler from "./Handler";
import Transform from "./Transform";

function Palette({ color }: { color: Color }) {
  return (
    <div className="color-picker-palette">
      <Transform offset={{ x: 50, y: 50 }}>
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
