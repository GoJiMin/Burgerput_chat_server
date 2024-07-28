"use client";

import { socket } from "@/socket";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Socket() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [transport, setTransport] = useState("N/A");
  const [message, setMessage] = useState("");
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    };

    const onDisconnect = () => {
      setIsConnected(false);
      setTransport("N/A");
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chat", (msg) => {
      setLogs((prev) => [...prev, msg]);
    });

    if (socket.connected) onConnect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chat");
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("chat", message);
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
      <article>
        <ul>
          {logs &&
            logs.map((log, idx) => (
              <li key={idx}>
                <p>{log}</p>
              </li>
            ))}
        </ul>
      </article>
    </section>
  );
}
