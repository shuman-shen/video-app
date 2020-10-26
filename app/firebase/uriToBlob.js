export const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      // return the blob
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      // something went wrong
      reject(new Error("uriToBlob failed"));
    };
    // this helps us get a blob
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);

    xhr.send(null);
  });
};
