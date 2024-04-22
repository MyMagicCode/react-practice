import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
// 设置跨域
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync(path.join(process.cwd(), "uploads"));
    } catch (e) {
      console.log("e", e);
    }
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname;
    cb(null, uniqueSuffix);
  },
});

// 配置保存文件目录
const upload = multer({
  dest: "uploads/",
  storage,
});

app.post("/upload", upload.single("file"), (req, res, next) => {
  console.log("req.file", req.file);
  console.log("res.body", res.body);
  res.send(
    JSON.stringify({
      message: "success",
    })
  );
});

app.listen(3030, () => {
  console.log("文件服务启动成功！");
});
