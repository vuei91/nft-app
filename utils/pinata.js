// Single File Upload
import axios from "axios";
const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiYTFhODFjOS02YzgyLTRiMjMtYWRmMC0wNmQzMWViZTk0ZjEiLCJlbWFpbCI6Indrd2syODA1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyNWRiMGMxODY1YTViMjRjNmNjNSIsInNjb3BlZEtleVNlY3JldCI6ImViNTNjNWM4MTdiMzM5ODE3NzM3MGRkNGZiYTg2ZDA5YmVkNmUxYzE0NGRiYmRkY2YzZjA2YjcwOTkyYmRmOTkiLCJpYXQiOjE2OTg4MzcwOTd9.JmJE1X7bwykDDFoABiXaurrLzylsuXVlEEEn4e4wWFk`;

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

export const pinJSONToIPFS = async (jsonData) => {
  const options = {
    method: "POST",
    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: JWT,
    },
    data: { pinataContent: jsonData },
  };

  return (await axios.request(options)).data;
};
