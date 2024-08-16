import "./globals.css";
import localFont from "next/font/local";
import AuthContextProvider from "./context/AuthContextProvider";
import Head from "next/head";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
});

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
