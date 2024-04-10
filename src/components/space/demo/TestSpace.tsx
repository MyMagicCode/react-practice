import Space from "..";
import { ConfigProvider } from "../ConfigContext";
import "./test-style.scss";

export default function TestSpace() {
  return (
    <>
      <h2>基本使用方式</h2>
      <Space>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </Space>
      <Space direction="vertical" size={50}>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </Space>
      <Space
        split={<div className="box" style={{ backgroundColor: "red" }}></div>}>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </Space>
      <h2>ConfigProvider使用方式</h2>
      <ConfigProvider value={{ space: { size: 100 } }}>
        <Space direction="horizontal">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </Space>
      </ConfigProvider>
    </>
  );
}
