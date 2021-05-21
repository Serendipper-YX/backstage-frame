/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Dropdown, Button, Menu, Modal } from "antd";
import {
  MenuUnfoldOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./header.less";
import menuList from "../../config/menuConfig";
const { confirm } = Modal;
const Header = ({ username, loginOut, history }) => {
  const logout = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: "确认登出么？",
      onOk: () => {
        loginOut();
        history.replace("/login");
      },
    });
  };

  const getTitle = () => {
    let title = "";
    const path = history.location.pathname;
    menuList.forEach((item) => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find((cItem) => cItem.key === path);
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    return title;
  };

  const title = getTitle();

  const menu = (
    <Menu>
      <Menu.Item>
        <a href onClick={logout}>
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="header">
      <div className="header-top">
        {username}
        <Dropdown overlay={menu} placement="bottomRight">
          <Button>
            <MenuUnfoldOutlined />
          </Button>
        </Dropdown>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{title}</div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    username: state.user.username,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginOut: dispatch.user.userLogout,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
