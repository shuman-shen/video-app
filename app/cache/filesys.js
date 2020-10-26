import * as FileSystem from "expo-file-system";

const videoDir = FileSystem.cacheDirectory + "videoapp/";
//const videoUrl = () => `https://something`;

// Checks if directory exists. If not, creates it
async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(videoDir);
  if (!dirInfo.exists) {
    console.log("Directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(videoDir, { intermediates: true });
  }
}

// Downloads all gifs specified as array of IDs
export async function downloadVideo(videoUrl, fileName) {
  try {
    await ensureDirExists();

    console.log("Downloading");
    await FileSystem.downloadAsync(videoUrl, videoDir + fileName);
  } catch (e) {
    console.error("Couldn't download the file:", e.message);
  }
}

// Returns URI to our local file
// If our file doesn't exist locally, it downloads it
export async function getVideo(videoUrl, fileName) {
  await ensureDirExists();

  const fileInfo = await FileSystem.getInfoAsync(videoDir + fileName);

  if (!fileInfo.exists) {
    console.log("Video isn't cached locally. Downloading...");
    await FileSystem.downloadAsync(videoUrl, videoDir + fileName);
  }
  const route = videoDir + fileName;
  return route;
}

// Exports shareable URI - it can be shared outside your app
export async function getVideoShareUri(fileName) {
  return FileSystem.getContentUriAsync(await getVideo(fileName));
}

// Deletes whole directory with all its content
export async function deleteAll() {
  console.log("Deleting all video files...");
  await FileSystem.deleteAsync(videoDir);
}
