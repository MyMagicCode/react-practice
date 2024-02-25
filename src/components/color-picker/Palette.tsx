import { Color } from "./Color"

function Palette({color}:{color:Color}){
  return (<div className="color-picker-palette">
    <div 
        className="color-picker-palette-main"
        style={{
            backgroundColor: `hsl(${color.toHsl().h},100%, 50%)`,
            backgroundImage:
                'linear-gradient(0deg, #000, transparent),linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0))',
        }}
    />
  </div>)
}

export default Palette