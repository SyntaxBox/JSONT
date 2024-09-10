"use client";

import { useState, useRef, useEffect } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor"; // Correct import for IStandaloneCodeEditor

export default function JSONEditor({
  data,
  immutable,
  onChange,
}: {
  data?: string;
  immutable?: boolean;
  onChange?: (data: string) => void;
}) {
  const [jsonContent, setJsonContent] = useState(data);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleChange = (value: string | undefined) => {
    setJsonContent(value);
    value && onChange && onChange(value);
  };

  useEffect(() => {
    setJsonContent(data);
    const t = setTimeout(
      () =>
        editorRef.current?.trigger(
          "format",
          "editor.action.formatDocument",
          null,
        ),
      200,
    );

    return () => clearTimeout(t);
  }, [data]);

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
        wordWrap: "on",
      }}
      language="json"
    />
  );
}
