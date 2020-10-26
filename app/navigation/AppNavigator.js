import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons as Icons } from "@expo/vector-icons";
import RecorderNavigator from "./RecorderNavigator";
import VideoNavigator from "./VideoNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Video"
      component={VideoNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icons name="play" color={color} size={size} />
        ),
      }}
    />

    <Tab.Screen
      name="Record"
      component={RecorderNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icons name="video" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
