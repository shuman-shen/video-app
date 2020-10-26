import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CameraScreen from "../screens/CameraScreen";
import VideoUploadScreen from "../screens/VideoUploadScreen";

const Stack = createStackNavigator();

const RecorderNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen name="Camera" component={CameraScreen} />
    <Stack.Screen name="Upload" component={VideoUploadScreen} />
  </Stack.Navigator>
);

export default RecorderNavigator;
