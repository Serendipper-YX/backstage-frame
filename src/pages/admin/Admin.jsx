import React from "react";
import { Layout } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";
import { lazyLoad } from "../../utils/loadable";
import LeftNav from "../../components/leftNav/LeftNav";
import Header from "../../components/header/Header";
import "./admin.less";

const Home = lazyLoad(() => import("../home/Home"));
const User = lazyLoad(() => import("../user/User"));
const Product = lazyLoad(() => import("../product/Product"));
const ProductPrice = lazyLoad(() => import("../product/ProductPrice"));

const Admin = () => {
  const { Sider, Content } = Layout;
  const token = localStorage.getItem("token");
  if (!token) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="admin">
      <Layout>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content style={{margin:"1.5vw 2vw",background:"white"}}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/user" component={User} />
              <Route path="/product/type" component={Product} />
              <Route path="/product/price" component={ProductPrice} />
              <Redirect to="/home" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default Admin;
