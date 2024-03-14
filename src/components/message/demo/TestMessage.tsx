import { useRef, useState } from "react";
import { MessageProvider, MessageRef } from "..";
import { MessageConfigProvider, useMessage } from "../MessageContext";

export default function TestMessage() {
  const messageRef = useRef<MessageRef>(null);

  const handleClick = () => {
    messageRef.current?.add({
      content: "这是一条消息",
    });
  };
  return (
    <>
      <h2>test message</h2>
      <MessageProvider ref={messageRef} />
      <button onClick={handleClick}>发信息</button>
      <MessageConfigProvider>
        <ContextMessageDemo />
      </MessageConfigProvider>
    </>
  );
}

function ContextMessageDemo() {
  const message = useMessage();
  const [count, setCount] = useState(0);

  const handleClick = () => {
    message?.add({
      content: "哈哈哈" + count,
      duration: 1000,
      position: "bottom",
    });
    setCount((c) => c + 1);
  };

  return (
    <div>
      <h3>通过context的方式共享ref实现</h3>
      <button onClick={handleClick}>发消息{count}</button>
    </div>
  );
}
