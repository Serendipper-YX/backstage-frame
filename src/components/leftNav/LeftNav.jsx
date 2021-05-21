import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import menuList from "../../config/menuConfig";
import "./leftNav.less";

const { SubMenu } = Menu;

const LeftNav = ({history}) => {
  const [menuLists, setMenuLists] = useState("");
  const [openKey, setOpenKey] = useState("");
  const selectKey = history.location.pathname;

  useEffect(() => {
    const getMenuList = (menuList) => {
      return menuList.map((item) => {
        if (!item.children) {
          return (
            <Menu.Item key={item.key} icon={<item.icon />}>
              <Link to={item.key}>{item.title}</Link>
            </Menu.Item>
          );
        } else {
          const cItem = item.children.find((cItem) => cItem.key === selectKey);
          if (cItem) {
            setOpenKey(item.key);
          }
          return (
            <SubMenu key={item.key} title={item.title} icon={<item.icon />}>
              {getMenuList(item.children)}
            </SubMenu>
          );
        }
      });
    };
    setMenuLists(getMenuList(menuList));
  }, [selectKey]); 
  console.log("object",openKey);
  return (
    <div className="left-nav">
      <Link to="/home">
        <div className="left-nav-top">
          obbyWorld
        </div>
      </Link>
      <Menu
        selectedKeys={[selectKey]}
        defaultOpenKeys={[openKey]}
        mode="inline"
        theme="dark"
      >
        {menuLists}
      </Menu>
    </div>
  );
};
export default withRouter(LeftNav);
