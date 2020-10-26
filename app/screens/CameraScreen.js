import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Permissions from "expo-permissions";
import AppCamera from "../components/AppCamera";

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(false);
  const [file, setFile] = useState("");

  const requestPermission = async () => {
    const { granted } = await Permissions.askAsync(
      Permissions.AUDIO_RECORDING,
      Permissions.CAMERA
    );

    if (!granted) {
      alert(
        "You must have access to both microphone and camera to record the video."
      );
      return;
    }
    setHasPermission(true);
  };
  const handleUpload = () => {
    navigation.navigate("Upload", {
      uri: file,
    });
    setFile("");
  };

  useEffect(() => {
    requestPermission();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Camera Access.</Text>
      </View>
    );
  }
  return <AppCamera file={file} setFile={setFile} onUpload={handleUpload} />;
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center" },
  text: { fontSize: 24, paddingTop: 40 },
});
