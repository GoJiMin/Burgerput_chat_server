"use client";

import { socket } from "@/socket";
import { ChangeEvent, FormEvent, useState } from "react";

export default function InputMessage() {
  const [message, setMessage] = useState("");

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
    <form onSubmit={handleSubmit}>
      <input
        className="text-black"
        type="text"
        value={message}
        onChange={handleChange}
      />
      <button>전송</button>
    </form>
  );
}
