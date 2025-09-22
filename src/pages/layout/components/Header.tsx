import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

import { Link } from "react-router-dom";

const items = [
  {
    key: "1",
    label: <Link to="/">Home</Link>,
  },
];


const AppHeader: React.FC = () => {
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
};

export default AppHeader;
