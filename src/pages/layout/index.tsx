import React, { memo } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "./components/Header";
import AppFooter from "./components/Footer";

const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: "30px 70px", minHeight: "85vh" }}>
        <Outlet />
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default memo(MainLayout);
