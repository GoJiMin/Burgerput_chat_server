import "./globals.css";
import localFont from "next/font/local";
import AuthContextProvider from "./context/AuthContextProvider";

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
      <body className="w-full h-full flex justify-center items-center bg-slate-600">
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
