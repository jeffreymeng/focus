import React from "react";

import { Text } from "react-native";

export default (props) => {
  return <Text style={{ fontWeight: "bold" }}>{props.children}</Text>;
};