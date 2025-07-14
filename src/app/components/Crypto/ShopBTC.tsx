"use client";

import React, { useState, useEffect } from "react";
// import axios from "axios";
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
    <div className="crypto-exchange">
      <h2>{action === "buy" ? "Buy" : "Sell"} Cryptocurrency</h2>

      <div className="toggle-buttons">
        <button className={action === "buy" ? "active" : ""} onClick={() => setAction("buy")}>
          Buy Crypto
        </button>
        <button className={action === "sell" ? "active" : ""} onClick={() => setAction("sell")}>
          Sell Crypto
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Cryptocurrency</label>
          <select value={crypto} onChange={(e) => setCrypto(e.target.value as CryptoKey)} disabled={loading}>
            {cryptoOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.value})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Amount in {crypto}</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={`0.00000000 ${crypto}`} disabled={loading || !exchangeRate} />
        </div>

        <div className="form-group">
          <label>Amount in USD</label>
          <input type="number" value={fiatAmount} onChange={(e) => setFiatAmount(e.target.value)} placeholder="0.00 USD" disabled={loading || !exchangeRate} />
        </div>

        {exchangeRate && (
          <div className="rate-info">
            {action === "buy" ? "Buy" : "Sell"} rate: 1 {crypto} = {exchangeRate} USD
            {action === "sell" && <span> (2% selling fee applied)</span>}
          </div>
        )}

        <div className="card-details">
          <h3>Card Details</h3>

          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, "").slice(0, 16))}
              placeholder="1234 5678 9012 3456"
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input type="text" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="MMYY" disabled={loading} />
            </div>

            <div className="form-group">
              <label>CVV</label>
              <input type="text" value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))} placeholder="123" disabled={loading} />
            </div>
          </div>

          <div className="card-logos">
            <Image src="/visa-logo.png" alt="Visa" width={50} height={30} />
            <Image src="/mastercard-logo.png" alt="Mastercard" width={50} height={30} />
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button type="submit" disabled={loading || !amount || !fiatAmount} className="submit-button">
          {loading ? "Processing..." : action === "buy" ? "Buy Now" : "Sell Now"}
        </button>
      </form>

      <style jsx>{`
        .crypto-exchange {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          border-radius: 10px;
          background: #f8f9fa;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 20px;
        }

        .toggle-buttons {
          display: flex;
          margin-bottom: 20px;
        }

        .toggle-buttons button {
          flex: 1;
          padding: 10px;
          border: none;
          background: #e9ecef;
          color: #495057;
          cursor: pointer;
          font-weight: bold;
        }

        .toggle-buttons button.active {
          background: #007bff;
          color: white;
        }

        .toggle-buttons button:first-child {
          border-radius: 5px 0 0 5px;
        }

        .toggle-buttons button:last-child {
          border-radius: 0 5px 5px 0;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-row {
          display: flex;
          gap: 15px;
        }

        .form-row .form-group {
          flex: 1;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
          color: #495057;
        }

        input,
        select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 16px;
        }

        .rate-info {
          margin: 10px 0;
          font-size: 14px;
          color: #6c757d;
        }

        .card-details {
          margin: 25px 0;
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .card-details h3 {
          margin-top: 0;
          margin-bottom: 15px;
          color: #333;
        }

        .card-logos {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .card-logos img {
          height: 30px;
        }

        .submit-button {
          width: 100%;
          padding: 12px;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.2s;
        }

        .submit-button:hover {
          background: #218838;
        }

        .submit-button:disabled {
          background: #6c757d;
          cursor: not-allowed;
        }

        .error-message {
          color: #dc3545;
          margin: 10px 0;
          padding: 10px;
          background: #f8d7da;
          border-radius: 4px;
        }

        .success-message {
          color: #155724;
          margin: 10px 0;
          padding: 10px;
          background: #d4edda;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default CryptoExchange;
