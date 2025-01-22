import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <div className="layout-sidebar">
        <Header />
      </div>
      <div className="layout-main">
        <div className="container-fluid px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
