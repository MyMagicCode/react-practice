
import { CSSProperties, useEffect, useRef, useState } from 'react'
import { DndProvider, useDrag, useDragLayer, useDrop } from 'react-dnd';
import { HTML5Backend, getEmptyImage } from 'react-dnd-html5-backend';
import './basic.css'

export default  function BasicExample(){
  return (
    <DndProvider backend={HTML5Backend}>
      <Container></Container>
      <Box color="lightblue"></Box>
      <Box color="lightcyan"></Box>
      <Box color="lightpink"></Box>
      <DragLayer></DragLayer>
    </DndProvider>
  )
}

interface BoxProps {
  color: CSSProperties['color']
}

interface ItemType {
  color: CSSProperties['color']
}

/** 容器 */
function Container(){

  const [boxList,setBoxList] = useState<ItemType[]>([])

  const [,drop] = useDrop<ItemType>(()=>{
    return {
      accept:'box',
      drop(item) {
          setBoxList((bl)=>[...bl,item])
      },
    }
  });

  // 第一种绑定方式
  // const containerRef = useRef(null);
  // useEffect(()=>{
  //   drop(containerRef)
  // },[drop])
  // return <div ref={containerRef} className="container"></div>
  
  // 第二种绑定方式
  return <div ref={drop} className="container">
    {boxList.map(({color})=>{
      return <div className='box' style={{backgroundColor:color}}></div>
    })}
  </div>
}

/** 被拖动的元素 */
function Box({color}:BoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);

  // [collect返回值,拖动源的连接器功能,用于拖动预览的连接器功能]
  const [{dragging} ,drag,dragPreview] = useDrag({
    type: 'box', // 拖动的类型标识
    item:{
      color
    },
    // 返回值是素组的第一个元素
    collect(monitor) {
        return {
          dragging: monitor.isDragging(),// 是否是拖动状态
        }
    },
  })

  useEffect(()=>{
    drag(boxRef);
    dragPreview(getEmptyImage());// 是拖动时预览元素为空图片
  },[drag,dragPreview])

  drag(boxRef);

  const className = "box "+ (dragging ? 'dragging':'');
 
  return <div ref={boxRef} style={{backgroundColor:dragging?'#fff':color}} className={className}></div>
}

/** 自定义预览元素 */
function DragLayer(){
  const { item, isDragging, currentOffset } = useDragLayer((monitor)=>{
    return {
      item: monitor.getItem() as ItemType,// 当前拖动的元素
      isDragging: monitor.isDragging(), // 当前拖动的监听器的拖动状态
      currentOffset:monitor.getSourceClientOffset(), // 实时获取当前拖动位置
    }
  })
  if(!isDragging) return null;

  return <div className='drag-layer' style={{
    top: currentOffset?.y! - 20,
    left: currentOffset?.x
  }}>{item.color}拖拖拖</div>
}