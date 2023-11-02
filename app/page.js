"use client";
import { pinFileToIPFS, pinJSONToIPFS } from "@/utils/pinata";
import React from "react";

const Home = () => {
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const [name, description, file] = e.target;
          const { IpfsHash: fileCID } = await pinFileToIPFS(file.files[0]);
          const jsonData = {
            name: name.value,
            description: description.value,
            image: `https://ipfs.io/ipfs/${fileCID}`,
          };
          console.log(jsonData);
          const { IpfsHash: jsonCID } = await pinJSONToIPFS(jsonData);
          console.log("json", jsonCID);
        }}
      >
        <p>
          <input type="text" name="name" placeholder="name" />
        </p>
        <p>
          <textarea
            name="description"
            cols="30"
            rows="10"
            placeholder="description"
          ></textarea>
        </p>
        <p>
          <input type="file" name="file" />
        </p>
        <input type="submit" value="전송" />
      </form>
    </div>
  );
};

export default Home;
