import { AnimatedProps,animated, useTransition } from "@react-spring/web"
import React, { CSSProperties, useState } from "react"
import './transition.css'

type PageItem = {
  (props:AnimatedProps<{style:CSSProperties}>):React.ReactElement
}

const pages:Array<PageItem> = [
  ({style})=><animated.div style={{...style,backgroundColor:"lightblue"}}>A</animated.div>,
  ({style})=><animated.div style={{...style,backgroundColor:"lightgreen"}}>B</animated.div>,
  ({style})=><animated.div style={{...style,backgroundColor:"lightpink"}}>C</animated.div>,
] 

function TransitionExample(){

  const [index, set] = useState(0);


  const transitions = useTransition(index,{
    from:{
      transform: 'translate3d(100%,0,0)',
      opacity: 0,
    },
    enter:{
      transform: 'translate3d(0%,0,0)',
      opacity: 1,
    },
    leave:{
      transform: 'translate3d(-50%,0,0)',
      opacity: 0,
    }
  });

  const handleClick = ()=>{
    set((i)=> (i+1)%3)
  }

  return (
    <div className="container" onClick={handleClick}>
      {
        transitions((style,index)=>{
          const Page = pages[index];
          return  <Page style={style}/>
        })
      }
    </div>
  )
}

export default TransitionExample