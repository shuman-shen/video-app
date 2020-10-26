import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import AppProgressBar from "../components/AppProgressBar";
import AppScreen from "../components/AppScreen";
import VideoPlayer from "../components/VideoPlayer";
import VideoContext from "../context/videoContext";
import { db } from "../firebase/utils";

const VideoPlayScreen = ({ navigation }) => {
  const { video, setVideo } = useContext(VideoContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getLatest();
  }, [video]);

  const getLatest = async () => {
    try {
      await db
        .ref("videos/")
        .orderByChild("createdAt")
        .limitToLast(1)
        .once("value", (snapshot) => {
          const res = snapshot.val();
          const result = Object.values(res);
          if (result.length > 0) {
            const { storageUrl, createdAt, title, fileName } = result[0];
            navigation.setOptions({ title });
            if (!video) {
              setVideo({
                title,
                uri: storageUrl,
                createdAt,
                fileName,
              });
              setLoading(false);
              return;
            }
            if (storageUrl !== video.uri) {
              setVideo({
                title,
                uri: storageUrl,
                createdAt,
                fileName,
              });
              setLoading(false);
              return;
            }
            setLoading(false);
          }
        });
    } catch (e) {
      console.log(e.message);
      setLoading(false);
    }
  };

  return (
    <AppScreen>
      {loading ? <AppProgressBar /> : null}
      {video ? (
        <VideoPlayer uri={video.uri} containerStyle={styles.video} />
      ) : (
        <Text style={styles.text}>Waiting for the video to load.</Text>
      )}
    </AppScreen>
  );
};

export default VideoPlayScreen;

const styles = StyleSheet.create({
  video: {
    height: "100%",
  },
  text: {
    paddingTop: 40,
    fontSize: 24,
    textAlign: "center",
  },
});
