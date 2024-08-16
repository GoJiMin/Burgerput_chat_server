"use client";

import { socket } from "@/socket";
import { useEffect, useState } from "react";
import { ChatLog, infoMessae } from "../model/socket";
import ChatLogs from "../components/ChatLogs";
import { useSetUserId } from "../store/user";
import InputMessage from "../components/InputMessage";

export default function Socket() {
  const [logs, setLogs] = useState<ChatLog[]>([]);

  const setUserId = useSetUserId();

  useEffect(() => {
    const onConnect = () => {
      socket.emit("join", "관리자");

      if (socket.id) {
        setUserId(socket.id);
      }
    };

    const handleSetInfoLogs = (data: infoMessae) => {
      setLogs((prev) => [...prev, { type: data.type, message: data.message }]);
    };

    socket.on("connect", onConnect);

    socket.on("join", (data) => handleSetInfoLogs(data));
    socket.on("leave", (data) => handleSetInfoLogs(data));

    socket.on("chat", (chatData) => {
      setLogs((prev) => [...prev, { type: "chat", ...chatData }]);
    });

    if (socket.connected) onConnect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("chat");
      socket.off("join");
      socket.off("leave");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full h-full flex flex-col">
      <ChatLogs logs={logs} />
      <InputMessage />
    </section>
  );
}
