/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useSyncExternalStore } from "react";

type API<T> = {
  setState: (partial: PartialState<T>, replace?: boolean) => void;
  getState: () => T;
  subscribe: (callback: (state?: T, prev?: T) => void) => () => void;
  destroy: () => void;
};
type CreateStateType<T> = (
  set: (partial: PartialState<T>, replace?: boolean) => void,
  get: () => T,
  store: API<T>
) => T;
type PartialState<T> = Partial<T> | ((state: T) => Partial<T>);

/**
 * 创建一个仓库
 * @param createState 初始值
 * @returns 仓库对象
 */
export function createStore<T extends unknown>(
  createState: CreateStateType<T>
) {
  let state: T;
  const listeners = new Set<(state: T, prev: T) => void>();

  /** 设置状态函数 */
  const setState = (partial: PartialState<T>, replace?: boolean) => {
    const nextPartial =
      typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextPartial, state)) {
      const previousState = state;

      if (replace) {
        state = nextPartial as any;
      } else if (typeof nextPartial === "object" && nextPartial !== null) {
        state = Object.assign({}, state, nextPartial);
      }
      listeners.forEach((listener) => listener(state, previousState));
    }
  };

  /** 获取状态函数 */
  const getState = () => state;

  /** 监听函数 */
  const subscribe = (callback: (state?: T, prev?: T) => void) => {
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
    };
  };

  /** 清空监听器 */
  const destroy = () => {
    listeners.clear();
  };

  const api = { setState, getState, subscribe, destroy };

  // 初始化状态值
  state = createState(setState, getState, api);

  return api;
}

export function create<T extends unknown>(initializer: CreateStateType<T>) {
  // 创建状态
  const api = createStore(initializer);
  const useBoundState = (selector: (state: T) => any) =>
    useStore(api, selector);

  Object.assign(useBoundState, api);

  return useBoundState as ((selector: (state: T) => any) => any) & API<T>;
}

function useStore<T extends unknown>(api: API<T>, selector: (state: T) => any) {
  // 方式一
  // const [, forceRender] = useState(0);
  // useEffect(() => {
  //   api.subscribe(() => {
  //     forceRender(Math.random());
  //   });
  //   return () => {
  //     api.destroy();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // return selector(api.getState());
  // 方式二
  return useSyncExternalStore(api.subscribe, () => selector(api.getState()));
}
