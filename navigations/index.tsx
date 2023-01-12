import React from "react";
import { useSelector } from "react-redux";
import LoginScreen from "../screens/auth/LoginScreen";
import MyStack from "../screens/MyStack";

export default function () {
  const { id, username, password, isLoggedIn } = useSelector(
    (state) => state.auth
  );
  console.log("id", id, username, password, isLoggedIn);

  return isLoggedIn ? <MyStack /> : <LoginScreen />;
}
