import { CSSProperties, ReactNode, useEffect, useState } from "react";
import "./tour.scss";
import { createPortal } from "react-dom";

export interface TourStep {
  selector: () => HTMLElement | null;
  renderContent: (currentStep: number) => ReactNode;
}

export interface TourProps {
  steps: TourStep[];
  getContainer?: () => HTMLElement;
  open?: boolean;
}

export default function Tour(props: TourProps) {
  const { steps, open = true } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const [style, setStyle] = useState<CSSProperties>({});
  const [done, setDone] = useState(false);
  const { renderContent } = steps[currentStep];
  // 是否正在动画中
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    const el = steps[currentStep].selector();
    if (!el) {
      return;
    }

    el.scrollIntoView({
      block: "center",
      inline: "center",
    });

    const observer = new ResizeObserver(() => {
      const style = getMaskStyle(el, document.documentElement);
      setStyle(style);
    });
    observer.observe(document.documentElement);

    setAnimation(true);
    const timer = setTimeout(() => {
      setAnimation(false);
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [currentStep, steps]);

  /** 上一步 */
  const back = () => {
    setCurrentStep((cs) => cs - 1);
  };

  /** 下一步 */
  const forward = () => {
    if (currentStep === steps.length - 1) {
      setDone(true);
      return;
    }
    setCurrentStep((cs) => cs + 1);
  };

  // 是否完成和是否开始
  if (done || !open) return null;

  const mask = (
    <div className="tour-mask" style={style}>
      {animation || (
        <div className="tour-mask-content">
          {renderContent(currentStep)}

          <div>
            {currentStep !== 0 && <button onClick={back}>上一步</button>}
            <button onClick={forward}>
              {currentStep === steps.length - 1 ? "我知道了" : "下一步"}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return createPortal(mask, document.body);
}

/**
 * 获取蒙版样式
 * @param element 目标元素
 * @param container 容器
 * @returns 样式
 */
function getMaskStyle(
  element: HTMLElement,
  container: HTMLElement
): CSSProperties {
  // 获取目标元素信息
  const { left, top, height, width } = element.getBoundingClientRect();

  // 计算元素上、下、左、右变距离容器各边的距离
  const elementTopWidthScroll = container.scrollTop + top;
  const elementLeftWidthScroll = container.scrollLeft + left;
  const elementBottomWidthScroll =
    container.scrollHeight - height - elementTopWidthScroll;
  const elementRightWidthScroll =
    container.scrollWidth - width - elementLeftWidthScroll;

  return {
    width: container.scrollWidth,
    height: container.scrollHeight,
    borderTopWidth: Math.max(elementTopWidthScroll, 0),
    borderLeftWidth: Math.max(elementLeftWidthScroll, 0),
    borderRightWidth: Math.max(elementRightWidthScroll, 0),
    borderBottomWidth: Math.max(elementBottomWidthScroll, 0),
  };
}
