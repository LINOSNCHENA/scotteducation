// components/HowItWorks.tsx
export function HowItWorks() {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4">How It Works</h3>
      <ol className="list-decimal list-inside space-y-2 text-gray-700">
        <li>
          Choose <strong>CARDEUR → USDT (TRC20)</strong> exchange pair.
        </li>
        <li>Enter your amount and wallet address.</li>
        <li>Pay using card or SEPA method.</li>
        <li>Receive USDT in your wallet within minutes.</li>
      </ol>
    </div>
  );
}
