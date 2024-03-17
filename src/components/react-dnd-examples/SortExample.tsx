import { useCallback, useEffect, useRef, useState } from "react"
import "./sort.css"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

interface ItemType {
  id: number;
  index?: number;
  text: string;
}

export default function SortExample(){
  const [cardList,setCardList] = useState<ItemType[]>([{
    id:0,
    text: "哈哈哈"
  },{
    id:1,
    text: "嘻嘻嘻"
  },{
    id:2,
    text: "咩咩咩"
  },{
    id:3,
    text: "嘿嘿嘿"
  },{
    id:4,
    text: "叮叮叮"
  }])

  const swapIndex = useCallback((index1:number,index2:number)=>{

    const temp = cardList[index1];
    cardList[index1] = cardList[index2];
    cardList[index2] = temp;
    setCardList([...cardList])
  },[cardList])

  return (<DndProvider backend={HTML5Backend}>
    {cardList.map((item,index)=>{
      return <Card key={"card_"+item.id} index={index} swapIndex={swapIndex} data={item}></Card>
    })}
    <button onClick={()=>{
      setCardList([...cardList,{id:cardList.length,text:"添加的"}])
    }}>添加一个</button>
  </DndProvider>)
}

interface CardProps {
  data: ItemType;
  index: number;
  swapIndex:(index1: number, index2: number) => void
}

function Card(props:CardProps){
  const {data,swapIndex,index} = props;
  const cardRef = useRef(null);

  const [{dragging},drag] = useDrag({
    type: 'card',
    item:{
      id:data.text,
      index
    },
    collect(monitor) {
        return {
          dragging: monitor.isDragging()
        }
    },
  })


  const [,drop] = useDrop<Omit<ItemType,"text">>({
    accept:'card',
    hover(item) {
      console.log('data',data)
      if(item.index === index) return;
      swapIndex(item.index!,index);
      item.index = index 
    },
    // drop(item) {
    //   console.log(text);
    //   swapIndex(item.index!,index);
    //   item.index = index 
    // },
  })

  useEffect(()=>{
    drag(drop(cardRef));
  
  },[drag,drop])

  const className = "card "+ (dragging ? 'dragging':'');

  return <div ref={cardRef} className={className}>
    {data.text}
  </div>
}