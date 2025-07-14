"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

type CryptoKey = "BTC" | "ETH" | "USDT" | "BNB";

const CryptoExchange = () => {
  const [action, setAction] = useState<"buy" | "sell">("buy");
  const [crypto, setCrypto] = useState<CryptoKey>("BTC");
  const [amount, setAmount] = useState("");
  const [fiatAmount, setFiatAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const cryptoOptions = [
    { value: "BTC", label: "Bitcoin" },
    { value: "ETH", label: "Ethereum" },
    { value: "USDT", label: "Tether" },
    { value: "BNB", label: "Binance Coin" },
  ];

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          const mockRates: Record<CryptoKey, number> = {
            BTC: 50000,
            ETH: 3000,
            USDT: 1,
            BNB: 400,
          };
          setExchangeRate(mockRates[crypto]);
          setLoading(false);
        }, 500);
      } catch {
        setError("Failed to fetch exchange rate");
        setLoading(false);
      }
    };
    fetchExchangeRate();
  }, [crypto]);

  useEffect(() => {
    if (amount && exchangeRate) {
      const calculated = action === "buy" ? parseFloat(amount) * exchangeRate : parseFloat(amount) * exchangeRate * 0.98;
      setFiatAmount(calculated.toFixed(2));
    } else {
      setFiatAmount("");
    }
  }, [amount, exchangeRate, action]);

  useEffect(() => {
    if (fiatAmount && exchangeRate) {
      const calculated = action === "buy" ? parseFloat(fiatAmount) / exchangeRate : (parseFloat(fiatAmount) / exchangeRate) * 0.98;
      setAmount(calculated.toFixed(8));
    } else {
      setAmount("");
    }
  }, [fiatAmount, exchangeRate, action]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!cardNumber || !cardExpiry || !cardCvv) {
      setError("Please enter all card details");
      setLoading(false);
      return;
    }

    try {
      setTimeout(() => {
        setSuccess(`${action === "buy" ? "Purchase" : "Sale"} successful! ${amount} ${crypto} ${action === "buy" ? "bought" : "sold"} for $${fiatAmount}`);
        setLoading(false);
        setAmount("");
        setFiatAmount("");
        setCardNumber("");
        setCardExpiry("");
        setCardCvv("");
      }, 1500);
    } catch (err: unknown) {
      setError("Transaction failed");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-50 p-6 md:p-12">
      {/* Left Panel */}
      <div className="md:w-1/2 flex items-center justify-center p-6">
        <div className="text-center space-y-6">
          <Image src="/images/ux_young/crypto-panel.png" alt="Crypto" width={300} height={300} />
          <h2 className="text-3xl font-bold text-gray-800">Buy & Sell Crypto Instantly</h2>
          <p className="text-gray-600">Fast, secure, and transparent crypto exchange with your card</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold text-center mb-4">{action === "buy" ? "Buy" : "Sell"} Cryptocurrency</h3>

        <div className="flex justify-center mb-4 space-x-2">
          <button className={`px-4 py-2 rounded-l ${action === "buy" ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setAction("buy")}>
            Buy
          </button>
          <button className={`px-4 py-2 rounded-r ${action === "sell" ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setAction("sell")}>
            Sell
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Cryptocurrency</label>
            <select value={crypto} onChange={(e) => setCrypto(e.target.value as CryptoKey)} className="w-full border border-gray-300 rounded px-4 py-2 mt-1" disabled={loading}>
              {cryptoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.value})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Amount in {crypto}</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
              placeholder={`0.00000000 ${crypto}`}
              disabled={loading || !exchangeRate}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Amount in USD</label>
            <input
              type="number"
              value={fiatAmount}
              onChange={(e) => setFiatAmount(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
              placeholder="0.00 USD"
              disabled={loading || !exchangeRate}
            />
          </div>

          {exchangeRate && (
            <div className="text-sm text-gray-500">
              {action === "buy" ? "Buy" : "Sell"} rate: 1 {crypto} = {exchangeRate} USD
              {action === "sell" && <span> (2% selling fee applied)</span>}
            </div>
          )}

          <div className="border-t pt-4">
            <h4 className="text-md font-medium mb-2">Card Details</h4>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, "").slice(0, 16))}
              placeholder="Card Number"
              className="w-full border border-gray-300 rounded px-4 py-2 mb-2"
              disabled={loading}
            />
            <div className="flex gap-4">
              <input
                type="text"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder="MMYY"
                className="w-1/2 border border-gray-300 rounded px-4 py-2"
                disabled={loading}
              />
              <input
                type="text"
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                placeholder="CVV"
                className="w-1/2 border border-gray-300 rounded px-4 py-2"
                disabled={loading}
              />
            </div>
            <div className="flex gap-2 mt-3">
              <Image src="/images/ux_young/1.jpg" alt="Visa" width={50} height={30} />
              <Image src="/images/ux_young/2.png" alt="Mastercard" width={50} height={30} />
            </div>
          </div>

          {error && <div className="text-red-600 bg-red-100 p-2 rounded">{error}</div>}
          {success && <div className="text-green-600 bg-green-100 p-2 rounded">{success}</div>}

          <button type="submit" disabled={loading || !amount || !fiatAmount} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
            {loading ? "Processing..." : action === "buy" ? "Buy Now" : "Sell Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CryptoExchange;
