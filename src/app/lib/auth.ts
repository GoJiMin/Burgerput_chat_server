import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: {
          label: "Id",
          type: "text",
          placeholder: "Please enter your ID..",
        },
        password: { label: "Password", type: "password" },
      },

      authorize(credentials) {
        if (!credentials) return null;

        const { id, password } = credentials;

        const idMatch = process.env.ADMIN_ID === id;
        const passwordsMatch = process.env.ADMIN_PASSWORD === password;

        if (idMatch && passwordsMatch) return { id, password };

        throw new Error("입력 정보를 다시 확인해주세요.");
      },
    }),
  ],
};
