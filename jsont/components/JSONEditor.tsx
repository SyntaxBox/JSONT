"use client";

import { useState, useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";

export default function JSONEditor({ data }: { data?: string }) {
  const [jsonContent, setJsonContent] = useState(data);
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <Editor
      defaultLanguage="json"
      theme="vs-dark"
      value={jsonContent}
      onChange={(value) => setJsonContent(value || "")}
      onMount={handleEditorDidMount}
      options={{
        minimap: { enabled: false },
        formatOnPaste: true,
        formatOnType: true,
      }}
    />
  );
}
