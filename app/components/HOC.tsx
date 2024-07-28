"use client";
import { withAuth } from "@/app/withAuth";
import React from "react";

const HOC = () => {
  return <div>HOC</div>;
};

export default withAuth(HOC);
