export type ChatLog = {
  type: "info" | "chat";
  currentUserId?: string;
  author?: string;
  message: string;
};

export type infoMessae = {
  type: "info";
  message: string;
};
