"use client";
import React from "react";
import { pinFileToIPFS, pinJSONToIPFS } from "@/utils/pinata";
import { InjectedConnector } from "wagmi/connectors/injected";
import {
  useAccount,
  useBalance,
  useConnect,
  useContractRead,
  useContractReads,
  useContractWrite,
} from "wagmi";
import TestNFTABI from "@/abi/TestNFTABI.json";

const TestNFT = "0x3cBC667E4BB3B7bBDE7D29193250E7372e3027Ff";
const TestNFTData = {
  address: TestNFT,
  abi: TestNFTABI,
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
      { ...TestNFTData, functionName: "name" },
      { ...TestNFTData, functionName: "symbol" },
    ],
  });
  const [{ result: name }, { result: symbol }] = data;
  const { write: safeMint } = useContractWrite({
    ...TestNFTData,
    functionName: "safeMint",
  });
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
          <p>name: {name}</p>
          <p>symbol: {symbol}</p>
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
      ) : (
        <button onClick={connect}>연결</button>
      )}
    </div>
  );
};

export default Home;
