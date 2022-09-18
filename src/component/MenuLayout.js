import { Layout, Menu } from "antd";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";

import { loginState } from "../services";
import Home from "../pages/Home";
import PageHeaderLayout from "./PageHeader";
import OutUser from "../pages/OutUser";

const { Header, Sider, Content } = Layout;

const menutitle = [
  {
    path: "/",
    title: "Todo",
  },
  {
    path: "/1",
    title: "Log Out",
  },
];

function MenuLayout() {
  const [collapsed, setCollapsed] = useState(false);

  let navigate = useNavigate();

  const onClick = (e) => {
    const path = e.keyPath[0].toString();
    navigate(path, { replace: true });
  };

  return (
    <Layout style={{ backgroundColor: "black", height: "800px" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          onClick={onClick}
          defaultSelectedKeys={["/"]}
          items={[
            {
              key: "/",
              icon: <UserOutlined />,
              label: "Todo",
            },
            {
              key: "/1",
              icon: <UploadOutlined />,
              label: "Log Out",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            color: "white",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <span style={{ right: 10, position: "absolute" }}>
            {loginState()}
          </span>
          <div></div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <PageHeaderLayout menutitle={menutitle} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/1" element={<OutUser />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default MenuLayout;
