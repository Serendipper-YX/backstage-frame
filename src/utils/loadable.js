import Loadble from "react-loadable";
import React from "react";

export const lazyLoad = (loader, config) =>
  Loadble({
    loader: loader,
    loading() {
      return <div>正在加载...</div>;
    },
    ...config,
  });
