import React, { useContext, useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AppScreen from "../components/AppScreen";
import DismissKeyboardView from "../components/DismissKeyboardHOC";
import VideoPlayer from "../components/VideoPlayer";
import { db } from "../firebase/utils";
import * as Random from "expo-random";
import { uriToBlob } from "../firebase/uriToBlob";
import { storage } from "../firebase/utils";
import AppProgressBar from "../components/AppProgressBar";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import VideoContext from "../context/videoContext";

const VideoUploadScreen = ({ route, navigation }) => {
  const { uri } = route.params;
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { setVideo } = useContext(VideoContext);

  const setFileName = () => {
    let fileName = "VideoClip";

    if (Platform.OS === "ios") {
      fileName = fileName + Random.getRandomBytes(4).join("");
    }
    if (Platform.OS === "android") {
      fileName = fileName + Random.getRandomBytes(4).join("");
    }
    return fileName;
  };

  const uploadToFirebase = (blob, fileName) => {
    let fileNameExt = "Untitled";
    if (Platform.OS === "ios") {
      fileNameExt = `${fileName}.mov`;
    }
    if (Platform.OS === "android") {
      fileNameExt = `${fileName}.3gp`;
    }
    storage
      .ref()
      .child(`videos/${fileNameExt}`)
      .put(blob)
      .then((snapshot) => {
        blob.close();
        return snapshot.ref.getDownloadURL();
      })
      .then((downloadUrl) => {
        console.log(downloadUrl);
        const now = new Date();
        db.ref(`videos/${fileName}`).set({
          storageUrl: downloadUrl,
          title: title ? title : fileName,
          createdAt: now.toISOString(),
          fileName,
        });
        setVideo({
          title: title ? title : fileName,
          uri: downloadUrl,
          createdAt: now.toISOString(),
          fileName,
        });
      })
      .then(() => {
        setLoading(false);
        Alert.alert("Success", "Video successfully uploaded.");
        setTitle("");
        navigation.navigate("Camera");
      })
      .catch((error) => {
        console.log(error.message);
        setVideo({});
      });
  };

  const handleUpload = async () => {
    if (uri) {
      setLoading(true);
      try {
        const uploadBlob = await uriToBlob(uri);
        const newFileName = setFileName();
        uploadToFirebase(uploadBlob, newFileName);
      } catch (e) {
        console.log(e.message);
      }
    }
  };
  return (
    <AppScreen>
      <DismissKeyboardView style={{ alignItems: "center" }}>
        {loading ? <AppProgressBar /> : null}
        <TextInput
          style={styles.input}
          placeholder="Add a title (optional)"
          onChangeText={(text) => setTitle(text)}
          maxLength={40}
        />
        <VideoPlayer uri={uri} containerStyle={styles.videoContainer} />

        <TouchableOpacity style={styles.btnContainer} onPress={handleUpload}>
          <Text style={styles.btnText}>Upload</Text>
        </TouchableOpacity>
      </DismissKeyboardView>
    </AppScreen>
  );
};

export default VideoUploadScreen;

const styles = StyleSheet.create({
  btnContainer: {
    height: 40,
    width: 200,
    backgroundColor: "#1579fb",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  btnText: { color: "white", fontSize: 16 },
  input: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    height: 40,
    width: 200,
    marginVertical: 20,
  },
  videoContainer: { width: 200, height: (200 / 3) * 4 },
});
