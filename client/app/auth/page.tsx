"use client";
import Login from "./components/Login";
import Signup from "./components/Signup";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../context/context";

const Auth: React.FC = () => {


  const [type, setType] = useState("signIn");
  const handleOnClick = (text: string) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="Auth">
      <div className={`${containerClass}`} id="container">
        <Signup />
        <Login />
        <div className="overlay-container auth  flex flex-col">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="text-3xl">Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="text-3xl">Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
