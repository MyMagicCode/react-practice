/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef } from "react";

export function AnimationExample() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = ref.current?.getContext("2d")!;
    // 保存状态
    ctx.save();
    // 移动
    // translate(ctx);
    // rotate(ctx);
    // scale(ctx);
    // animation(0, ctx);
    flyAnimation(0, ctx);
    return () => {
      // 恢复上次保存的状态
      ctx.restore();
      ctx.clearRect(0, 0, 500, 500);
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

/** 偏移 */
function translate(ctx: CanvasRenderingContext2D) {
  // 移动坐标轴原点(0,0)
  ctx.translate(150, 150);
  ctx.fillRect(0, 0, 100, 100);
}

/** 旋转 */
function rotate(ctx: CanvasRenderingContext2D) {
  for (let i = 0; i < 9; i++) {
    ctx.fillStyle = `#${i}${i}${i}`;
    // 旋转弧度设置，角度和弧度公式为1° = Math.PI / 180;
    // 旋转的是canvas的坐标轴，顺时针旋转，默认原点(0,0)点在左上角
    ctx.rotate(i * 2 * (Math.PI / 180));
    ctx.fillRect(100, 0, 200, 100);
  }
}

/** 缩放 */
function scale(ctx: CanvasRenderingContext2D) {
  for (let i = 0; i < 9; i++) {
    ctx.fillStyle = `#${i}${i}${i}`;
    // 缩放，大于1为放大，小于1为缩小
    ctx.beginPath();
    ctx.scale(2 / i, 2 / i);

    ctx.arc(250, 250, 50, 0, 360 * (Math.PI / 180));
    ctx.fill();

    ctx.closePath();
  }
}

/** 简单动画 */
function animation(width: number, ctx: CanvasRenderingContext2D) {
  if (width > 400) {
    return;
  }
  ctx.clearRect(0, 0, 500, 500);
  ctx.fillRect(0, 0, width, 100);

  requestAnimationFrame(() => animation(width + 2, ctx));
}

/** 飞行动画 */
function flyAnimation(num: number, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, 500, 500);
  ctx.save();

  // 将原点移到画布中心
  ctx.translate(250, 250);

  // 旋转坐标轴
  ctx.rotate(num);

  // 添加飞行器
  ctx.fillStyle = "lightpink";
  ctx.fillRect(175, 0, 50, 30);

  // 恢复状态
  ctx.restore();

  // 画出飞行轨迹
  ctx.beginPath(); // 开始路径
  ctx.arc(250, 250, 200, 0, (360 * Math.PI) / 180);
  ctx.stroke();
  ctx.closePath(); // 关闭路径

  requestAnimationFrame(() => flyAnimation(num + 0.01, ctx));
}
