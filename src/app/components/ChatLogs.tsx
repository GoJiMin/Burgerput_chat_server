import { useEffect, useRef } from "react";
import { ChatLog } from "../model/socket";
import ChatMessage from "./ui/ChatMessage";
import InfoMessage from "./ui/InfoMessage";
import { SiBurgerking } from "react-icons/si";

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
      <article>
        <SiBurgerking className="mx-auto mt-7 md:mt-[25px] mb-[5px] text-[140px] text-slate-500" />
        <h2 className="text-2xl md:text-3xl font-bold mb-5 md:mb-[15px] text-slate-500 text-center">
          BURGERCHAT
        </h2>
      </article>
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
