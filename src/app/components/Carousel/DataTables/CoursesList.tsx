"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Course } from "@/types/Model.Universities";

export default function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from("courses").select("*").eq("is_active", true).order("code", { ascending: true });

      setCount(data?.length || 0);
      if (!error) setCourses(data || []);
      setLoading(false);
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="text-center py-8">Loading courses...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Available Courses ({count})</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-mono font-medium text-blue-600">{course.code}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{course.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{course.department || "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{course.credits} ECTS</span>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  <div className="line-clamp-2">{course.description || "No description available"}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {courses.length === 0 && <div className="text-center py-8 text-gray-500">No active courses found</div>}
    </div>
  );
}
