import { useEffect, useRef } from "react";
import { ChatLog } from "../model/socket";
import ChatMessage from "./ui/ChatMessage";
import InfoMessage from "./ui/InfoMessage";

type Props = {
  logs: ChatLog[];
};

export default function ChatLogs({ logs }: Props) {
  const scrollRef = useRef<HTMLUListElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current === null) {
      return;
    }

    const scrollHeight = scrollRef?.current.scrollHeight;
    scrollRef.current?.scrollTo({ top: scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    if (scrollRef.current) {
      const hasOverflow =
        scrollRef.current.scrollHeight > scrollRef.current.clientHeight;

      if (hasOverflow) {
        scrollToBottom();
      } else {
        scrollRef.current.scrollTo({ top: 0 });
      }
    }
  }, [logs]);

  return (
    <ul
      ref={scrollRef}
      className="flex-1 flex flex-col gap-[12px] p-[10px] overflow-auto text-white"
    >
      {logs?.map((log, idx) => (
        <li key={idx}>
          {log.type === "info" ? (
            <InfoMessage message={log.message} />
          ) : (
            <ChatMessage info={log} />
          )}
        </li>
      ))}
    </ul>
  );
}
