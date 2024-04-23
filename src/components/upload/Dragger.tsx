import { DragEvent, PropsWithChildren, useState } from "react";
import CS from "classnames";

export interface DraggerProps extends PropsWithChildren {
  onFile: (fileList: FileList) => void;
}

const Dragger = (props: DraggerProps) => {
  const { onFile, children } = props;
  const [isDrag, setIsDrag] = useState(false);

  const handleDrag = (e: DragEvent<HTMLDivElement>, state: boolean) => {
    console.log("state", state);
    e.preventDefault();
    setIsDrag(state);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    onFile(files);
    setIsDrag(false);
  };

  const className = CS(
    "w-[220px] h-[160px] bg-zinc-100 cursor-pointer text-center border-2 border-dashed",
    {
      "border-blue-400": isDrag,
      "border-zinc-300": !isDrag,
    }
  );

  return (
    <div
      className={className}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}>
      {children}
    </div>
  );
};

export default Dragger;
