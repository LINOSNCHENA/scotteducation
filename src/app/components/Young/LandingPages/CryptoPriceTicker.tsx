"use client";

import { useEffect, useState } from "react";
import styles from "./CryptoPriceTicker.module.css";

interface CryptoPrice {
  symbol: string;
  price: string;
  change: string;
}

export default function CryptoPriceTicker() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const mockData: CryptoPrice[] = [
          { symbol: "BTC", price: "$63,420.12", change: "+2.34%" },
          { symbol: "ETH", price: "$3,450.67", change: "+1.56%" },
          { symbol: "XCH", price: "$120.45", change: "-0.78%" },
          { symbol: "SOL", price: "$145.23", change: "+5.12%" },
          { symbol: "ADA", price: "$0.45", change: "-1.23%" },
        ];
        setPrices(mockData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prices:", error);
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.tickerContainer}>
      {loading ? (
        <div className={styles.loading}>Loading market data...</div>
      ) : (
        <div className={styles.ticker}>
          {prices.map((crypto, index) => (
            <div key={index} className={styles.tickerItem}>
              <span className={styles.symbol}>{crypto.symbol}</span>
              <span className={styles.price}>{crypto.price}</span>
              <span className={crypto.change.startsWith("+") ? styles.positive : styles.negative}>{crypto.change}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
