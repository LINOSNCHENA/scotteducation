"use client";
import { IVisit } from "@/types/Models.subscriptions";
import { useEffect, useState } from "react";

export default function LocalVisit() {
  const [visits, setVisits] = useState<IVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const TableTitle = "Visitations | Whole records";
  const TableName = "visits_pascal";

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(TableName);
      if (raw) setVisits(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to parse visits JSON:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <section className="py-2 px-2 sm:px-6 lg:px-12 bg-gray-200">
      <div className="max-w-8xl mx-auto w-full text-black">
        <h1 className="text-base font-bold mb-2 text-center">
          {TableTitle.toUpperCase()} ({visits.length})
        </h1>
        {loading ? (
          <p>Loading…</p>
        ) : visits.length === 0 ? (
          <p>No visits logged yet.</p>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full border border-gray-300 bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">User Agent</th>
                  <th className="border px-4 py-2">IP</th>
                  <th className="border px-4 py-2">City</th>
                  <th className="border px-4 py-2">Region</th>
                  <th className="border px-4 py-2">Country</th>
                  <th className="border px-4 py-2">ASN</th>
                  <th className="border px-4 py-2">DID</th>
                  <th className="border px-4 py-2">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {visits.map((v, i) => (
                  <tr key={i}>
                    <td className="border px-4 py-2">{i}</td>
                    <td className="border px-4 py-2 text-xs break-words">{v.user_agent}</td>
                    <td className="border px-4 py-2">{v.ip}</td>
                    <td className="border px-4 py-2">{v.city}</td>
                    <td className="border px-4 py-2">{v.region}</td>
                    <td className="border px-4 py-2">{v.country}</td>
                    <td className="border px-4 py-2">{v.asn}</td>
                    <td className="border px-4 py-2">{v.device_id}</td>
                    <td className="border px-4 py-2 text-xs">{new Date(v.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
