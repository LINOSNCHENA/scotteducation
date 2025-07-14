"use client";
import { supabase } from "@/lib/supabase";
import { IVisit } from "@/types/Models.subscriptions";
import { useEffect, useState, useCallback } from "react";
const TableName = "visitsv2";

export default function VisitsGuests() {
  const [visits, setVisits] = useState<IVisit[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchVisits = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from(TableName).select().order("created_at", { ascending: false });
      if (error) throw error;
      setVisits(data || []);
    } catch (error) {
      console.error("Error fetching visits:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVisits();
  }, [fetchVisits]);

  return (
    <section className="py-2 px-2 sm:px-6 lg:px-12 bg-gray-200">
      <div className="max-w-8xl mx-auto w-full text-black">
        <h2 className="text-base font-bold mb-2"> Guest | Unique Visitations Database Records ({visits.length})</h2>


        <div className="flex justify-end">
          <button onClick={fetchVisits} className="px-4 py-1 mb-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition" disabled={loading}>
            {loading ? "Loading..." : "Refresh Visits"}
          </button>
        </div>

        {loading && <p>Loading visits...</p>}
        <div className="grid gap-4">
          {visits.map((visit, i) => (
            <div key={visit.ip + visit.created_at} className="p-4 bg-white rounded-lg shadow">
              <div className="flex justify-between">
                <h3 className="font-semibold">
                  ({i + 1}) {visit.city}, {visit.country}
                </h3>
                <span className="text-sm text-gray-500">{new Date(visit.created_at).toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">IP: {visit.ip}</p>
              <p className="text-sm text-gray-600">City: {visit.city}</p>
              <p className="text-sm text-gray-600 mt-1">Region: {visit.region}</p>
              <p className="text-sm text-gray-600">Country: {visit.country}</p>
              <p className="text-sm text-gray-600 truncate">ASN: {visit.asn}</p>
              <p className="text-sm text-gray-600 truncate">DID: {visit.device_id}</p>
              <p className="text-sm text-gray-600">
                Coordinates: {visit.latitude}, {visit.longitude}
              </p>
              <p className="text-sm text-gray-600 truncate">User Agent: {visit.user_agent}</p>
            </div>
          ))}
        </div>
        {visits.length === 0 && !loading && <p className="text-gray-500">No visit records found.</p>}
      </div>
    </section>
  );
}
