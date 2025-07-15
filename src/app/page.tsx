"use client";

import Image from "next/image";
import { Button } from "./components/Pascal/RoutingPages/P4PostOfficer/ui/button";
import { COMP_COPYRIGHT } from "./utils/Branding/DataPascal";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between p-10 md:p-20">
        <div className="max-w-xl">
          <h1 className="text-5xl font-extrabold text-blue-800 mb-6 leading-tight">
            Study at Any University in the <span className="text-red-600">Czech Republic</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Begin your journey in the heart of Europe. Whether you&apos;re interested in technology, medicine, business, or arts, we are here to help you select the right
            university and guide you through each step of the process.
          </p>
          <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg rounded-full shadow-lg">Get Started Now</Button>
        </div>
        <div className="mt-10 md:mt-0">
          <Image src="/images/ux_pascal/1.jpg" alt="Czech University" width={500} height={350} className="rounded-xl shadow-xl" />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 px-8 md:px-24 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-10">Why Work With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-6 bg-blue-50 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2 text-red-600">1-on-1 Guidance</h3>
            <p className="text-gray-600">Personalized consultation from application to arrival, ensuring you never feel lost.</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2 text-red-600">University Matching</h3>
            <p className="text-gray-600">We help you choose the best-fit university based on your program, budget, and career path.</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2 text-red-600">Post-Arrival Support</h3>
            <p className="text-gray-600">Assistance with accommodation, insurance, student card, and integration into student life.</p>
          </div>
        </div>
      </section>

      {/* Featured Universities */}
      <section className="py-20 bg-blue-100 px-6 md:px-24">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">Top 3 Universities in Czechia</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { name: "Charles University", city: "Prague", img: "/images/ux_pascal/2.png" },
            { name: "Czech Technical University", city: "Prague", img: "/images/ux_pascal/1.jpg" },
            { name: "Masaryk University", city: "Brno", img: "/images/ux_pascal/3.png" },
          ].map((u) => (
            <div key={u.name} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <Image src={u.img} alt={u.name} width={400} height={200} className="rounded-lg mb-4 object-cover h-48 w-full" />
              <h3 className="text-xl font-semibold text-blue-800">{u.name}</h3>
              <p className="text-gray-600">{u.city}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="bg-white py-20 px-6 md:px-24">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">Hear from Our Students</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <blockquote className="bg-gray-100 p-6 rounded-xl shadow">
            <p className="text-gray-700 italic">
              “Thanks to this team, I got admitted to Masaryk University. They were with me throughout the visa process and even helped me find my flat in Brno.”
            </p>
            <div className="mt-4 font-semibold text-blue-800">— Amina, Kenya</div>
          </blockquote>
          <blockquote className="bg-gray-100 p-6 rounded-xl shadow">
            <p className="text-gray-700 italic">
              “I felt supported from day one. They helped me apply to CTU and explained every step in detail. Definitely recommend to any international student.”
            </p>
            <div className="mt-4 font-semibold text-blue-800">— Daniel, Ghana</div>
          </blockquote>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-blue-50 py-20 px-6 md:px-24">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-8 max-w-3xl mx-auto text-gray-800">
          <div>
            <h4 className="font-semibold text-lg text-red-600">What documents are needed to apply?</h4>
            <p className="mt-2">Typically your high school diploma, passport copy, motivation letter, and English proficiency.</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-red-600">Do I need to speak Czech?</h4>
            <p className="mt-2">No! Many programs are in English. We help you apply for the right one.</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-red-600">Is education free?</h4>
            <p className="mt-2">
              Public universities in Czech offer low or even free tuition in Czech. English programs cost more, but are affordable compared to other European countries.
            </p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="bg-red-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Let’s Make Your Czech Dream Real</h2>
        <p className="mb-8 text-lg">With our help, you can be part of one of the most international student communities in Europe.</p>
        <Button className="bg-white text-red-600 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-gray-100">Select Your University</Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center p-6 text-sm text-gray-600">{COMP_COPYRIGHT}</footer>
    </div>
  );
}
