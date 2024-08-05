import { ChatLog } from "@/app/model/socket";
import { useUserId } from "@/app/store/user";

type Props = {
  info: ChatLog;
};

export default function ChatMessage({
  info: { author, currentUserId, message },
}: Props) {
  const userId = useUserId();

  if (userId === currentUserId) {
    return <p className="text-end">{message}</p>;
  }

  return (
    <div>
      <p>{author}</p>
      <p>{message}</p>
    </div>
  );
}
