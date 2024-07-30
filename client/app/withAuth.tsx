"use client";
import { useContext, useEffect } from "react";

import { redirect } from "next/navigation";
import { StoreContext } from "./context/context";


export const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {


 


    let user;
  if (typeof window !== "undefined"){
    const data =localStorage?.getItem("userDetails");
    user = JSON.parse(data);
  }

    useEffect(() => {
      if (!user) {
        redirect("/auth");
      }
    }, []);

    

    if (!user) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};
