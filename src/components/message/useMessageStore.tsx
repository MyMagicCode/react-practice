import { useState } from "react";
import { MessageProps, Position } from ".";

type MessageList = {
  top: MessageProps[];
  bottom: MessageProps[];
};

const initialState: MessageList = {
  top: [],
  bottom: [],
};
export default function useMessageStore(defaultPosition: Position) {
  const [messageList, setMessageList] = useState({ ...initialState });

  return {
    messageList,
    add(message: MessageProps) {
      // 获取id
      const messageId = getId(message);
      setMessageList((ml) => {
        // 添加相同id无效
        if (message.id) {
          const position = getMessagePosition(ml, message.id);
          if (position) {
            return ml;
          }
        }

        // 获取位置
        const position = message.position || defaultPosition;
        const isTop = position === "top";

        // bottom显示就往后添加，top显示往列表前添加
        const messages = isTop
          ? [{ ...message, id: messageId }, ...ml[position]]
          : [...ml[position], { ...message, id: messageId }];

        return {
          ...ml,
          [position]: messages,
        };
      });
      return messageId;
    },
    update(id: number, message: MessageProps) {
      if (!id) return;

      setMessageList((ml) => {
        const nextMessageList = { ...ml };
        const { position, index } = findMessage(ml, id);

        if (position && index !== -1) {
          nextMessageList[position][index] = {
            ...ml[position][index],
            ...message,
          };
        }

        return nextMessageList;
      });
    },
    remove(id: number) {
      setMessageList((ml) => {
        const position = getMessagePosition(ml, id);
        if (!position) return ml;
        return {
          ...ml,
          [position]: ml[position].filter((item) => item.id !== id),
        };
      });
    },
    clearAll() {
      setMessageList({ ...initialState });
    },
  };
}

let count = 1;
function getId(message: MessageProps) {
  if (message?.id) {
    return message.id;
  }
  return count++;
}

function getMessagePosition(messageList: MessageList, id: number) {
  for (const [position, list] of Object.entries(messageList)) {
    if (list.some((item) => item.id === id)) {
      return position as Position;
    }
  }
}

function findMessage(messageList: MessageList, id: number) {
  const position = getMessagePosition(messageList, id);

  const index = position
    ? messageList[position].findIndex((item) => item.id === id)
    : -1;

  return {
    position,
    index,
  };
}
