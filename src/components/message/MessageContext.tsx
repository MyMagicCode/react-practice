import {
  PropsWithChildren,
  RefObject,
  createContext,
  useContext,
  useRef,
} from "react";
import { MessageProvider, MessageRef } from ".";

interface MessageContext {
  messageRef?: RefObject<MessageRef>;
}

const messageContext = createContext<MessageContext>({});

// 通过context的方式共享MessageProvider组件
export function MessageConfigProvider(props: PropsWithChildren) {
  const messageRef = useRef<MessageRef>(null);
  return (
    <messageContext.Provider value={{ messageRef }}>
      <MessageProvider ref={messageRef} />
      {props.children}
    </messageContext.Provider>
  );
}

export const useMessage = () => {
  const { messageRef } = useContext(messageContext);
  if (!messageRef) {
    throw new Error("请在最外层添加MessageConfigProvider组件");
  }
  return messageRef.current;
};
