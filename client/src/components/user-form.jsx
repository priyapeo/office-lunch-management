import React from "react";
import { Button, Form, Input, Select, Typography, Flex } from "antd";
import { useNavigate } from "react-router-dom";

const roleOptions = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "employee",
    label: "Employee",
  },
];

const UserForm = ({ isLogin = false, handleSubmit, renderFor }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    handleSubmit(values);
    form.resetFields();
  };

  const navigate = useNavigate();

  const handleClick = () => {
    if (isLogin) {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  };

  return (
    <Form
      form={form}
      name="user-form"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item label="Username" name="username">
        <Input placeholder="Enter username" size="large" />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input placeholder="Enter email" size="large" />
      </Form.Item>

      {isLogin && (
        <Form.Item label="Role" name="role">
          <Select
            onChange={() => null}
            options={roleOptions}
            placeholder="Select role"
            size="large"
          />
        </Form.Item>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" size="large">
          {renderFor === "login" ? "Login" : "Sign Up"}
        </Button>
      </Form.Item>

      <Flex justify="center" align="center">
        <Typography.Paragraph style={{ marginBottom: 0 }}>
          {!isLogin ? "Need an accound?" : "Are you already registered?"}
        </Typography.Paragraph>
        <Button type="link" onClick={handleClick}>
          {!isLogin ? "Sign Up" : "Login"}
        </Button>
      </Flex>
    </Form>
  );
};
export default UserForm;
