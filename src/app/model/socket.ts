export type ChatLog = {
  type: "join" | "chat";
  currentUserId?: string;
  author?: string;
  message: string;
};
