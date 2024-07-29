"use client";

import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Layout,
  Menu,
  MenuProps,
  Space,
  Typography,
} from "antd";
import React, { useContext, useState } from "react";
import {
  AppstoreOutlined,
  BellOutlined,
  ContainerOutlined,
  DesktopOutlined,
  HomeOutlined,
  LineChartOutlined,
  MailOutlined,
  PieChartOutlined,
  PlusCircleFilled,
  QuestionCircleOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { usePathname } from "next/navigation";
import { StoreContext } from "../context/context";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "/tasks", icon: <HomeOutlined />, label: "Home" },
  { key: "/boards", icon: <AppstoreOutlined />, label: "Boards" },
  { key: "/settings", icon: <SettingOutlined />, label: "Settings" },
  { key: "/teams", icon: <TeamOutlined />, label: "Teams" },
  { key: "/analytics", icon: <LineChartOutlined />, label: "Analytics" },
];

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = usePathname();
  const { logout } = useContext(StoreContext);
  let user;
  if (typeof window !== "undefined"){
    const data =localStorage?.getItem("userDetails");
    user = JSON.parse(data);
  }

  const name = user?.user.name.split(" ")[0];
  const [type, setType] = useState("signIn");
  const handleOnClick = (text: string) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return router === "/tasks"? (
    <Layout className="min-h-screen">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        className="py-8 px-1"
        zeroWidthTriggerStyle={{ color: "black" }}
      >
        <Space>
          <Avatar shape="square" />
          <h2 className="!text-gray-800 font-semibold text-lg">
            {user?.user.name}
          </h2>
        </Space>
        <Flex justify="space-between" className="my-3">
          <Button icon={<BellOutlined />} className="border-none" />
          <Button className="bg-gray-200 border-none" onClick={() => logout()}>
            Logout
          </Button>
        </Flex>

        <Menu
          defaultSelectedKeys={[router]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
        <Button type="primary" className="w-full py-5 text-md ">
          Create new task
          <PlusCircleFilled />
        </Button>
      </Sider>
      <Layout
        style={{
          paddingBlock: "12px",
          paddingInline: "12px",
          maxWidth: "1440px",
          marginInline: "auto",
        }}
      >
        <Header style={{ padding: 0 }}>
          <Flex justify="space-between" align="center">
            <h1 className="!text-gray-900 text-3xl">Good Morning, {name}!</h1>
            <Flex gap={8} align="center">
              <h2 className="text-md">Help & feedback</h2>
              <QuestionCircleOutlined />
            </Flex>
          </Flex>
        </Header>

        <Content style={{ margin: "24px 0 0" }}>{children}</Content>
      </Layout>
    </Layout>
  ) : (
    <Layout>{children}</Layout>
  );
}
