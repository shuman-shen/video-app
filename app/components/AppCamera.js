import React, { useState, useRef } from "react";
import { Button, StyleSheet, View } from "react-native";

import { Camera } from "expo-camera";
import { Video } from "expo-av";

import TouchableIcon from "./TouchableIcon";

export default function AppCamera({ file, setFile, onUpload }) {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isCamReady, setIsCamReady] = useState(false);
  const [onRec, setOnRec] = useState(false);

  const camRef = useRef(null);
  const startRec = async () => {
    if (isCamReady && !onRec) {
      setOnRec(true);
      setFile("");
      camRef.current
        .recordAsync({
          quality: Camera.Constants.VideoQuality["4:3"],
          maxDuration: 5,
        })
        .then((data) => {
          setFile(data.uri);
          setOnRec(false);
        });
    }
  };
  const stopRec = () => {
    if (onRec) {
      setOnRec(false);
      camRef.current.stopRecording();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ height: "100%" }}
        type={type}
        onCameraReady={() => setIsCamReady(true)}
        ref={camRef}
        ratio="4:3"
      >
        <View style={styles.container}>
          <TouchableIcon
            containerStyle={styles.flipBtn}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
            name="sync"
            size={36}
            color="grey"
          />
          {onRec ? (
            <TouchableIcon
              containerStyle={styles.recBtn}
              onPress={stopRec}
              name="record-circle"
              size={48}
              color="red"
            />
          ) : (
            <TouchableIcon
              containerStyle={styles.recBtn}
              onPress={startRec}
              name="record-circle-outline"
              size={48}
              color="grey"
            />
          )}
          {file ? (
            <View style={{ flex: 0.2 }}>
              <Video
                source={{ uri: file }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay={false}
                isLooping
                style={styles.preview}
              />
              <TouchableIcon
                onPress={onUpload}
                containerStyle={styles.uploadBtn}
                name="cloud-upload"
                color="white"
                size={36}
              />
            </View>
          ) : (
            <View style={styles.previewEmpty} />
          )}
        </View>
      </Camera>
      <Button onPress={onUpload} title="Upload" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 30,
  },
  flipBtn: {
    flex: 0.2,
    alignSelf: "flex-end",
    alignItems: "center",
  },

  preview: {
    width: 60,
    height: 80,
    borderColor: "white",
    borderWidth: 3,
  },
  previewEmpty: {
    flex: 0.2,
    width: 60,
    height: 80,
    backgroundColor: "transparent",
  },
  recBtn: {
    alignSelf: "flex-end",
    alignItems: "center",
    flex: 0.6,
  },
  uploadBtn: { position: "absolute", top: 30, left: 10 },
});
