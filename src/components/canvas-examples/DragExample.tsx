import { useEffect, useRef } from "react";

interface ItemType {
  color: string;
  width: number;
  height: number;
  x?: number;
  y?: number;
}

const elements: ItemType[] = [
  {
    color: "lightpink",
    width: 50,
    height: 80,
  },
  {
    color: "lightseagreen",
    width: 50,
    height: 80,
  },
  {
    color: "lightslategray",
    width: 50,
    height: 80,
  },
  {
    color: "lightsalmon",
    width: 50,
    height: 80,
  },
  {
    color: "lightskyblue",
    width: 50,
    height: 80,
  },
];

export default function DragExample() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = ref.current!;
    const ctx = cvs.getContext("2d")!;
    let currentIndex: null | number = null;
    const position = { x: 0, y: 0 };
    // 保存状态
    ctx.save();
    // 计算出随机位置
    const elementList = elements.map((item) => {
      const x = Math.floor(Math.random() * 450);
      const y = Math.floor(Math.random() * 420);
      return {
        ...item,
        x,
        y,
      };
    });

    const onMousedown = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { x, y } = cvs.getBoundingClientRect();
      position.y = clientY - y;
      position.x = clientX - x;
      const index = checkElement(elementList, position);

      if (index === null) return;
      currentIndex = index;
      console.log("当前点击的元素颜色", elementList[index].color);
      cvs.addEventListener("mousemove", onMousemove);
      cvs.addEventListener("mouseup", onMouseup);
    };

    const onMousemove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { x, y } = cvs.getBoundingClientRect();
      const currentX = clientX - x;
      const currentY = clientY - y;

      // 计算移动距离
      const moveX = position.x - currentX;
      const moveY = position.y - currentY;

      // 计算元素位置
      elementList[currentIndex!].x -= moveX;
      elementList[currentIndex!].y -= moveY;

      // 覆盖原来x,y
      position.x = currentX;
      position.y = currentY;

      // 重新渲染元素
      renderElements(ctx, elementList);
    };

    const onMouseup = () => {
      cvs.removeEventListener("mouseup", onMouseup);
      cvs.removeEventListener("mousemove", onMousemove);
    };

    // 监听鼠标点击事件
    cvs.addEventListener("mousedown", onMousedown);

    // 添加元素
    renderElements(ctx, elementList);

    return () => {
      // 恢复上次保存的状态
      ctx.restore();
      ctx.clearRect(0, 0, 500, 500);
      cvs.removeEventListener("mousedown", onMousedown);
    };
  }, []);

  return (
    <>
      <canvas
        ref={ref}
        width={500}
        height={500}
        style={{
          borderRadius: 8,
          marginLeft: 50,
          marginTop: 50,
          border: "1px solid #ccc",
        }}></canvas>
    </>
  );
}

/** 渲染元素到画布 */
function renderElements(ctx: CanvasRenderingContext2D, list: ItemType[]) {
  ctx.clearRect(0, 0, 500, 500);
  for (let item of list) {
    const { x, y, width, height } = item;
    ctx.save();

    ctx.fillStyle = item.color;

    ctx.fillRect(x!, y!, width, height);
    // 恢复上次保存的状态
    ctx.restore();
  }
}

/** 检查是否点击到元素，有就返回该元素，没有返回null */
function checkElement(
  list: ItemType[],
  position: { x: number; y: number }
): number | null {
  const { x, y } = position;
  for (let i = 0; i < list.length; i++) {
    const { x: x1, y: y1, width, height } = list[i];
    const x2 = x1! + width;
    const y2 = y1! + height;

    if (x >= x1! && x <= x2 && y >= y1! && y <= y2) {
      return i;
    }
  }

  return null;
}
