import { createContext, useContext } from "react";
import type { PropsWithChildren } from "react";

export interface LocaleContentType {
  locale: string;
}

interface LocaleProviderProps extends PropsWithChildren {
  locale?: string;
}

const LocaleContent = createContext<LocaleContentType>({ locale: "zh-CN" });

export default function Provider(props: LocaleProviderProps) {
  const { locale, children } = props;
  return (
    <LocaleContent.Provider value={{ locale: locale || navigator.language }}>
      {children}
    </LocaleContent.Provider>
  );
}

export function useLocaleContent() {
  return useContext(LocaleContent);
}
