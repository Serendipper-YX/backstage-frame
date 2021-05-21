import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.less";

const Login = ({ loginPwd }) => {
  const history = useHistory();
  const onFinish = async (values) => {
    const { username, password } = values;
    await loginPwd(username, password);
    const token = localStorage.getItem("token") || "{}";
    if (token) {
      history.replace("/home");
    }
  };

  return (
    <div className="login">
      <div className="header">
        <h2>后台管理系统</h2>
      </div>
      <div className="content">
        <h2>用户登录</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "用户名必填",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "密码必填",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state.user.token);
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginPwd: (account, password) =>
      dispatch.user.userLoginAsync({ account, password }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
