import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import VideoPlayScreen from "../screens/VideoPlayScreen";

const Stack = createStackNavigator();

const VideoNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen name="Browse" component={VideoPlayScreen} />
  </Stack.Navigator>
);

export default VideoNavigator;
