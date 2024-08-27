"use client";

import { useState, useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor"; // Correct import for IStandaloneCodeEditor

export default function JSONEditor({
  data,
  immutable,
}: {
  data?: string;
  immutable?: boolean;
}) {
  const [jsonContent, setJsonContent] = useState(data);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleChange = (value: string | undefined) => {
    setJsonContent(value);
  };

  const format = () => {
    editorRef.current?.trigger("format", "editor.action.formatDocument", null);
  };

  return (
    <Editor
      defaultLanguage="json"
      theme="vs-dark"
      value={jsonContent}
      onChange={handleChange}
      onMount={handleEditorDidMount}
      options={{
        minimap: { enabled: false },
        formatOnPaste: true,
        formatOnType: true,
        readOnly: immutable,
        wordWrap: "on",
      }}
      language="json"
    />
  );
}
