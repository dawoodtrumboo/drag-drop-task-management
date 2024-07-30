import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import { LightTheme } from "@/utils/theme";
import React, { useContext } from "react";
import { StoreProvider } from "./context/context";
import BaseLayout from "@/app/components/Layout";
import { useRouter } from "next/router";
import { TaskProvider } from "./context/task.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Surge",
  description: "An AI Powered Task Management App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { contextHolder, logout } = useContext(AppContext);

  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {/* {contextHolder} */}
          <TaskProvider>

          <BaseLayout>{children}</BaseLayout>
          </TaskProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
