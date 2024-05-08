import { useState } from "react";
import Editor, { ChangeEvent, EditFile } from "./Editor";
import FileNameList from "./FileNameList";

const CodeEditor = () => {
  const [file] = useState<EditFile>(() => ({
    name: "index.tsx",
    language: "typescript",
    value: `import React from "react";
export default function App() {
  return <div>hello world</div>;
}
    `,
  }));

  const handleChange: ChangeEvent = (value, ev) => {
    console.log("change", value, ev);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <FileNameList />
      <Editor file={file} onChange={handleChange} />
    </div>
  );
};

export default CodeEditor;
