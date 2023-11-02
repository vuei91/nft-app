"use client";
import React from "react";
import { WagmiConfig, configureChains, createConfig, sepolia } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [publicProvider()]
);

const config = createConfig({
  publicClient,
  webSocketPublicClient,
});

const Provider = ({ children }) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default Provider;
