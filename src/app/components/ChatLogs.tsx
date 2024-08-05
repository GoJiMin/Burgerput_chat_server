import { ChatLog } from "../model/socket";
import ChatMessage from "./ui/ChatMessage";
import JoinMessage from "./ui/JoinMessage";

type Props = {
  logs: ChatLog[];
};

export default function ChatLogs({ logs }: Props) {
  return (
    <article>
      <ul>
        {logs?.map((log, idx) => (
          <li key={idx}>
            {log.type === "join" ? (
              <JoinMessage message={log.message} />
            ) : (
              <ChatMessage info={log} />
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}
