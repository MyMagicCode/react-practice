import { PropsWithChildren, createContext, useContext } from "react";

type DockApi = {
  hovered: boolean;
  width: number;
};

const dockContext = createContext<DockApi>({ hovered: false, width: 0 });

export function DockProvider({
  children,
  value,
}: PropsWithChildren<{ value: DockApi }>) {
  return <dockContext.Provider value={value}>{children}</dockContext.Provider>;
}

export function useDockContext() {
  return useContext(dockContext);
}
