import { PropsWithChildren, ReactNode, createContext, useContext } from "react";
import { matchPath, useLocation, useOutlet } from "react-router-dom";

interface KeepAliveLayoutProps extends PropsWithChildren {
  paths: Array<string | RegExp>;
  keepElements?: Record<string, ReactNode>;
  dropByPath?: (path: string) => void;
}

type KeepAliveContextType = Required<Omit<KeepAliveLayoutProps, "children">>;

const keepElements: KeepAliveContextType["keepElements"] = {};

const keepAliveContext = createContext<KeepAliveContextType>({
  paths: [],
  keepElements,
  dropByPath(path) {
    keepElements[path] = null;
  },
});

export function KeepAliveLayout(props: KeepAliveLayoutProps) {
  const { paths, children } = props;
  const { keepElements, dropByPath } = useContext(keepAliveContext);

  return (
    <keepAliveContext.Provider value={{ paths, keepElements, dropByPath }}>
      {children}
    </keepAliveContext.Provider>
  );
}

export function useKeepOutlet() {
  const { paths, keepElements } = useContext(keepAliveContext);
  const { pathname } = useLocation();
  const element = useOutlet();
  const isKeep = isKeepPath(paths, pathname);

  /**
   * 依赖react组件树的相同位置的相同组件会使得 state 被保留下来，从而达到keep alive功能
   * 也可以使用key的方式可以保证组件在不同位置的时候，state不会被销毁，从而达到keep alive功能
   * https://zh-hans.react.dev/learn/preserving-and-resetting-state#same-component-at-the-same-position-preserves-state
   */
  if (isKeep) {
    keepElements[pathname] = element;
  }

  // 将组件保存在全局中的方式，通过控制是否显示的方式缓存数据
  // if(isKeep && !keepElements[pathname]){
  //   keepElements[pathname] = element;
  // }
  return (
    <>
      {Object.entries(keepElements).map(([pn, el]) => {
        return (
          <div
            key={pn}
            hidden={!matchPath(pathname, pn)}
            className="keep-alive-page">
            {el}
          </div>
        );
      })}
      {isKeep || element}
    </>
  );
}

export function KeepOutlet() {
  const element = useKeepOutlet();
  return element;
}

function isKeepPath(
  paths: KeepAliveLayoutProps["paths"],
  path: string
): boolean {
  return paths.some((item) => {
    // 类型字符串处理方式
    if (typeof item === "string") {
      return item === path || item.toLocaleLowerCase() === path;
    }
    // 类型为RegExp处理方式
    if (item instanceof RegExp) {
      return item.test(path);
    }
    // 其他类型
    return false;
  });
}
