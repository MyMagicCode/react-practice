import {
  CSSProperties,
  FormEvent,
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { formContext } from "./FormContext";

export interface FormProps<T = Record<string, any>>
  extends HTMLAttributes<HTMLFormElement> {
  className?: string;
  style?: CSSProperties;
  // 表单默认值
  initialValues?: T;
  children?: ReactNode;
  onFinish?: (values: T) => void; // 监听表单提交
  onFinishFailed?: (errors: Record<string, any>) => void; // 监听校验失败
}

export interface FormRef {
  getFieldsValue: () => void;
  setFieldsValue: (values: Record<string, any>) => void;
}

const Form = forwardRef<FormRef, FormProps>((props, ref) => {
  const { initialValues, children, onFinish, onFinishFailed, ...others } =
    props;
  // 表单的值
  const [values, setValues] = useState<Record<string, any>>(
    initialValues || {}
  );

  const validatorMap = useRef(new Map<string, Function>());
  const errors = useRef<Record<string, any>>({});

  useImperativeHandle(ref, () => {
    return {
      getFieldsValue: () => values,
      setFieldsValue(newValues) {
        setValues(Object.assign({}, newValues));
      },
    };
  });

  /** 修改全局值*/
  const onValueChange = (key: string, value: any) => {
    values[key] = value;
  };

  /** 添加校验函数 */
  const handleValidateRegister = (key: string, validator: Function) => {
    validatorMap.current.set(key, validator);
  };

  /** 处理表单提交函数 */
  const handleSubmit = (e: FormEvent) => {
    // 取消默认事件
    e.preventDefault();

    // 校验数据
    for (let [key, validator] of validatorMap.current.entries()) {
      if (typeof validator === "function") {
        errors.current[key] = validator();
      }
    }

    // 是否出现校验失败
    const isError = Object.keys(errors.current).some((key) =>
      Boolean(errors.current[key])
    );

    if (isError) {
      onFinishFailed?.(errors.current);
    } else {
      onFinish?.(values);
    }
  };

  return (
    <formContext.Provider
      value={{
        values,
        setValues: (values) => setValues(values),
        onValueChange,
        validateRegister: handleValidateRegister,
      }}>
      <form {...others} onSubmit={handleSubmit}>
        {children}
      </form>
    </formContext.Provider>
  );
});

export default Form;
