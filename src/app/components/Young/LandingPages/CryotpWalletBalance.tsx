"use client";

import { useState } from "react";
import styles from "./CryptoWalletBalance.module.css";

interface Asset {
  symbol: string;
  balance: string;
  value: string;
}

interface Transaction {
  id: number;
  type: string;
  amount: string;
  date: string;
  status: string;
}

interface NFT {
  id: number;
  name: string;
  value: string;
}

interface WalletData {
  assets: Asset[];
  transactions: Transaction[];
  nfts: NFT[];
}

export default function CryptoWalletBalance() {
  const [activeTab, setActiveTab] = useState<"assets" | "transactions" | "nfts">("assets");
  const [walletAddress, setWalletAddress] = useState<string>("");

  const walletData: WalletData = {
    assets: [
      { symbol: "XCH", balance: "42.56", value: "$5,123.45" },
      { symbol: "BTC", balance: "0.042", value: "$2,663.64" },
      { symbol: "ETH", balance: "1.2", value: "$4,140.80" },
    ],
    transactions: [
      { id: 1, type: "Received", amount: "+10 XCH", date: "2023-10-15", status: "Completed" },
      { id: 2, type: "Sent", amount: "-0.5 BTC", date: "2023-10-12", status: "Completed" },
      { id: 3, type: "Swap", amount: "ETH → XCH", date: "2023-10-10", status: "Pending" },
    ],
    nfts: [
      { id: 1, name: "Chia Farm #1234", value: "0.5 XCH" },
      { id: 2, name: "CryptoPunk #9999", value: "2.3 ETH" },
    ],
  };

  return (
    <div className={styles.walletContainer}>
      <h2 className={styles.sectionTitle}>Wallet Overview</h2>

      <div className={styles.addressInput}>
        <input type="text" placeholder="Enter wallet address" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
        <button className={styles.connectButton}>Connect</button>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${activeTab === "assets" ? styles.active : ""}`} onClick={() => setActiveTab("assets")}>
          Assets
        </button>
        <button className={`${styles.tab} ${activeTab === "transactions" ? styles.active : ""}`} onClick={() => setActiveTab("transactions")}>
          Transactions
        </button>
        <button className={`${styles.tab} ${activeTab === "nfts" ? styles.active : ""}`} onClick={() => setActiveTab("nfts")}>
          NFTs
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "assets" && (
          <div className={styles.assetsGrid}>
            {walletData.assets.map((asset, index) => (
              <div key={index} className={styles.assetCard}>
                <div className={styles.assetSymbol}>{asset.symbol}</div>
                <div className={styles.assetBalance}>{asset.balance}</div>
                <div className={styles.assetValue}>{asset.value}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "transactions" && (
          <table className={styles.transactionsTable}>
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {walletData.transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.type}</td>
                  <td className={tx.amount.startsWith("+") ? styles.positive : styles.negative}>{tx.amount}</td>
                  <td>{tx.date}</td>
                  <td>
                    <span className={tx.status === "Completed" ? styles.completed : styles.pending}>{tx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "nfts" && (
          <div className={styles.nftsGrid}>
            {walletData.nfts.map((nft) => (
              <div key={nft.id} className={styles.nftCard}>
                <div className={styles.nftImage}></div>
                <div className={styles.nftInfo}>
                  <h4>{nft.name}</h4>
                  <p>Value: {nft.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
