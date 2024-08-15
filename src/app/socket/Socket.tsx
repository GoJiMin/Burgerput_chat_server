"use client";

import { socket } from "@/socket";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ChatLog } from "../model/socket";
import ChatLogs from "../components/ChatLogs";
import { useSetUserId } from "../store/user";
import { signIn, signOut, useSession } from "next-auth/react";

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

      socket.emit("joinAndLeave", { type: "join", userName: "관리자" });

      if (socket.id) {
        setUserId(socket.id);
      }
    };

    const onDisconnect = () => {
      setIsConnected(false);
      setTransport("N/A");
    };

    const handleBeforeUnload = () => {
      socket.emit("joinAndLeave", { type: "leave", userName: "관리자" });
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("joinAndLeave", (data) => {
      setLogs((prev) => [...prev, { type: data.type, message: data.message }]);
    });

    socket.on("chat", (chatData) => {
      setLogs((prev) => [...prev, { type: "chat", ...chatData }]);
    });

    if (socket.connected) onConnect();

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("joinAndLeave");
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

  const { data: session } = useSession();

  return (
    <section>
      {session ? (
        <button onClick={() => signOut()}>로그아웃</button>
      ) : (
        <button onClick={() => signIn()}>로그인</button>
      )}

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
