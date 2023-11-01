// Single File Upload
import axios from "axios";
const JWT = `Bearer JWT`;

export const pinFileToIPFS = async (selectedFile) => {
  const formData = new FormData();

  formData.append("file", selectedFile);

  const metadata = JSON.stringify({
    name: "File name",
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: JWT,
      },
    }
  );
  return res.data;
};
