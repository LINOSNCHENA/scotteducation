// components/Leisure/LeisureActivitiesList.tsx

"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { LeisureTrip } from "@/types/Model.Universities";

export default function LeisureActivitiesList() {
  const [activities, setActivities] = useState<LeisureTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setSize] = useState(0);

  useEffect(() => {
    const fetchActivities = async () => {
      const { data, error } = await supabase.from("leisure_trips").select("*").eq("is_active", true).order("start_date", { ascending: true });
      setSize((data ?? []).length);
      if (error) throw error;
      if (!error) setActivities(data || []);
      setLoading(false);
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="text-center py-8">Loading activities...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Leisure Activities ({count})</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map((activity) => (
              <tr key={activity.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{activity.name}</div>
                  {activity.name && <div className="text-sm text-gray-500">{activity.name}</div>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{activity.destination}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">
                    {new Date(activity.start_date).toLocaleDateString()} - {new Date(activity.end_date).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">Registration until: {new Date(activity.start_date).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {activity.cost.toLocaleString("cs-CZ", {
                    style: "currency",
                    currency: "CZK",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">
                    {activity.name} / {activity.max_participants || "∞"}
                  </div>
                  {activity.max_participants && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(activity.cost / activity.max_participants) * 100}%` }}></div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activities.length === 0 && <div className="text-center py-8 text-gray-500">No upcoming leisure activities found</div>}
    </div>
  );
}
