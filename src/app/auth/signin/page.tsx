"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, FormEvent, useRef } from "react";

export default function SignPage() {
  const formData = useRef({
    id: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    formData.current = {
      ...formData.current,
      [id]: value,
    };
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { id, password } = formData.current;

    signIn("credentials", {
      id,
      password,
      callbackUrl: "http://localhost:8080",
    });
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="id"
          value={formData.current.id}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          value={formData.current.password}
          onChange={handleChange}
        />
        <button>로그인</button>
      </form>
    </section>
  );
}
