import { RouteObject } from "react-router-dom";

/** 菜单配置 */
export const pages = [
  {
    path: "/zustand",
    label: "zustand的使用",
    describe:
      "演示zustand的基本使用，还有如何监听state的变化，并且实现了一个zustand。",
    component: () => import("../components/zustand-examples/demo/ZustandDemo"),
  },
  {
    path: "/space",
    label: "space组件",
    describe:
      "实现一个space组件，可以设置间距和排列方式，支持provider数据配置等功能。",
    component: () => import("../components/space/demo/TestSpace"),
  },
  {
    path: "/calendar",
    label: "calendar组件",
    describe: "实现一个日历组件，可以选择日期，切换月份等功能。",
    component: () => import("../components/calendar/demo/Test"),
  },
  {
    path: "/react-spring",
    label: "react-spring的使用",
    describe: "演示react-spring库的基本使用，实现各种动画效果。",
    component: () => import("../components/spring-examples/demo/TestSpring"),
  },
  {
    path: "/message",
    label: "message组件",
    describe: "实现一个消息提示组件，可以在不同方向弹出消息。",
    component: () => import("../components/message/demo/TestMessage"),
  },
  {
    path: "/transition-group",
    label: "transition-group的使用",
    describe: "使用react-transition-group库实现过渡效果。",
    component: () =>
      import(
        "../components/transition-group-examples/demo/TestTransitionGroup"
      ),
  },
  {
    path: "/icon",
    label: "icon组件",
    describe: "实现一个icon组件，能够加载自定义图标和远程图标。",
    component: () => import("../components/Icon/demo/TestIcon"),
  },
  {
    path: "/canvas",
    label: "canvas的使用",
    describe: "使用canvas绘制图形，演示基本api的使用和实现动画效果。",
    component: () => import("../components/canvas-examples/demo/CanvasDemo"),
  },
  {
    path: "/react-dnd",
    label: "react-dnd的使用",
    describe: "基本api演练,使用react-dnd库实现拖拽功能。",
    component: () => import("../components/react-dnd-examples/demo/DndDemo"),
  },
  {
    path: "/color-picker",
    label: "color-picker组件",
    describe: "实现一个颜色选择器组件，可以选择颜色。",
    component: () => import("../components/color-picker/demo/Test"),
  },
  {
    path: "/keep-alive",
    label: "keep-alive组件",
    describe: "基于react-router实现一个keep-alive组件，可以缓存组件状态。",
    component: () => import("../components/keep-alive/demo/TestKeepAlive"),
  },
  {
    path: "/popover",
    label: "popover组件",
    describe: "基于floating-ui实现一个popover组件，弹出气泡式的卡片浮层。",
    component: () => import("../components/popover/demo/TestPopover"),
  },
  {
    path: "/tour",
    label: "tour组件",
    describe:
      "基于popover和浏览器的scrollIntoView方法实现一个Tour组件，用于分步引导用户了解产品功能的气泡组件。",
    component: () => import("../components/tour/demo/TestTour"),
  },
  {
    path: "/form",
    label: "form组件",
    describe:
      "基于react内部hook和async-validator ，实现一个类似于ant-design的form组件，支持字段校验功能。",
    component: () => import("../components/form/demo/TestForm"),
  },
  {
    path: "/upload",
    label: "upload组件",
    describe:
      "使用axios库作为上传库，实现一个upload上传组件，支持拖动上传和上传进度显示。",
    component: () => import("../components/upload/demo/TestUpload"),
  },
  {
    path: "/todo-list",
    label: "TodoList",
    describe:
      "基于react-dnd、tailwindCss、Zustand、react-spring实现一个待办列表，可以拖动添加和删除，双击编辑功能。",
    component: () => import("../components/todo-list"),
  },
  {
    path: "/test-demo",
    label: "测试封装的hook和组件",
    describe: "用于测试封装的hook和组件的页面",
    component: () => import("../pages/TestDemo"),
  },
];

// 生成路由
export const routers: RouteObject[] = pages.map((page) => {
  return {
    path: page.path,
    // 懒加载组件
    async lazy() {
      const { default: Component } = await page.component();
      return {
        Component,
      };
    },
  };
});

// 生成菜单
type MenuItem = {
  path: string;
  label: string;
  describe: string;
};
export const menuList: MenuItem[] = pages.map((page) => ({
  path: page.path,
  label: page.label,
  describe: page.describe,
}));
