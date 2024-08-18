import "./globals.css";
import localFont from "next/font/local";
import AuthContextProvider from "./context/AuthContextProvider";
import Head from "next/head";
import { Metadata } from "next";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BurgerChat",
  description: "버거풋 상담실",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pretendard.className}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <body className="w-full h-full flex justify-center items-center bg-slate-600">
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
