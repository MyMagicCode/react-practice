import { CSSProperties, useState } from "react";
import cs from 'classnames'
import type { ColorType } from "./type";
import { Color } from "./Color";
import './index.scss'
import Palette from "./Palette";

export interface ColorPickerProps {
  value?:ColorType;
  onChange?:(value:Color)=>void;
  className?:string;
  style?: CSSProperties
}

function ColorPicker(props:ColorPickerProps){
  const { className, style, value } = props;

  const [colorValue,setColorValue] = useState<Color>(()=>{
    if(value instanceof Color) {
      return value
    }
    return new Color(value)
  })

  return (<div className={cs('color-picker',className)} style={style}>
    <Palette color={colorValue} />
  </div>)
}

export default ColorPicker;