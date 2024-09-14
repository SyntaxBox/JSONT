"use client";
import React, { useState, useEffect } from "react";

export default function JsonModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  useEffect(() => {
    const shouldShow = localStorage.getItem("showJsonModal") !== "false";
    if (shouldShow) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (doNotShowAgain) {
      localStorage.setItem("showJsonModal", "false");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-fit">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">JSON File Handling</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="mb-4">
          <p className="mb-2">
            You can drag and drop JSON files directly to the website.
          </p>
          <p>
            Press <code>Ctrl</code> + <code>S</code> to save the translated JSON
            file.
          </p>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="doNotShowAgain"
            checked={doNotShowAgain}
            onChange={(e) => setDoNotShowAgain(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="doNotShowAgain" className="text-sm">
            Do not show again
          </label>
        </div>
        <button
          onClick={handleClose}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
