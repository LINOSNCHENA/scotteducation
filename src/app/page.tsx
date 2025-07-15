"use client";

import Image from "next/image";
import { Button } from "./components/Pascal/RoutingPages/P4PostOfficer/ui/button";
import { COMP_COPYRIGHT } from "./utils/Branding/DataPascal";
import { useEffect, useState } from "react";
import { COMP_MOBILE } from "./utils/Branding/DataYoung";

type SupportStaff = {
  id: number;
  name: string;
  position: string;
  bio: string;
  photo: string;
  languages: string[];
};

type University = {
  name: string;
  country: string;
  img: string;
  highlight: string;
  ranking?: string;
};

type CountryInfo = {
  name: string;
  flag: string;
  advantage: string;
  popularField: string;
};

export default function LandingPage() {
  const [staff, setStaff] = useState<SupportStaff[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("undergraduate");

  const universities: University[] = [
    {
      name: "Sorbonne University",
      country: "France",
      img: "/images/ux_pascal/1.jpg",
      highlight: "Ranked #1 in Europe for Humanities",
      ranking: "QS World #90",
    },
    {
      name: "Technical University of Munich",
      country: "Germany",
      img: "/images/ux_pascal/2.jpg",
      highlight: "Top 5 worldwide for Engineering",
      ranking: "QS World #50",
    },
    {
      name: "Charles University",
      country: "Czech Republic",
      img: "/images/ux_pascal/3.jpg",
      highlight: "Founded 1348 - oldest in Central Europe",
      ranking: "QS World #300",
    },
    {
      name: "University of Amsterdam",
      country: "Netherlands",
      img: "/images/ux_pascal/4.jpg",
      highlight: "Top 10 globally for Communication Studies",
      ranking: "QS World #58",
    },
    {
      name: "University of Bologna",
      country: "Italy",
      img: "/images/ux_pascal/5.jpg",
      highlight: "World's oldest university (founded 1088)",
      ranking: "QS World #154",
    },
    {
      name: "Karolinska Institute",
      country: "Sweden",
      img: "/images/ux_pascal/6.jpg",
      highlight: "Nobel Prize in Physiology or Medicine",
      ranking: "QS World #10 (Medicine)",
    },
  ];

  const countries: CountryInfo[] = [
    {
      name: "Germany",
      flag: "🇩🇪",
      advantage: "No tuition at public universities",
      popularField: "Engineering & Technology",
    },
    {
      name: "France",
      flag: "🇫🇷",
      advantage: "Low tuition (€170-€600/year)",
      popularField: "Business & Arts",
    },
    {
      name: "Netherlands",
      flag: "🇳🇱",
      advantage: "2000+ English programs",
      popularField: "Social Sciences",
    },
    {
      name: "Sweden",
      flag: "🇸🇪",
      advantage: "Innovation-focused education",
      popularField: "Environmental Science",
    },
    {
      name: "Italy",
      flag: "🇮🇹",
      advantage: "Rich cultural heritage",
      popularField: "Architecture & Design",
    },
    {
      name: "Czech Republic",
      flag: "🇨🇿",
      advantage: "Low cost of living",
      popularField: "Medicine & IT",
    },
  ];

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        const mockStaff: SupportStaff[] = [
          {
            id: 1,
            name: "Elena Petrova",
            position: "EU Admissions Specialist",
            bio: "10+ years helping students navigate university applications across Europe. Fluent in 5 EU languages.",
            photo: "/images/ux_pascal/21.jpg",
            languages: ["English", "French", "Spanish", "Italian"],
          },
          {
            id: 2,
            name: "Jakub Novák",
            position: "Visa & Accommodation Coordinator",
            bio: "Expert in EU student visa requirements and finding perfect student housing in 15+ countries.",
            photo: "/images/ux_pascal/21.jpg",
            languages: ["English", "Czech", "Polish", "Russian"],
          },
          {
            id: 3,
            name: "Sophie Müller",
            position: "Scholarship Advisor",
            bio: "Helped secure over €2M in scholarships for international students in the past 3 years.",
            photo: "/images/ux_pascal/22.jpg",
            languages: ["English", "German", "Dutch"],
          },
        ];
        setStaff(mockStaff);
      } catch (error) {
        console.error("Error fetching staff:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-400">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between p-10 md:p-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Study at Europe&apos;s <span className="text-yellow-300">Top Universities</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8">Complete guidance for international students across 27 EU countries - from application to graduation and beyond.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-4 text-lg font-bold rounded-full shadow-lg">Free Eligibility Check</Button>
            <Button className="bg-transparent border-2 border-white hover:bg-blue-700 text-white px-8 py-4 text-lg font-bold rounded-full shadow-lg">Meet Our Advisors</Button>
          </div>
          <div className="mt-8 flex items-center space-x-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-blue-400 border-2 border-blue-600"></div>
              ))}
            </div>
            <p className="text-blue-200">Trusted by 12,000+ students since 2015</p>
          </div>
        </div>
        <div className="mt-10 md:mt-0 relative">
          <Image src="/images/ux_pascal/1.jpg" alt="International students in Europe" width={600} height={400} className="rounded-xl shadow-2xl border-4 border-white" />
          <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg">
            <p className="font-bold text-blue-800">100+</p>
            <p className="text-sm">Partner Universities</p>
          </div>
        </div>
      </section>

      {/* University Partners */}
      <section className="py-16 bg-blue-400 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Partner Universities</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
            {[
              "/images/ux_pascal/6.jpg",
              "/images/ux_pascal/3.jpg",
              "/images/ux_pascal/4.jpg",
              "/images/ux_pascal/5.jpg",
              "/images/ux_pascal/6.jpg",
              "/images/ux_pascal/4.jpg",
              "/images/ux_pascal/7.jpg",
              "/images/ux_pascal/6.jpg",
              "/images/ux_pascal/3.jpg",
              "/images/ux_pascal/3.jpg",
              "/images/ux_pascal/4.jpg",
              "/images/ux_pascal/4.jpg",
            ].map((logo, i) => (
              <div key={i} className="flex justify-center p-4 hover:scale-105 transition-transform">
                <Image src={logo} alt="University logo" width={120} height={80} className="object-contain h-12" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Tabs */}
      <section className="py-16 bg-blue-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Find Your Perfect Program</h2>
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-full bg-white p-1 shadow">
              {["undergraduate", "graduate", "phd", "exchange"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === tab ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { field: "Engineering", countries: ["Germany", "Sweden", "Netherlands"] },
              { field: "Business", countries: ["France", "Italy", "Spain"] },
              { field: "Medicine", countries: ["Czech Republic", "Hungary", "Poland"] },
            ].map((program, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                <h3 className="text-xl font-bold mb-4 text-blue-800">{program.field}</h3>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Top countries for this field:</p>
                  <div className="flex flex-wrap gap-2">
                    {program.countries.map((country) => (
                      <span key={country} className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {["Admission requirements", "Tuition range", "Career prospects"].map((item, j) => (
                    <li key={j} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Explore {program.field} Programs</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Team Section */}
      <section className="py-20 bg-blue-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Your Dedicated Support Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Meet our multilingual experts who will guide you through every step of your European education journey.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {staff.map((person) => (
              <div key={person.id} className="bg-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md mb-6">
                    <Image src={person.photo} alt={person.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-800">{person.name}</h3>
                  <p className="text-red-600 font-medium mb-4">{person.position}</p>
                  <p className="text-gray-700 mb-6">{person.bio}</p>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Speaks:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {person.languages.map((lang) => (
                        <span key={lang} className="bg-white px-3 py-1 rounded-full text-sm shadow">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Country Comparison */}
      <section className="py-20 bg-blue-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Compare EU Countries</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.map((country, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{country.flag}</span>
                  <h3 className="text-2xl font-bold text-blue-800">{country.name}</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Biggest Advantage:</p>
                    <p className="font-medium">{country.advantage}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Popular Field:</p>
                    <p className="font-medium">{country.popularField}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Average Tuition:</p>
                    <p className="font-medium">
                      {country.name === "Germany"
                        ? "€0-€500/semester"
                        : country.name === "France"
                          ? "€170-€600/year"
                          : country.name === "Sweden"
                            ? "€8,000-€15,000/year"
                            : "€2,000-€12,000/year"}
                    </p>
                  </div>
                </div>
                <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700">View {country.name} Universities</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* University Showcase */}
      <section className="py-20 bg-blue-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Featured European Universities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover some of our most popular partner institutions across Europe</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {universities.map((uni) => (
              <div key={uni.name} className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl overflow-hidden transition">
                <div className="relative h-48">
                  <Image src={uni.img} alt={uni.name} fill className="object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">{uni.name}</h3>
                    <p className="text-blue-200">{uni.country}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500">QS World Ranking</p>
                      <p className="font-medium">{uni.ranking}</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">Featured</span>
                  </div>
                  <p className="text-gray-700 mb-6">{uni.highlight}</p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>English programs available</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Scholarship opportunities</span>
                    </div>
                  </div>
                  <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700">View Programs</Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button className="bg-blue-300 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg">View All 100+ Universities</Button>
          </div>
        </div>
      </section>

      {/* Application Timeline */}
      <section className="py-20 bg-blue-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Your Application Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 h-full w-0.5 bg-blue-300 transform -translate-x-1/2"></div>

            {[
              { step: 1, title: "Free Consultation", description: "We assess your profile and recommend suitable universities", time: "Day 1" },
              { step: 2, title: "Document Preparation", description: "We help gather and prepare all required documents", time: "1-2 Weeks" },
              { step: 3, title: "University Application", description: "We submit applications to your chosen programs", time: "Varies" },
              { step: 4, title: "Admission Decision", description: "Receive and review your acceptance letters", time: "4-8 Weeks" },
              { step: 5, title: "Visa Process", description: "We guide you through the student visa application", time: "4-6 Weeks" },
              { step: 6, title: "Pre-Departure", description: "Accommodation, orientation, and travel preparation", time: "2-4 Weeks" },
            ].map((item, i) => (
              <div key={i} className={`mb-12 flex ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"} items-center`}>
                <div className={`w-1/2 px-8 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                  <p className="text-sm text-blue-600 font-medium">{item.time}</p>
                  <h3 className="text-xl font-bold text-blue-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-600 border-4 border-white flex items-center justify-center text-white font-bold relative z-10 mx-auto">
                  {item.step}
                </div>
                <div className="w-1/2 px-8"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-blue-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Hear from students who achieved their European education dreams with our help</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Jelita Mulenga",
                country: "Zambia",
                university: "University of Amsterdam",
                quote: "The scholarship guidance was invaluable - I received a full tuition waiver!",
                photo: "/images/ux_pascal/6.jpg",
              },
              {
                name: "Carlos Mendoza",
                country: "Mexico",
                university: "Technical University of Munich",
                quote: "From zero German to accepted at TUM in just 8 months with their prep program.",
                photo: "/images/ux_pascal/3.jpg",
              },
              {
                name: "Priya Patel",
                country: "India",
                university: "Sorbonne University",
                quote: "They handled everything from applications to finding my Paris apartment.",
                photo: "/images/ux_pascal/4.jpg",
              },
            ].map((student, i) => (
              <div key={i} className="bg-blue-50 p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image src={student.photo} alt={student.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-800">{student.name}</h4>
                    <p className="text-sm text-gray-600">
                      {student.country} → {student.university}
                    </p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic pl-2 border-l-4 border-blue-600">&quot;{student.quote}&quot;</blockquote>
                <div className="mt-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarship Info */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">EU Scholarship Opportunities</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">We&apos;ve helped students secure over €3.5 million in scholarships and grants across European universities.</p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { name: "Erasmus+", amount: "Up to €30,000", for: "Exchange students" },
              { name: "Eiffel Excellence", amount: "€1,181/month", for: "Master's/PhD in France" },
              { name: "DAAD", amount: "Full tuition + stipend", for: "Study in Germany" },
            ].map((scholarship, i) => (
              <div key={i} className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <h3 className="text-2xl font-bold mb-2">{scholarship.name}</h3>
                <p className="text-xl font-medium mb-1">{scholarship.amount}</p>
                <p className="text-blue-200">{scholarship.for}</p>
              </div>
            ))}
          </div>

          <Button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-4 text-lg font-bold rounded-full shadow-lg">Check Scholarship Eligibility</Button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Begin Your European Education Journey?</h2>
          <p className="text-xl text-gray-600 mb-10">Take the first step today with our free consultation and university matching service.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-bold rounded-full shadow-lg">Book Free Consultation</Button>
            <Button className="bg-blue-200 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-bold rounded-full shadow-lg">
              Download EU Study Guide
            </Button>
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-xl inline-flex items-center">
            <svg className="h-8 w-8 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <div className="text-left">
              <p className="text-sm text-gray-500">Need immediate help?</p>
              <p className="font-bold text-blue-800">{COMP_MOBILE}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">European Study Advisors</h3>
              <p className="text-gray-400">Helping international students navigate higher education in Europe since 2015.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    University Matching
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Application Assistance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Visa Guidance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Scholarship Help
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Countries</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Germany
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    France
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Netherlands
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Czech Republic
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Prague, Czech Republic</li>
                <li>{COMP_MOBILE}</li>
                <li>{loading}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">{COMP_COPYRIGHT} | All Rights Reserved</div>
        </div>
      </footer>
    </div>
  );
}
