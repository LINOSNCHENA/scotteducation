"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { COMP_COPYRIGHT } from "@/app/utils/Branding/DataYoung";
import { Button } from "antd";

// Employee data type
type Employee = {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo: string;
};

export default function LandingPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch employees from Supabase
  useEffect(() => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("employees").select("*").eq("department", "student_support");

        if (error) throw error;
        setEmployees(data || []);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white">
      {/* Hero Section (Updated for EU) */}
      <section className="flex flex-col md:flex-row items-center justify-between p-10 md:p-20">
        <div className="max-w-xl">
          <h1 className="text-5xl font-extrabold text-blue-800 mb-6 leading-tight">
            Study at Top Universities Across the <span className="text-yellow-500">European Union</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            From Prague to Paris, Berlin to Barcelona—we help you navigate admissions, visas, and settling into student life in the EU. Personalized guidance for every step.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-full shadow-lg">Explore EU Universities</Button>
        </div>
        <div className="mt-10 md:mt-0">
          <Image src="/images/ux_pascal/eu-students.jpg" alt="EU Students" width={500} height={350} className="rounded-xl shadow-xl" />
        </div>
      </section>

      {/* Meet Your Advisors */}
      <section className="bg-white py-16 px-8 md:px-24 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-10">Meet Your Support Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {loading ? (
            <p>Loading team...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            employees.map((emp) => (
              <div key={emp.id} className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition">
                <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-white shadow">
                  <Image src={emp.photo} alt={emp.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-blue-800">{emp.name}</h3>
                <p className="text-red-600 mb-2">{emp.role}</p>
                <p className="text-gray-600">{emp.bio}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Why Choose EU (Updated) */}
      <section className="bg-blue-100 py-16 px-8 md:px-24 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-10">Why Study in the EU?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: "Low/No Tuition", desc: "Many EU countries offer free or affordable education for international students.", icon: "💶" },
            { title: "Work While Studying", desc: "Student visas often allow part-time work up to 20 hours/week.", icon: "🛠️" },
            { title: "Travel Schengen Zone", desc: "Explore 26+ countries with a single student visa.", icon: "✈️" },
          ].map((item) => (
            <div key={item.title} className="p-6 bg-white rounded-xl shadow">
              <span className="text-3xl mb-3 block">{item.icon}</span>

              <h3 className="text-xl font-semibold mb-2 text-blue-800">{item.title}</h3>

              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top EU Universities (Updated) */}
      <section className="py-20 bg-white px-6 md:px-24">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">Top Universities in the EU</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { name: "Sorbonne University", country: "France", img: "/images/ux_pascal/sorbonne.jpg" },
            { name: "Technical University of Munich", country: "Germany", img: "/images/ux_pascal/tum.jpg" },
            { name: "University of Bologna", country: "Italy", img: "/images/ux_pascal/bologna.jpg" },
          ].map((uni) => (
            <div key={uni.name} className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <Image src={uni.img} alt={uni.name} width={400} height={200} className="rounded-lg mb-4 object-cover h-48 w-full" />
              <h3 className="text-xl font-semibold text-blue-800">{uni.name}</h3>
              <p className="text-gray-600">{uni.country}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer (unchanged) */}
      <footer className="bg-gray-100 text-center p-6 text-sm text-gray-600">{COMP_COPYRIGHT}</footer>
    </div>
  );
}
