import { ChatLog } from "@/app/model/socket";

type Props = {
  info: ChatLog;
};

export default function ChatMessage({
  info: { author, currentUserId, message },
}: Props) {
  return <div>{message}</div>;
}
