import { useRef } from "react";
import Tour from "./Tour";

export default function TestTour() {
  const oneRef = useRef<HTMLHeadingElement>(null);
  const twoRef = useRef<HTMLHeadingElement>(null);
  const threeRef = useRef<HTMLHeadingElement>(null);
  const fourRef = useRef<HTMLHeadingElement>(null);
  return (
    <>
      <Tour
        open={true}
        steps={[
          {
            selector() {
              return oneRef.current;
            },
            renderContent: () => "第一步。。。。",
          },
          {
            selector() {
              return twoRef.current;
            },
            renderContent: () => "第二步。。。。",
          },
          {
            selector() {
              return threeRef.current;
            },
            renderContent: () => "第三步。。。。",
          },
          {
            selector() {
              return fourRef.current;
            },
            renderContent: () => "最后一步。。。。，你知道了吗？",
          },
        ]}
      />
      <div style={{ height: 50 }}></div>
      <h1 style={{ width: 200, margin: "0 auto" }} ref={oneRef}>
        第一步
      </h1>
      <div style={{ height: 300 }}></div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}>
        <span ref={twoRef}>第二步</span>
        <span ref={threeRef}>第三步</span>
      </div>
      <div style={{ height: 600 }}></div>
      <h2 style={{ textAlign: "center" }} ref={fourRef}>
        第四步
      </h2>
      <div style={{ height: 600 }}></div>
    </>
  );
}
