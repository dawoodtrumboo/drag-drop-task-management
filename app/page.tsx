"use client";
import "./globals.css";
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
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import React, { useState } from "react";
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

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "/", icon: <HomeOutlined />, label: "Home" },
  { key: "/boards", icon: <AppstoreOutlined />, label: "Boards" },
  { key: "/settings", icon: <SettingOutlined />, label: "Settings" },
  { key: "/teams", icon: <TeamOutlined />, label: "Teams" },
  { key: "/analytics", icon: <LineChartOutlined />, label: "Analytics" },
];

export default function Home({ children }: { children: React.ReactNode }) {
  const [type, setType] = useState("signIn");
  const handleOnClick = (text: string) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return <Layout className="min-h-screen">{children}</Layout>;
}
