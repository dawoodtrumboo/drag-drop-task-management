"use client";
import { useContext, useEffect } from "react";

import { redirect } from "next/navigation";
import { StoreContext } from "./context/context";

export const withAuth = (WrappedComponent: any) => {
  const auth = localStorage.getItem("userDetails");
  return function WithAuth(props: any) {
    const session = auth && JSON.parse(auth);
    useEffect(() => {
      if (!session) {
        redirect("/auth");
      }
    }, []);

    if (!session) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};
