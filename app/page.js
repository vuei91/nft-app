"use client";
import { pinFileToIPFS, pinJSONToIPFS } from "@/utils/pinata";
import { InjectedConnector } from "wagmi/connectors/injected";
import React from "react";
import { useAccount, useConnect } from "wagmi";

const Home = () => {
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  return (
    <div>
      {isConnected ? (
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
      ) : (
        <button onClick={connect}>연결</button>
      )}
    </div>
  );
};

export default Home;
