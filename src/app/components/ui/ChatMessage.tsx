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
    return (
      <div className="flex justify-end">
        <p className="py-[6px] pl-[10px] pr-[8px] rounded-md bg-slate-500 max-w-[300px]">
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-500 w-fit py-[6px] pl-[8px] pr-[10px] rounded-md max-w-[300px]">
      <p className="text-[12px] mb-[4px]">{author}</p>
      <p>{message}</p>
    </div>
  );
}
