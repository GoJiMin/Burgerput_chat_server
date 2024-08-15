"use client";

import { getProviders, signIn } from "next-auth/react";

export default function SignPage() {
  return (
    <section>
      <button onClick={() => signIn()}>로그인</button>
    </section>
  );
}
