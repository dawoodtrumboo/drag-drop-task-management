"use client";

import "./globals.css";
import {
  Layout,

  MenuProps,

} from "antd";

import React, { useContext, useEffect, useState } from "react";
import {
  AppstoreOutlined,
  HomeOutlined,
  LineChartOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { StoreContext } from "./context/context";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "/", icon: <HomeOutlined />, label: "Home" },
  { key: "/boards", icon: <AppstoreOutlined />, label: "Boards" },
  { key: "/settings", icon: <SettingOutlined />, label: "Settings" },
  { key: "/teams", icon: <TeamOutlined />, label: "Teams" },
  { key: "/analytics", icon: <LineChartOutlined />, label: "Analytics" },
];

const Home = () => {
  const [type, setType] = useState("signIn");

  const handleOnClick = (text: string) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };




  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
    
  return <Layout className="min-h-screen"></Layout>;
}

export default Home;
