import axios from "axios";
import { ChangeEvent, PropsWithChildren, useRef, useState } from "react";
import UploadFileList, { UploadFile } from "./UploadFileList";

export interface UploadProps extends PropsWithChildren {
  action: string;
  headers?: Record<string, any>;
  // 承载文件的属性名称
  name?: string;
  // 附带信息
  data?: Record<string, any>;
  // 如果 withCredentials 设置为 true，那么请求将发送包含凭据的 cookies，HTTP 认证以及客户端 SSL 证明等。
  withCredentials?: boolean;
  // 允许的文件后缀
  accept?: string;
  multiple?: boolean;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: UploadFile, fileList: UploadFile[]) => void;
  onRemove?: (file: UploadFile) => void;
}

const Upload = (props: UploadProps) => {
  const {
    action,
    accept,
    headers,
    name = "file",
    data,
    withCredentials,
    multiple,
    children,
    beforeUpload,
    onChange,
    onError,
    onProgress,
    onSuccess,
    onRemove,
  } = props;

  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  /** 更新文件列表状态 */
  const updateFile = (file: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList((fl) => {
      let currentItem: UploadFile | null = null;
      let newList = fl.map((item) => {
        if (item.uid === file.uid) {
          currentItem = { ...item, ...updateObj };
          return currentItem;
        } else {
          return item;
        }
      });
      onChange?.(file, newList);
      return newList;
    });
  };

  /** 删除文件 */
  const removeFile = (file: UploadFile) => {
    console.log("remove");
    setFileList((fl) => fl.filter((item) => item.uid !== file.uid));
    onRemove?.(file);
  };

  /** 打开资源管理器 */
  const handleClick = () => {
    if (fileInput) fileInput.current?.click();
  };

  /** 监听文件选择改变 */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadFiles(e.target.files);
    }
    // 清空input否则第二次选择一样的就不会触发onChange
    fileInput.current && (fileInput.current.value = "");
  };

  /** 上传选中的文件 */
  const uploadFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      // 执行上传前回调
      if (beforeUpload) {
        const result = beforeUpload(file);
        if (result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      } else {
        post(file);
      }
    });
  };

  /** 上传文件函数 */
  const post = (file: File) => {
    // 设置图片列表
    const uploadFile: UploadFile = {
      uid: Date.now() + "upload-file",
      name: file.name,
      status: "ready",
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList((fl) => [...fl, uploadFile]);

    const formData = new FormData();
    formData.set(name, file);

    if (data) {
      Object.keys(data).forEach((key: string) => {
        formData.set(key, data[key]);
      });
    }

    // 上传图片
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials,
        // 监听文件上传进度
        onUploadProgress(pe) {
          let percentage = Math.round((pe.loaded * 100) / pe.total!) || 0;
          if (percentage < 100 && onProgress) {
            updateFile(uploadFile, {
              percent: percentage,
              status: "uploading",
            });
            onProgress(percentage, file);
          }
        },
      })
      .then((res) => {
        updateFile(uploadFile, {
          percent: 100,
          response: res.data,
          status: "success",
        });
        onSuccess?.(res.data, file);
      })
      .catch((error) => {
        onError?.(error, file);
        updateFile(uploadFile, {
          error: error,
          status: "error",
        });
      });
  };

  return (
    <div className="upload-container">
      <div className="upload-input inline-block" onClick={handleClick}>
        {children}
        <input
          ref={fileInput}
          className="hidden"
          accept={accept}
          onChange={handleChange}
          type="file"
          multiple={multiple}></input>
      </div>
      <UploadFileList fileList={fileList} onRemove={removeFile} />
    </div>
  );
};

export default Upload;
