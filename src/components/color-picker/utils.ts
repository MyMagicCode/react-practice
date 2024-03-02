import React from "react";
import { Color } from "./Color";
import { TransformOffset } from "./Transform";

type RefElementType = React.RefObject<HTMLDivElement>;
/**
 * 通过颜色计算所在容器的点位
 * @param containerRef 容器
 * @param targetRef 拖动元素
 * @param color 颜色
 */
export function calculateOffset(
  containerRef: RefElementType,
  targetRef: RefElementType,
  color: Color
): TransformOffset {
  // 获取x,y的长度 = 容器的宽高
  const { width, height } = containerRef.current!.getBoundingClientRect();

  // 获取拖动元素尺寸信息，用于计算中心点位
  const { width: targetWidth, height: targetHeight } =
    targetRef.current!.getBoundingClientRect();

  // 计算出中心点位
  const centerOffsetX = targetWidth / 2;
  const centerOffsetY = targetHeight / 2;

  // 获取颜色的HSV信息
  const hsv = color.toHsv();

  return {
    x: hsv.s * width - centerOffsetX,
    y: (1 - hsv.v) * height - centerOffsetY,
  };
}

export function calculateColor(
  offset: TransformOffset,
  containerRef: RefElementType,
  targeRef: RefElementType,
  color: Color
): Color {
  // 获取容器宽高
  const { width, height } = containerRef.current!.getBoundingClientRect();

  // 获取拖动元素宽高，计算中心位置
  const { width: targetWidth, height: targetHeight } =
    targeRef.current!.getBoundingClientRect();

  // 计算中心偏移量
  const centerOffsetX = targetWidth / 2;
  const centerOffsetY = targetHeight / 2;

  // 计算饱和度和亮度
  const saturation = (offset.x + centerOffsetX) / width;
  const lightness = 1 - (offset.y + centerOffsetY) / height;

  // 当前颜色信息
  const hsv = color.toHsv();

  return new Color({
    h: hsv.h,
    s: saturation < 0 ? 0 : saturation,
    v: lightness < 0 ? 0 : lightness,
    a: hsv.a,
  });
}
