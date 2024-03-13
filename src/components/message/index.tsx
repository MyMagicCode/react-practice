import React, { CSSProperties, FC, useEffect, useMemo } from "react";
import useMessageStore from "./useMessageStore";
import "./message.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { createPortal } from "react-dom";

export type Position = "top" | "bottom";

export interface MessageProps {
  style?: CSSProperties;
  className?: string;
  content: React.ReactNode;
  duration?: number;
  id?: number;
  position?: Position;
}

export const MessageProvider: FC<{}> = (props) => {
  const { messageList, add } = useMessageStore("top");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      add({
        content: "123",
      });
      i = i + 1;
      if (i > 5) clearInterval(timer);
      console.log("i", i);
    }, 2000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  <div key={`message-card-${item.id}`} className="message-card">
                    {item.content}
                  </div>
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
};
