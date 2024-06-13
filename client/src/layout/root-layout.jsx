import React from "react";
import { Layout, Menu, theme, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const { Header, Content } = Layout;

const menuItems = [
  {
    key: "/",
    label: "Menu",
    role: "employee",
  },
  { key: "/add-menu", label: "Add Menu", role: "admin" },
  { key: "/orders", label: "Orders", role: "admin" },
];

const RootLayout = (props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const { auth, updateAuth } = useAuth();

  const menuItemsBasedOnUserRole = () =>
    menuItems.filter((item) => item.role === auth?.role);

  const handleLogout = () => {
    updateAuth();
  };

  const location = useLocation();

  return (
    <Layout>
      {auth?.id && (
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button type="link">Office Lunch Management</Button>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={location.pathname}
            items={menuItemsBasedOnUserRole()}
            onClick={(item) => {
              navigate(item.key);
            }}
          />
          <Button type="primary" ghost onClick={handleLogout}>
            Logout
          </Button>
        </Header>
      )}
      <Content
        style={{
          padding: "0 48px",
          margin: "32px 0",
        }}
      >
        <main
          style={{
            background: colorBgContainer,
            minHeight: "100lvh",
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {props.children}
        </main>
      </Content>
    </Layout>
  );
};
export default RootLayout;
