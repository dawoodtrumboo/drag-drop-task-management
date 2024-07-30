'use client';

import { LoginResponse } from "@/types/AuthTypes";
import { FetchedTask } from "@/types/TaskTypes";
import { LightTheme } from "@/utils/theme";
import { ConfigProvider, message } from "antd";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { useRouter } from "next/navigation";

type AppContextType = {
  auth: undefined | LoginResponse;
  setAuth: Dispatch<SetStateAction<LoginResponse | undefined>>;
  success: (message: string) => void;
  contextHolder: React.ReactNode;
  loading: (loading?: boolean) => void;
  messageApi: any;
  error: (message: string) => void;
  user: undefined | LoginResponse;
};
export const StoreContext = React.createContext<AppContextType>({
  auth: undefined,
  setAuth: () => {},
  success: () => {},
  contextHolder: null,
  loading: () => {},
  messageApi: message,
  error: () => {},
  user: undefined,
});

export const StoreProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [auth, setAuth] = useState<LoginResponse | undefined>(undefined);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  let user;

  if (typeof window !== "undefined"){
    const data =localStorage?.getItem("userDetails");
    user = JSON.parse(data);
  }
 
  useLayoutEffect(() => {
    if (user) {
      try {
        setAuth(user);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);
  const success = (message: string) => {
    messageApi.open({
      type: "success",
      content: message,
      key: "success",
    });
    setTimeout(() => {
      messageApi.destroy("success");
    }, 1000);
  };

  const error = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
      key: "error",
    });
    setTimeout(() => {
      messageApi.destroy("error");
    }, 1000);
  };

  const loading = (loading) => {
    if (!loading) {
      messageApi.destroy("loading");
      return;
    }
    messageApi.open({
      key: "loading",
      type: "loading",
      content: "Action in progress..",
      duration: 0,
    });
    // Dismiss manually and asynchronously
  };




  

  return (
    <StoreContext.Provider
      value={{
        auth,
        setAuth,
        success,
        error,
        loading,
        contextHolder,
        messageApi,
        user,
      }}
    >
      <ConfigProvider theme={LightTheme}>
        {children}
        {contextHolder}
      </ConfigProvider>
    </StoreContext.Provider>
  );
};
