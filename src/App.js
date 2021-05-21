//应用根组件
import React, { Component } from "react";
import { HashRouter, Switch, Route} from "react-router-dom";
import { lazyLoad } from "./utils/loadable";

const Login = lazyLoad(() => import("../src/pages/login/Login"));
const Admin = lazyLoad(() => import("../src/pages/admin/Admin"));

class App extends Component {
  render() {

    return (
      <HashRouter>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/" component={Admin} />
        </Switch>
      </HashRouter>
    );
  }
  
}

export default App;
