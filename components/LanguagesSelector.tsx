"use client";
import { languages } from "google-translate-api-x";
import React, { useState } from "react";

const LanguageSelector = ({
  onSelect,
}: {
  onSelect: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleSelectLanguage = (language: string) => {
    setSelectedLanguage(language);
    onSelect(language);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 uppercase"
          onClick={() => setIsOpen(!isOpen)}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)}
        >
          {selectedLanguage ? selectedLanguage : "Select Language"}
          <span className="ml-2 rotate-90 -mr-1 h-5 w-5" aria-hidden="true">
            &gt;
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 max-h-[calc(100vh-12rem)] overflow-y-scroll">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {Object.entries(languages).map(([value, label], i) => (
              <button
                key={i}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleSelectLanguage(value)}
              >
                {typeof label === "string" && label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
