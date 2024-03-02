import React, { RefObject, useEffect, useRef } from "react";
import { useState } from "react";
import { TransformOffset } from "./Transform";
import { Color } from "./Color";

interface ColorDragProps {
  color?: Color;
  offset?: TransformOffset; // 默认偏移量
  containerRef: RefObject<Element>; // 拖动容器
  targetRef: RefObject<Element>; // 被拖动容器
  calculate?: () => TransformOffset; // 通过颜色计算偏移量
  onChangeOffset?: (offset: TransformOffset) => void;
}

type EventType = MouseEvent | React.MouseEvent;

type EventHandle = (e: EventType) => void;

export function useColorDrag(
  props: ColorDragProps
): [TransformOffset, EventHandle] {
  const { offset, containerRef, targetRef, color, calculate, onChangeOffset } = props;

  const [offsetValue, setOffsetValue] = useState<TransformOffset>(() => {
    return offset || { x: 0, y: 0 };
  });

  // 记录当前是否处于拖动状态
  const dragFlag = useRef(false)

  // 移除事件，保证只监听一次
  // useEffect(() => {
  //   document.removeEventListener("mousemove", dragMove);
  //   document.removeEventListener("mouseup", dragMoveStop);
  // }, []);

  useEffect(() => {
    if (dragFlag.current === false) {
      const newOffset = calculate?.();
      if (newOffset) {
        setOffsetValue(newOffset)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color])

  /** 监听移动事件 */
  const dragMove: EventHandle = (e) => {
    // 取消默认事件
    e.preventDefault()
    updateOffset(e);
  };

  /** 监听鼠标抬起事件 */
  const dragMoveStop: EventHandle = (e) => {
    dragFlag.current = false
    document.removeEventListener("mousemove", dragMove);
    document.removeEventListener("mouseup", dragMoveStop);
  };

  const updateOffset: EventHandle = (e) => {
    // 获取滚动的位置,上边为X轴，左边为y轴
    const scrollXOffset =
      document.documentElement.scrollLeft || document.body.scrollLeft;
    const scrollYOffset =
      document.documentElement.scrollTop || document.body.scrollTop;

    // 事件触发距离页面的位置
    const { pageX, pageY } = e;

    // 计算得出相对于视口的位置
    const currentPageX = pageX - scrollXOffset;
    const currentPageY = pageY - scrollYOffset;

    // 获取容器的尺寸信息（宽、高）和位置信息(上边、下边相对于视口的距离)
    const { x, y, width, height } =
      containerRef.current!.getBoundingClientRect();

    // 计算事件点位于容器的那个位置，最大不超过宽和高，最小不低于0
    const offsetX = Math.max(Math.min(currentPageX - x, width), 0);
    const offsetY = Math.max(Math.min(currentPageY - y, height), 0);

    // 获取被拖动元素的宽高
    const { width: targetWidth, height: targetHeight } =
      targetRef.current!.getBoundingClientRect();

    // 计算被拖动元素中心点偏移量
    const centerOffsetX = targetHeight / 2;
    const centerOffsetY = targetWidth / 2;

    // 最终偏移量
    const calcOffsetX = offsetX - centerOffsetX;
    const calcOffsetY = offsetY - centerOffsetY;

    const offset = {
      x: calcOffsetX,
      y: calcOffsetY,
    };

    setOffsetValue(offset);
    onChangeOffset?.(offset)
  };

  const onStartDrag: EventHandle = (e) => {
    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", dragMoveStop);
    updateOffset(e);
    dragFlag.current = true
  };

  return [offsetValue, onStartDrag];
}
