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
import React, { useContext, useEffect, useState } from "react";
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
  UserOutlined,
} from "@ant-design/icons";
import { usePathname } from "next/navigation";
import { StoreContext } from "../context/context";
import Logo from "../../public/assets/logo.svg";
import { TaskContext } from "../context/task.context";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "/tasks", icon: <AppstoreOutlined />, label: "Tasks" },

  { key: "/settings", icon: <SettingOutlined />, label: "Settings" },
];

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = usePathname();
  const { logout } = useContext(TaskContext);
  let user;
  if (typeof window !== "undefined") {
    const data = localStorage?.getItem("userDetails");
    user = JSON.parse(data);
  }
  const [name, setName] = useState("");

  useEffect(() => {
    if (user) {
      setName(user?.user?.name.split(" ")[0]);
    }
  }, [user]);

  const [type, setType] = useState("signIn");
  const handleOnClick = (text: string) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return router === "/tasks" ? (
    <Layout className="min-h-screen">
      <Sider
        breakpoint="lg"
        width="250px"
        collapsedWidth="0"
        className="py-2 px-3"
        zeroWidthTriggerStyle={{ color: "black" }}
      >
        <Flex vertical justify="space-between" className="h-full pb-5">
          <Flex vertical>
            <Logo width="140px" height="70px" />

            <Menu
              defaultSelectedKeys={[router]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              items={items}
            />
          </Flex>

          <Space>
            <Avatar
              shape="square"
              className="bg-primaryColor"
              icon={<UserOutlined className="text-white" />}
            />
            <h2 className="!text-gray-800 font-semibold text-md">
              {user?.user.name}
            </h2>
          </Space>
        </Flex>
      </Sider>
      <Layout
        style={{
          paddingBlock: "12px",
          paddingInline: "12px",
          maxWidth: "1440px",
          marginInline: "auto",
        }}
      >
        <Header style={{ padding: 0 }} className="my-3">
          <Flex justify="space-between" align="center">
            <h1 className="!text-gray-900 text-3xl">Good Morning, {name}</h1>

            <Flex gap={10}>
              <Button icon={<BellOutlined />} className="border-none" />
              <Button
                className="bg-gray-200 border-none"
                onClick={() => logout()}
              >
                Logout
              </Button>
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
