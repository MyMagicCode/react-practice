import { PropsWithChildren, createContext, useContext } from "react";
import { SizeType } from "./Space";

export interface IConfigContext {
  space?: {
    size?: SizeType;
  };
}

const ConfigContext = createContext<IConfigContext>({});

export function ConfigProvider(
  props: PropsWithChildren<{ value: IConfigContext }>
) {
  const { value, children } = props;
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}

export function useConfigContext() {
  return useContext(ConfigContext);
}
