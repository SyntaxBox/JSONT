"use client";
import JSONEditor from "@/components/JSONEditor";
import LanguagesSelector from "@/components/LanguagesSelector";
import { useState } from "react";

export default function Home() {
  const [translatedText, setTranslatedText] = useState("");
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("auto");
  const handleSubmit = async () => {
    if (language === "auto") return text;
    const res = await fetch("/api/translate", {
      body: JSON.stringify({
        json: text,
        language: language,
      }),
      method: "POST",
    });
    setTranslatedText(await res.text());
  };

  return (
    <main className="h-full flex flex-col w-full">
      <div className="flex gap-3 justify-between items-center w-full p-2">
        <h1 className="text-2xl font-bold">JSON Editor</h1>
        <button
          type="button"
          className="inline-flex justify-center px-10 rounded-md border border-gray-300 shadow-sm py-2 bg-white text-sm font-medium text-gray-700 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 uppercase"
          onClick={handleSubmit}
        >
          Translate
        </button>
        <LanguagesSelector onSelect={(lang) => setLanguage(lang)} />
      </div>
      <div className="flex h-full">
        <JSONEditor onChange={setText} />
        <JSONEditor immutable data={translatedText} />
      </div>
    </main>
  );
}
