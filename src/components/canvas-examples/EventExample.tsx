import { useEffect, useRef } from "react";

export default function EventExample() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = ref.current!;
    // 绑定鼠标事件
    cvs.addEventListener("mousemove", onMousemove);
    /**
     * 绑定键盘事件方式一
     * 1.首先需要为<canvas>标签添加tabindex="0"属性
     * 2.获取canvas元素以后，需要调用focus()方法让canvas自动获取焦点
     * 3.需要注意，当鼠标点击别的元素的时候，canvas元素会失去焦点，从而失去键盘事件
     **/
    cvs.focus();
    cvs.addEventListener("keydown", onKeydown);

    /**
     * 绑定键盘事件方式二
     * 1.直接通过绑定window的键盘事件
     */
    window.addEventListener("keydown", onKeydown);

    return () => {
      cvs.removeEventListener("mousemove", onMousemove);
    };
  }, []);
  return (
    <>
      <canvas
        ref={ref}
        width={500}
        height={500}
        tabIndex={0}
        style={{
          borderRadius: 8,
          marginLeft: 50,
          marginTop: 50,
          border: "1px solid #ccc",
        }}></canvas>
    </>
  );
}

/** 绑定鼠标事件 */
function onMousemove(e: MouseEvent) {
  const { clientX, clientY, target } = e;
  const { left, top } = (target as HTMLCanvasElement).getBoundingClientRect();
  console.log("e", clientX - left, clientY - top);
}

/** 绑定键盘事件 */
function onKeydown(e: KeyboardEvent) {
  const keyId = e.key;
  switch (keyId) {
    case "ArrowLeft":
      console.log("左");
      break;
    case "ArrowUp":
      console.log("上");
      break;
    case "ArrowDown":
      console.log("下");
      break;
    case "ArrowRight":
      console.log("右");
      break;
    default:
      console.log(keyId);
  }
}
