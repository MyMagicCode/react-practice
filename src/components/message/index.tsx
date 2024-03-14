import React, { CSSProperties, forwardRef, useMemo } from "react";
import useMessageStore from "./useMessageStore";
import "./message.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { createPortal } from "react-dom";
import { useTimer } from "./useTimer";

export type Position = "top" | "bottom";

export interface MessageProps {
  style?: CSSProperties;
  className?: string;
  content: React.ReactNode;
  duration?: number;
  id?: number;
  position?: Position;
}

export interface MessageRef {
  add: (props: MessageProps) => void;
  update: (id: number, message: MessageProps) => void;
  remove: (id: number) => void;
  clearAll: () => void;
}

export const MessageProvider = forwardRef<MessageRef, {}>((props, ref) => {
  const { messageList, add, remove, update, clearAll } = useMessageStore("top");

  // 如果使用context包裹的话useImperativeHandle执行时机不对，不能使用
  if (ref && "current" in ref) {
    ref.current = {
      add,
      remove,
      update,
      clearAll,
    };
  }

  const directions = Object.keys(messageList) as Position[];

  const messageWrapper = (
    <div className="message-wrapper">
      {directions.map((direction) => {
        return (
          <TransitionGroup
            className={`message-wrapper-${direction}`}
            key={direction}>
            {messageList[direction].map((item) => {
              return (
                <CSSTransition timeout={500} key={item.id} classNames="message">
                  <MessageItem key={item.id} onClose={remove} {...item} />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        );
      })}
    </div>
  );

  const el = useMemo(() => {
    const div = document.createElement("div");
    div.className = "wrapper";
    console.log("useMemo");
    document.body.appendChild(div);
    return div;
  }, []);

  return createPortal(messageWrapper, el);
});

interface MessageItemProps extends MessageProps {
  onClose?: (id: number) => void;
}

const MessageItem = (item: MessageItemProps) => {
  const { id, content, duration, onClose } = item;
  const { onMouseEnter, onMouseLeave } = useTimer({
    id: id!,
    duration,
    remove: onClose!,
  });
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      key={`message-card-${id}`}
      className="message-card">
      {content}
    </div>
  );
};
