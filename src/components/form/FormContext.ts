import { createContext, useContext } from "react";

export interface FormContextProps {
  values?: Record<string, any>;
  setValues?: (values: any) => void;
  // 监听values属性变化
  onValueChange?: (key: string, value: any) => void;
  // 注册校验规则函数
  validateRegister?: (name: string, callback: Function) => void;
}

export const formContext = createContext<FormContextProps>({});

/**
 * 表单context hook
 * @returns 表单context
 */
export function useFormContext() {
  return useContext(formContext);
}
