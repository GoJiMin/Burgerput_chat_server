import { ChatLog } from "../model/socket";
import ChatMessage from "./ui/ChatMessage";
import InfoMessage from "./ui/InfoMessage";

type Props = {
  logs: ChatLog[];
};

export default function ChatLogs({ logs }: Props) {
  return (
    <article>
      <ul>
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
    </article>
  );
}
