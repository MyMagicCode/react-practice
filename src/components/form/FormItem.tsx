import React, {
  CSSProperties,
  ChangeEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { useFormContext } from "./FormContext";
import Schema, { Rule } from "async-validator";

export interface FormItemProps<T = Record<string, any>> {
  className?: string;
  style?: CSSProperties;
  label?: string;
  name?: keyof T;
  rules?: Array<Rule>;
  children?: ReactElement;
  valuePropName?: string;
}

/** 通过事件获取value值 */
const getValueFormEvent = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.type === "checkbox") {
    return e.target.checked;
  } else if (e.target.type === "radio") {
    return e.target.value;
  }
  return e.target.value;
};

export default function FormItem(props: FormItemProps) {
  const {
    label,
    valuePropName = "value",
    name = "",
    rules,
    style,
    className,
    children,
  } = props;
  const { values, validateRegister, onValueChange } = useFormContext();
  const prevValue = values?.[name];
  const [value, setValue] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setValue(prevValue);
  }, [prevValue]);

  useEffect(() => {
    validateRegister?.(name, () => handleValidate(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, value]);

  /** 校验字段并返回错误信息，没有错误返回null */
  const handleValidate = (value: any) => {
    let errorMsg = null;
    if (rules && rules.length > 0) {
      // 创建校验器
      const validator = new Schema({
        [name]: rules.map((rule) => {
          return {
            type: "string",
            ...rule,
          };
        }),
      });

      validator.validate({ [name]: value }, (errors, fields) => {
        if (errors) {
          // 校验失败
          if (errors.length) {
            // 设置错误信息
            setError(errors[0].message!);
            // 设置返回值
            errorMsg = errors[0].message!;
          }
        } else {
          // 校验成功
          setError("");
          errorMsg = null;
        }
      });
    }
    return errorMsg;
  };

  if (!name) return children || null;

  // cloneElement:创建一个元素，传入另外的props
  const child =
    React.Children.toArray(children).length > 1
      ? children
      : React.cloneElement(children!, {
          [valuePropName]: value ?? "",
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            const val = getValueFormEvent(e);
            // 同步数据
            setValue(val);
            onValueChange?.(name, val);
            // 校验数据
            handleValidate(val);
          },
        });
  return (
    <div className={className} style={style}>
      <div>{label && <label>{label}</label>}</div>
      <div>
        {child}
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
}
