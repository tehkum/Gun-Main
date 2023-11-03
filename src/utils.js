const cloudinaryUploader = (file) => {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "xjsalnm2");
    data.append("cloud_name", "dhqxktn6p");

    fetch(`https://api.cloudinary.com/v1_1/dhqxktn6p/image/upload`, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((result) => {
        resolve(result.url);
      })
      .catch((error) => {
        reject("Upload failed");
        console.error("Error:", error);
      });
  });
};

export default cloudinaryUploader;
