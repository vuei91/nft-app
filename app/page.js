"use client";
import React from "react";

const Home = () => {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const files = e.target[0].files;
          console.log(files);
        }}
      >
        <input type="file" name="file" />
        <input type="submit" value="전송" />
      </form>
    </div>
  );
};

export default Home;
