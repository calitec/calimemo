/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  BarChartOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import fetcher from "../utils/fetcher";
import axios from "axios";

export default function Layouts() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const { data } = useSWR("/user", fetcher);
  const { mutate } = useSWRConfig();

  const { Content, Sider } = Layout;
  const items = [
    { key: "1", path: "/" },
    { key: "2", path: "/Chart" },
    { key: "3", path: "/Login" },
  ];
  const [selectedKey, setSelectedKey] = useState(
    items.find((_item) => pathname.endsWith(_item.path))?.key
  );

  useEffect(() => {
    mutate("/user");
  }, []);

  useEffect(() => {
    setSelectedKey(items.find((_item) => pathname.endsWith(_item.path))?.key);
  }, [pathname]);

  const onLogout = async () => {
    mutate("/user", null, false);
    await axios.post("/user/logout", {
      withCredentials: true,
    });
    mutate("/user");
    navigate("/Login");
  };

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout css={wrapper(collapsed)}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={[selectedKey]} mode="inline">
          <Menu.Item key="1" icon={<CalendarOutlined />}>
            <Link to="/">달력</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BarChartOutlined />}>
            <Link to="/Chart">차트</Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<UserOutlined />}
            onClick={data?.isValid ? onLogout : null}
          >
            {data?.isValid ? (
              <div>로그아웃</div>
            ) : (
              <Link to="/Login">Login</Link>
            )}
          </Menu.Item>
        </Menu>
      </Sider>
      <aside className="mobile-aside">
        <Menu theme="dark" defaultSelectedKeys={[selectedKey]} mode="inline">
          <Menu.Item key="1">
            <Link to="/">
              <CalendarOutlined />
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/Chart">
              <BarChartOutlined />
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            {data?.isValid ? (
              <div onClick={onLogout}>로그아웃</div>
            ) : (
              <Link to="/Login">
                <UserOutlined />
              </Link>
            )}
          </Menu.Item>
        </Menu>
      </aside>
      <Layout className="site-layout">
        <Content>
          <Breadcrumb>
            <Breadcrumb.Item>
              {pathname == "/"
                ? "CALENDAR"
                : pathname == "/Chart"
                ? "CHART"
                : moment(pathname.split("/")[2]).format("YYYY. MM. DD.")}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

const wrapper = (collapsed) => css`
  overflow: hidden;
  min-height: 100vh;
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0;
    z-index: 3;
  }
  .ant-breadcrumb-link {
    font: 500 20px/20px "Noto Sans";
  }
  .ant-layout-sider {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 3;
    .ant-menu-item {
      margin-top: 0;
    }
  }
  .mobile-aside {
    display: none;
  }
  main {
    padding-left: ${collapsed ? "80px" : "200px"};
    .ant-breadcrumb {
      padding: 0.6em 1em;
      background-color: #ffffff;
    }
    .site-layout-background {
      position: relative;
      height: 100%;
      padding: 1em 0;
      background-color: #ffffff;
    }
  }
  @media screen and (max-width: 768px) {
    .ant-layout-sider {
      display: none;
    }
    .mobile-aside {
      display: block;
      position: fixed;
      top: auto;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 10;
      ul {
        display: flex;
        justify-content: space-between;
        li {
          text-align: center;
        }
      }
    }
    main {
      padding: 0 0 52px 0;
    }
  }
`;
