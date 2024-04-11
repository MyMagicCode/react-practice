import {
  FloatingArrow,
  arrow,
  flip,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import {
  CSSProperties,
  PropsWithChildren,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from "react";
import "./popover.scss";
import { createPortal } from "react-dom";

type Alignment = "start" | "end";
type Side = "left" | "top" | "bottom" | "right";
type AlignmentPlacement = `${Side}-${Alignment}`;

interface PopoverProps extends PropsWithChildren {
  content: ReactNode;
  trigger?: "click" | "hover";
  placement?: Side | AlignmentPlacement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
}

export default function Popover(props: PopoverProps) {
  const {
    open = false,
    content,
    children,
    className,
    style,
    trigger = "hover",
    placement = "bottom",
    onOpenChange,
  } = props;
  const [isOpen, setIsOpen] = useState(open);
  const arrowRef = useRef(null);

  const el = useMemo(() => {
    const el = document.createElement("div");

    document.body.appendChild(el);
    return el;
  }, []);

  // 配置floating
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      setIsOpen(open);
      onOpenChange?.(open);
    },
    placement, // 弹出方向
    middleware: [
      offset(10), // 设置间距
      arrow({
        element: arrowRef,
      }), // 设置箭头元素
      flip(), // 规避遮挡
    ],
  });

  // 定义触发方式
  const hover = useHover(context, {
    enabled: trigger === "hover",
  });
  const click = useClick(context, {
    enabled: trigger === "click",
  });

  const dismiss = useDismiss(context);

  // 使用交互方式
  const { getFloatingProps, getReferenceProps } = useInteractions([
    click,
    hover,
    dismiss,
  ]);

  const floating = isOpen && (
    <div
      className="popover-floating"
      ref={refs.setFloating}
      style={floatingStyles}
      {...getFloatingProps()}>
      <FloatingArrow
        fill="#fff"
        stroke="#cfcfcf"
        strokeWidth={1}
        ref={arrowRef}
        context={context}
      />
      {content}
    </div>
  );

  return (
    <>
      <span
        ref={refs.setReference}
        {...getReferenceProps()}
        className={className}
        style={style}>
        {children}
      </span>
      {createPortal(floating, el)}
    </>
  );
}
