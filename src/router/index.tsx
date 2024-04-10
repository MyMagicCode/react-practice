import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { lazy } from "react";

const ZustandDemo = lazy(
  () => import("../components/zustand-examples/demo/ZustandDemo")
); // zustand状态管理的使用
const TestSpace = lazy(() => import("../components/space/demo/TestSpace")); // space组件的使用
const CalendarDemo = lazy(() => import("../components/calendar/demo/Test")); // 日历组件
const TestSpring = lazy(
  () => import("../components/spring-examples/demo/TestSpring")
); // react-spring的使用
const TestMessage = lazy(
  () => import("../components/message/demo/TestMessage")
); // message组件
const TestTransitionGroup = lazy(
  () =>
    import("../components/transition-group-examples/demo/TestTransitionGroup")
); // react-transition-group的使用
const TestIcon = lazy(() => import("../components/Icon/demo/TestIcon")); // icon组件
const CanvasDemo = lazy(
  () => import("../components/canvas-examples/demo/CanvasDemo")
); // canvas的使用
const DndDemo = lazy(
  () => import("../components/react-dnd-examples/demo/DndDemo")
); // react-dnd的使用
const TestColorPicker = lazy(
  () => import("../components/color-picker/demo/Test")
); // 颜色选择器组件

// import CalendarDemo from "./components/calendar/demo/Test";// 日历组件
// import TestColorPicker from "./components/color-picker/demo/Test"; // 颜色选择器组件
// import TestIcon from "./components/Icon/demo/TestIcon";// icon组件
// import { ZustandDemo } from "./components/zustand-examples/demo/ZustandDemo";
// import { TestSpace } from "./components/space/demo/TestSpace";// space组件
// import TestSpring from "./components/spring-examples/demo/TestSpring"; // react-spring的使用
// import TestTransitionGroup from "./components/transition-group-examples/demo/TestTransitionGroup";// react-transition-group的使用
// import TestMessage from "./components/message/demo/TestMessage"; // message组件
// import DndDemo from "./components/react-dnd-examples/demo/DndDemo"; // react-dnd的使用
// import CanvasDemo from "./components/canvas-examples/demo/CanvasDemo"; // canvas的使用

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "zustand",
    element: <ZustandDemo />,
  },
  {
    path: "space",
    element: <TestSpace />,
  },
  {
    path: "calendar",
    element: <CalendarDemo />,
  },
  {
    path: "react-spring",
    element: <TestSpring />,
  },
  {
    path: "message",
    element: <TestMessage />,
  },
  {
    path: "transition-group",
    element: <TestTransitionGroup />,
  },
  {
    path: "icon",
    element: <TestIcon />,
  },
  {
    path: "canvas",
    element: <CanvasDemo />,
  },
  {
    path: "react-dnd",
    element: <DndDemo />,
  },
  {
    path: "color-picker",
    element: <TestColorPicker />,
  },
]);
