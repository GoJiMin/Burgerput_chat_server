import Socket from "./socket/Socket";

export default function Home() {
  return (
    <main className="w-full h-full md:max-w-[550px] md:max-h-[800px] rounded-md bg-slate-100">
      <Socket />
    </main>
  );
}
