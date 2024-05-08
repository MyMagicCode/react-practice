import MonacoEditor, { EditorProps, OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { createATA } from "./ata";

export type ChangeEvent = EditorProps["onChange"];

export interface EditFile {
  name: string;
  value: string;
  language: string;
}

interface IEditorProps {
  file: EditFile;
  onChange?: ChangeEvent;
  options?: editor.IStandaloneEditorConstructionOptions;
}

const Editor = (props: IEditorProps) => {
  const { onChange, file, options } = props;

  const handleOnMount: OnMount = (editor, monaco) => {
    // 配置快捷键
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
      console.log("ctrl+j");
    });

    // 设置编辑器TypeScript配置
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    });

    // 自动类型获取
    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      );
    });

    // 监听代码变化
    editor.onDidChangeModelContent(() => {
      ata(editor.getValue());
    });

    // 默认执行一次
    ata(editor.getValue());
  };

  return (
    <MonacoEditor
      height="100%"
      path={file.name}
      language={file.language}
      onMount={handleOnMount}
      value={file.value}
      onChange={onChange}
      options={{
        fontSize: 14,
        // 滚动是否超出最后一行
        scrollBeyondLastLine: false,
        // 关闭代码缩略图/小地图
        minimap: {
          enabled: false,
        },
        // 设置滚动条样式
        scrollbar: {
          // 垂直滚动条宽度
          verticalScrollbarSize: 6,
          // 水平滚动条高度
          horizontalScrollbarSize: 6,
        },
        ...options,
      }}></MonacoEditor>
  );
};

export default Editor;
