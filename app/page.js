"use client";
import { pinFileToIPFS } from "@/utils/pinata";
import React from "react";

const Home = () => {
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const files = e.target[0].files;
          const data = await pinFileToIPFS(files[0]);
          console.log(data);
        }}
      >
        <input type="file" name="file" />
        <input type="submit" value="전송" />
      </form>
    </div>
  );
};

export default Home;
