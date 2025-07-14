// components/PricingTable.tsx
export function PricingTable() {
  return (
    <div className="overflow-x-auto mb-10">
      <table className="min-w-full text-sm text-gray-700 border rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-4">Feature</th>
            <th className="p-4">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-4">Exchange Rate</td>
            <td className="p-4">1 USDT ≈ 1 EUR (exact rate shown before confirming)</td>
          </tr>
          <tr className="border-t">
            <td className="p-4">Supported Methods</td>
            <td className="p-4">Visa, Mastercard, SEPA, SEPA Instant</td>
          </tr>
          <tr className="border-t">
            <td className="p-4">Network</td>
            <td className="p-4">TRON (USDT TRC20) – fast, low fees</td>
          </tr>
          <tr className="border-t">
            <td className="p-4">Speed</td>
            <td className="p-4">Usually within minutes</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
