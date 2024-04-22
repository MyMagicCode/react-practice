import React from "react";

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: "ready" | "uploading" | "success" | "error";
  percent?: number;
  response?: any;
  error?: any;
  raw: File;
}

export interface UploadFileListProps {
  fileList: UploadFile[];
  onRemove: (file: UploadFile) => void;
}

const UploadFileList = (props: UploadFileListProps) => {
  const { fileList, onRemove } = props;
  return (
    <div>
      {fileList.map((file) => {
        const statusTagColor =
          file.status === "error"
            ? "red"
            : file.status === "uploading"
            ? "#e4e4e7"
            : "blue";
        return (
          <div className="px-[20px]" key={file.uid}>
            <div className="flex justify-between items-center">
              <div className="">
                <span
                  className="inline-block w-[10px] h-[10px] rounded-[50%]"
                  style={{
                    backgroundColor: statusTagColor,
                  }}></span>
                {file.name}
              </div>
              <div className="cursor-pointer" onClick={() => onRemove(file)}>
                X
              </div>
            </div>
            {file.status === "uploading" && (
              <div className="bg-zinc-200 h-[10px] rounded-[10px] overflow-hidden">
                <div
                  className=" bg-green-500 h-[10px] rounded-[10px] duration-300 ease-in"
                  style={{
                    transform: `translate(${-(100 - (file.percent ?? 0))}%,0%)`,
                  }}></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UploadFileList;
