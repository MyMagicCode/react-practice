import { useNavigate } from "react-router-dom";
import "./home.scss";
import { CSSProperties, useEffect, useRef } from "react";

export function Home() {
  const navigate = useNavigate();
  const cardSet = useRef(new Set<HTMLElement>());

  const handleClick = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    const calcCardsPosition = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cardSet.current.forEach((card) => {
        const { left, top } = card.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;
        card.style.setProperty("--x", x + "px");
        card.style.setProperty("--y", y + "px");
      });
    };
    document.addEventListener("mousemove", calcCardsPosition);
    return () => document.removeEventListener("mousemove", calcCardsPosition);
  }, []);

  return (
    <div className="home">
      <div
        className="home-container"
        style={
          {
            "--bg-color": "rgb(249, 115, 22)",
          } as CSSProperties
        }>
        <p className="title">React进阶练习</p>
        <div className="list">
          {list.map((item) => (
            <div
              ref={(el) => {
                el && cardSet.current.add(el);
              }}
              key={item.path}
              onClick={() => handleClick(item.path)}
              className="list_card">
              <div className="view custom-scrollbar">
                <h5 className="label">{item.label}</h5>
                <p className="describe">{item.describe}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const list = [
  {
    path: "/zustand",
    label: "zustand的使用",
    describe:
      "演示zustand的基本使用，还有如何监听state的变化，并且实现了一个zustand。",
  },
  {
    path: "/space",
    label: "space组件",
    describe:
      "实现一个space组件，可以设置间距和排列方式，支持provider数据配置等功能。",
  },
  {
    path: "/calendar",
    label: "calendar组件",
    describe: "实现一个日历组件，可以选择日期，切换月份等功能。",
  },
  {
    path: "/react-spring",
    label: "react-spring的使用",
    describe: "演示react-spring库的基本使用，实现各种动画效果。",
  },
  {
    path: "/message",
    label: "message组件",
    describe: "实现一个消息提示组件，可以在不同方向弹出消息。",
  },
  {
    path: "/transition-group",
    label: "transition-group的使用",
    describe: "使用react-transition-group库实现过渡效果。",
  },
  {
    path: "/icon",
    label: "icon组件",
    describe: "实现一个icon组件，能够加载自定义图标和远程图标。",
  },
  {
    path: "/canvas",
    label: "canvas的使用",
    describe: "使用canvas绘制图形，演示基本api的使用和实现动画效果。",
  },
  {
    path: "/react-dnd",
    label: "react-dnd的使用",
    describe: "基本api演练,使用react-dnd库实现拖拽功能。",
  },
  {
    path: "/color-picker",
    label: "color-picker组件",
    describe: "实现一个颜色选择器组件，可以选择颜色。",
  },
  {
    path: "/keep-alive",
    label: "keep-alive组件",
    describe: "基于react-router实现一个keep-alive组件，可以缓存组件状态。",
  },
  {
    path: "/popover",
    label: "popover组件",
    describe: "基于floating-ui实现一个popover组件，弹出气泡式的卡片浮层。",
  },
  {
    path: "/tour",
    label: "tour组件",
    describe:
      "基于popover和浏览器的scrollIntoView方法实现一个Tour组件，用于分步引导用户了解产品功能的气泡组件。",
  },
];
