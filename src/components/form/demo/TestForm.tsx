import { ChangeEvent, InputHTMLAttributes, useRef } from "react";
import Form from "..";
import { FormRef } from "../Form";

export default function TestForm() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const form = useRef<FormRef>(null);

  return (
    <div className="w-[300px] my-0 mx-auto pt-5">
      <button
        className="p-2 mr-2 bg-gray-500 rounded-lg text-slate-50"
        onClick={() => {
          console.log(form.current?.getFieldsValue());
        }}>
        打印
      </button>

      <button
        className="p-2 mr-2 bg-gray-500 rounded-lg text-slate-50"
        onClick={() => {
          form.current?.setFieldsValue({
            username: "啊哈哈哈哈",
          });
        }}>
        设置
      </button>

      <Form
        ref={form}
        initialValues={{ remember: true, username: "123" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "请输入用户名!" },
            { max: 6, message: "长度不能大于 6" },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}>
          <Input />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Input type="checkbox"></Input>
        </Form.Item>

        <Form.Item>
          <div>
            <button type="submit">登录</button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  const { value, ...others } = props;
  return (
    <input
      style={{ border: "1px solid #ccc" }}
      value={value || ""}
      {...others}
    />
  );
};
