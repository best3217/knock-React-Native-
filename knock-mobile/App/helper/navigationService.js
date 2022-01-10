import { createRef } from "react";
import { CommonActions } from "@react-navigation/native";

export const navigationRef = createRef();

export const navigate = (name, params) => {
  navigationRef?.current?.navigate(name, params);
};