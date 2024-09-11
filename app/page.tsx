"use client";
import JSONEditor from "@/components/JSONEditor";
import LanguagesSelector from "@/components/LanguagesSelector";
import { useState, useEffect } from "react";
import GlobalDrop from "@/components/GlobalDrop";

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

  // Function to download JSON data as a file
  const downloadJSON = (data: string, filename: string) => {
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if Ctrl + S is pressed
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault(); // Prevent the default browser save action
        downloadJSON(translatedText, "data.json"); // Save the current text as a JSON file
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [text]);

  return (
    <>
      <GlobalDrop onDrop={setText} />
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
          <JSONEditor onChange={setText} data={text} />
          <JSONEditor immutable data={translatedText} />
        </div>
      </main>
    </>
  );
}
