import { Button, Checkbox, Form, Input } from "antd";
import React from "react";

import { setloginState } from "../services";

const Login = () => {
  const onFinish = (values) => {
    setloginState(values.username);
    window.location.reload();
  };

  return (
    <div
      style={{
        width: "100%",
        height: "700px",
        backgroundColor: "#efdfdf",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          top: "50%",
          left: "25%",
          width: "500px",
          height: "500px",
        }}
      >
        <span style={{ fontSize: "larger" }}>Enter username to login..</span>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
