import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

import VideoContext from "./app/context/videoContext";
import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  const [video, setVideo] = useState();
  return (
    <VideoContext.Provider value={{ video, setVideo }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </VideoContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
