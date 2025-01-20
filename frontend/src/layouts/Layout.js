// src/components/layout/AppLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <div className="container-fluid px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
