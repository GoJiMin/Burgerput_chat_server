"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { SiBurgerking } from "react-icons/si";

const inputStyle =
  "w-full outline-none border border-gray-300 focus:border-orange-500 focus:border-1 rounded-md text-md md:text-lg p-3";

export default function SignPage() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { id, password } = formData;

    signIn("credentials", {
      id,
      password,
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  };

  return (
    <section className="h-full flex flex-col justify-center items-center">
      <SiBurgerking className="mb-[50px] text-[140px] md:text-[170px] text-orange-500" />
      <form
        className="min-w-[270px] md:min-w-[320px] flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        <input
          className={inputStyle}
          type="text"
          id="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="아이디를 입력해주세요."
          autoComplete="off"
          autoFocus
        />
        <input
          className={inputStyle}
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요."
        />
        <button className="bg-orange-500 text-white w-full mtext-lg p-2.5 rounded-md font-semibold">
          로그인
        </button>
      </form>
    </section>
  );
}
