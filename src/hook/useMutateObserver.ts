import { RefObject, useEffect } from "react";

const defaultOptions: MutationObserverInit = {
  subtree: true,
  childList: true,
  attributeFilter: ["style", "class"],
};

type TargetType = HTMLElement | RefObject<HTMLElement>;
/** 监听DOM节点和属性改变 */
export default function useMutateObserver(
  target: TargetType,
  callback: MutationCallback,
  options = defaultOptions
) {
  useEffect(() => {
    const element = getElement(target);

    if (!element) {
      return;
    }

    let instance: MutationObserver;

    if ("MutationObserver" in window) {
      instance = new MutationObserver(callback);
      instance.observe(element, options);
    }

    return () => {
      // 删除所有待办处理的通知
      instance && instance.takeRecords();
      // 阻止实例继续收到通知
      instance && instance.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, target]);
}

/** 获取元素 */
function getElement(target: TargetType) {
  if (target && "current" in target) {
    return target.current;
  }
  return target;
}
