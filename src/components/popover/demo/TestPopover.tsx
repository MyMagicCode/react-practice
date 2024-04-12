import Popover from "../Popover";

export default function TestPopover() {
  return (
    <div
      style={{
        width: "60%",
        margin: "100px auto 0px auto",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}>
      <h1 style={{ textAlign: "center", width: "100%" }}>popover 组件示例</h1>
      <Popover content={"bottom"} open={true}>
        <button>bottom</button>
      </Popover>
      <Popover content={"top"} placement="top">
        <button>top</button>
      </Popover>
      <Popover content={"bottom-start"} placement="bottom-start">
        <button>bottom-start</button>
      </Popover>
      <Popover content={"click left"} placement="left" trigger="click">
        <button>click left</button>
      </Popover>
      <Popover content={<button>传入组件</button>} trigger="click">
        <button>click custom</button>
      </Popover>
    </div>
  );
}
