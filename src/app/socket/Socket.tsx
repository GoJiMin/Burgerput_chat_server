"use client";

import { socket } from "@/socket";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ChatLog } from "../model/socket";
import ChatLogs from "../components/ChatLogs";
import { useSetUserId } from "../store/user";

export default function Socket() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [transport, setTransport] = useState("N/A");
  const [message, setMessage] = useState("");
  const [logs, setLogs] = useState<ChatLog[]>([]);

  const setUserId = useSetUserId();

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });

      socket.emit("join", "관리자");

      if (socket.id) {
        setUserId(socket.id);
      }
    };

    const onDisconnect = () => {
      setIsConnected(false);
      setTransport("N/A");
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("join", (message) => {
      setLogs((prev) => [...prev, { type: "join", message }]);
    });

    socket.on("chat", (chatData) => {
      setLogs((prev) => [...prev, { type: "chat", ...chatData }]);
    });

    if (socket.connected) onConnect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("join");
      socket.off("chat");
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("chat", {
      currentUserId: socket.id,
      author: "관리자",
      message,
    });
    setMessage("");
  };

  return (
    <section>
      <article>
        <p>Status: {isConnected ? "connected" : "disconnected"} </p>
        <p>Transport: {transport}</p>
        <form onSubmit={handleSubmit}>
          <input
            className="text-black"
            type="text"
            value={message}
            onChange={handleChange}
          />
          <button>전송</button>
        </form>
      </article>
      <ChatLogs logs={logs} />
    </section>
  );
}
