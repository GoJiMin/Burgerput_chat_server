"use client";

import { socket } from "@/socket";
import { ChangeEvent, FormEvent, useState } from "react";
import { BsSendFill } from "react-icons/bs";

export default function InputMessage() {
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    if (message.length === 0) {
      return;
    }

    e.preventDefault();
    socket.emit("chat", {
      currentUserId: socket.id,
      author: "관리자",
      message,
    });
    setMessage("");
  };

  return (
    <form className="w-full flex items-center" onSubmit={handleSubmit}>
      <input
        className="text-black flex-1 px-[12px] py-[14px] text-[16px] border-none outline-none"
        type="text"
        value={message}
        autoFocus
        placeholder="메세지를 입력해주세요."
        onChange={handleChange}
      />
      <button className="text-[24px] p-[14px] flex items-center bg-slate-500 text-white">
        <BsSendFill />
      </button>
    </form>
  );
}
