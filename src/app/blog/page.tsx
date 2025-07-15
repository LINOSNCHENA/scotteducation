"use client";

import { useState } from "react";
import { FiSearch, FiFilter, FiChevronDown, FiChevronUp, FiBook, FiMapPin } from "react-icons/fi";

type University = {
  id: string;
  name: string;
  city: string;
  country: string;
};

type Course = {
  id: string;
  code: string;
  title: string;
  title_czech: string;
  credits: number;
  department: string;
  universityId: string;
};

const UniversityCoursesExplorer = () => {
  // Sample static data - replace with API calls in production
  const universities: University[] = [
    { id: "1", name: "Charles University", city: "Prague", country: "Czech Republic" },
    { id: "2", name: "Masaryk University", city: "Brno", country: "Czech Republic" },
    { id: "3", name: "Czech Technical University", city: "Prague", country: "Czech Republic" },
    { id: "4", name: "Palacký University", city: "Olomouc", country: "Czech Republic" },
  ];

  const courses: Course[] = [
    { id: "1", code: "CS101", title: "Introduction to Computer Science", title_czech: "Úvod do počítačové vědy", credits: 6, department: "Computer Science", universityId: "1" },
    { id: "2", code: "MATH201", title: "Advanced Mathematics", title_czech: "Pokročilá matematika", credits: 5, department: "Mathematics", universityId: "1" },
    { id: "3", code: "HIST301", title: "Czech History", title_czech: "Dějiny Česka", credits: 4, department: "History", universityId: "2" },
    { id: "4", code: "PHYS202", title: "Quantum Physics", title_czech: "Kvantová fyzika", credits: 7, department: "Physics", universityId: "1" },
    { id: "5", code: "ART105", title: "Modern Art", title_czech: "Moderní umění", credits: 3, department: "Arts", universityId: "3" },
    { id: "6", code: "ENG205", title: "Technical Writing", title_czech: "Technické psaní", credits: 4, department: "Languages", universityId: "2" },
  ];

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [expandedUniversity, setExpandedUniversity] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  // Get unique departments for filter dropdown
  const departments = ["all", ...new Set(courses.map((course) => course.department))];

  // Filter courses based on search term and selected department
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.title_czech.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = selectedDepartment === "all" || course.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  // Group filtered courses by university
  const universityCoursesMap = filteredCourses.reduce(
    (acc, course) => {
      if (!acc[course.universityId]) {
        acc[course.universityId] = [];
      }
      acc[course.universityId].push(course);
      return acc;
    },
    {} as Record<string, Course[]>
  );

  // Toggle university expansion
  const toggleUniversity = (universityId: string) => {
    setExpandedUniversity(expandedUniversity === universityId ? null : universityId);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2">University Courses Explorer</h1>
        <p className="text-gray-600">Browse courses offered by universities in Czech Republic</p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses by code, name..."
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Department Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center justify-between px-4 py-3 w-full md:w-48 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <span className="flex items-center">
                <FiFilter className="mr-2 text-gray-500" />
                {selectedDepartment === "all" ? "All Departments" : selectedDepartment}
              </span>
              {filterOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            {filterOpen && (
              <div className="absolute z-10 mt-1 w-full md:w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      setSelectedDepartment(dept);
                      setFilterOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-indigo-50 ${selectedDepartment === dept ? "bg-indigo-100 text-indigo-800" : "text-gray-700"}`}
                  >
                    {dept === "all" ? "All Departments" : dept}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Universities List */}
      <div className="space-y-4">
        {universities.map((university) => (
          <div key={university.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* University Header */}
            <button onClick={() => toggleUniversity(university.id)} className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition-colors">
              <div className="text-left">
                <h2 className="text-xl font-semibold text-gray-800">{university.name}</h2>
                <div className="flex items-center text-gray-500 mt-1">
                  <FiMapPin className="mr-1" />
                  <span>
                    {university.city}, {university.country}
                  </span>
                </div>
              </div>
              {expandedUniversity === university.id ? <FiChevronUp className="text-gray-500 text-xl" /> : <FiChevronDown className="text-gray-500 text-xl" />}
            </button>

            {/* Courses List (shown when university is expanded) */}
            {expandedUniversity === university.id && (
              <div className="border-t border-gray-200 p-6">
                {universityCoursesMap[university.id]?.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {universityCoursesMap[university.id].map((course) => (
                      <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start">
                          <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                            <FiBook className="text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">{course.title}</h3>
                            <p className="text-sm text-gray-500">{course.title_czech}</p>
                            <div className="mt-2 flex justify-between items-center">
                              <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded">{course.code}</span>
                              <span className="text-xs text-gray-500">{course.credits} ECTS</span>
                            </div>
                            <div className="mt-2">
                              <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded">{course.department}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No courses found matching your criteria</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversityCoursesExplorer;
