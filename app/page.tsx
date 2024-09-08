"use client";
import JSONEditor from "@/components/JSONEditor";
import { debounce } from "lodash";
import { useCallback } from "react";

export default function Home() {
  const handleChange = async (e: string) => {
    const res = await fetch("/api/translate", {
      body: JSON.stringify({
        json: e,
        language: "ar",
      }),
      method: "POST",
    });
    console.log(await res.json());
  };

  // Use useCallback to memoize the debounced version of handleChange
  const debouncedHandleChange = useCallback(
    debounce(handleChange, 500), // 500ms delay
    [],
  );

  return (
    <main className="h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">JSON Editor</h1>
      <div className="flex h-full">
        <JSONEditor onChange={debouncedHandleChange} />
        <JSONEditor immutable />
      </div>
    </main>
  );
}
