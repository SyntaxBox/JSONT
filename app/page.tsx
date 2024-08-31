"use client";
import JSONEditor from "@/components/JSONEditor";
import { translateJSON } from "@/lib/utils";

export default function Home() {
  const handleChange = async (e: string) => {
    console.log(e);
    // const t = await translateJSON(JSON.parse(e), "ar");
    const t = await fetch("https://google.com");
    console.log(t);
  };
  return (
    <main className="h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">JSON Editor</h1>
      <div className="flex h-full">
        <JSONEditor onChange={handleChange} />
        <JSONEditor immutable />
      </div>
    </main>
  );
}
