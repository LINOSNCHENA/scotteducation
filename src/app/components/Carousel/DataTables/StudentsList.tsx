"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Student } from "@/types/Model.Universities";

export default function StudentsList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("students").select("*").order("last_name", { ascending: true });

        if (error) throw error;
        setStudents(data || []);
        setCount(data?.length || 0);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div className="text-center py-8">Loading students...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Student Registry ({count})</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Personal Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    {student.last_name}, {student.first_name}
                  </div>
                  <div className="text-sm text-gray-500">ID: {student.id.substring(0, 8)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">{student.email}</div>
                  {student.phone && <div className="text-sm text-gray-500">{student.phone}</div>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.date_of_birth && <div className="text-gray-900">DOB: {new Date(student.date_of_birth).toLocaleDateString()}</div>}
                  {student.gender && <div className="text-sm text-gray-500 capitalize">{student.gender}</div>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{student.home_university_id || "Not specified"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {students.length === 0 && !loading && <div className="text-center py-8 text-gray-500">No students found in the registry</div>}
    </div>
  );
}
