import { Video } from "expo-av";
import React, { useRef } from "react";
import { View } from "react-native";

const VideoPlayer = ({ uri, containerStyle }) => {
  const videoRef = useRef(null);

  return (
    <View>
      <Video
        ref={videoRef}
        source={{ uri }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={Video.RESIZE_MODE_COVER}
        isLooping={false}
        style={containerStyle}
        useNativeControls
      />
    </View>
  );
};

export default VideoPlayer;
