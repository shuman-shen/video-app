import React from "react";
import { MaterialCommunityIcons as Icons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const TouchableIcon = ({ size, name, color, onPress, containerStyle }) => {
  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Icons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default TouchableIcon;
