"use client";
import React, { useEffect, useState } from "react";
import { pinFileToIPFS, pinJSONToIPFS } from "@/utils/pinata";
import { InjectedConnector } from "wagmi/connectors/injected";
import {
  useAccount,
  useBalance,
  useConnect,
  useContractReads,
  useContractWrite,
} from "wagmi";
import TestNFT2ABI from "@/abi/TestNFT2ABI.json";
import axios from "axios";
import { Button, Flex, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

const TestNFT2 = "0xE9Bc05261601520B643Ce4A6aaCF75b50d3afcC4";
const TestNFT2Data = {
  address: TestNFT2,
  abi: TestNFT2ABI,
};

const Home = () => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address,
  });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { data } = useContractReads({
    contracts: [
      { ...TestNFT2Data, functionName: "name" },
      { ...TestNFT2Data, functionName: "symbol" },
      {
        ...TestNFT2Data,
        functionName: "getTokenInfoByOwner",
        args: [address],
      },
    ],
  });
  const { write: safeMint } = useContractWrite({
    ...TestNFT2Data,
    functionName: "safeMint",
  });
  const [images, setImages] = useState([]);
  return (
    <div style={{ width: "70%", margin: "auto" }}>
      {isConnected ? (
        <div>
          <h4>Address</h4>
          <div>{address}</div>
          <h4>Balance</h4>
          <div>
            {balance?.formatted} {balance?.symbol}
          </div>
          <h4>NFT 내용</h4>
          <p>name: {data?.[0]?.result}</p>
          <p>symbol: {data?.[1]?.result}</p>
          <h4>NFT 생성</h4>
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
              const result = safeMint({
                args: [address, jsonCID],
                from: address,
              });
              console.log(result);
            }}
          >
            <p>
              <Input type="text" name="name" placeholder="name" />
            </p>
            <p>
              <TextArea
                name="description"
                cols="30"
                rows="10"
                placeholder="description"
              ></TextArea>
            </p>
            <p>
              <input type="file" name="file" />
            </p>
            <input type="submit" value="전송" />
          </form>
          <p>
            <Button
              onClick={async () => {
                const uris = data?.[2]?.result?.map((e) => e.uri);
                const images = [];
                for (let uri of uris) {
                  const image = (await axios.get(uri)).data?.image;
                  images.push(image);
                }
                setImages(images);
              }}
            >
              이미지보기
            </Button>
          </p>
          {images?.map((e, i) => (
            <p key={i}>
              <img src={e} width={"50%"} />
            </p>
          ))}
        </div>
      ) : (
        <Button onClick={connect}>연결</Button>
      )}
    </div>
  );
};

export default Home;
