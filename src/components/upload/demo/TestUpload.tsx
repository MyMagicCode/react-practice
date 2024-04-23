import React from "react";
import Upload, { UploadProps } from "../Upload";

const uploadProps: UploadProps = {
  action: "http://localhost:3030/upload",
  onChange(file, fileList) {
    console.log("change", file, fileList);
  },
  onProgress(percentage) {
    console.log("percentage", percentage);
  },
  onSuccess(data) {
    console.log("success", data);
  },
};

const TestUpload = () => {
  return (
    <>
      <h2>需要先去启动后端服务</h2>
      <Upload {...uploadProps}>
        <div className="w-[100px] cursor-pointer rounded-xl bg-gray-800 text-cyan-50 py-2 px-4 text-center">
          上传文件
        </div>
      </Upload>
      <Upload {...uploadProps} drag multiple>
        <h2>拖拽上传文件</h2>
      </Upload>
    </>
  );
};

export default TestUpload;
