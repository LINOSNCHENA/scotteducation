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
  // const universities: University[] = [
  //   { id: "1", name: "Charles University", city: "Prague", country: "Czech Republic" },
  //   { id: "2", name: "Masaryk University", city: "Brno", country: "Czech Republic" },
  //   { id: "3", name: "Czech Technical University", city: "Prague", country: "Czech Republic" },
  //   { id: "4", name: "Palacký University", city: "Olomouc", country: "Czech Republic" },
  // ];

  // const courses: Course[] = [
  //   { id: "1", code: "CS101", title: "Introduction to Computer Science", title_czech: "Úvod do počítačové vědy", credits: 6, department: "Computer Science", universityId: "1" },
  //   { id: "2", code: "MATH201", title: "Advanced Mathematics", title_czech: "Pokročilá matematika", credits: 5, department: "Mathematics", universityId: "1" },
  //   { id: "3", code: "HIST301", title: "Czech History", title_czech: "Dějiny Česka", credits: 4, department: "History", universityId: "2" },
  //   { id: "4", code: "PHYS202", title: "Quantum Physics", title_czech: "Kvantová fyzika", credits: 7, department: "Physics", universityId: "1" },
  //   { id: "5", code: "ART105", title: "Modern Art", title_czech: "Moderní umění", credits: 3, department: "Arts", universityId: "3" },
  //   { id: "6", code: "ENG205", title: "Technical Writing", title_czech: "Technické psaní", credits: 4, department: "Languages", universityId: "2" },
  // ];

  const courses: Course[] = [
    { id: "1", code: "CS101", title: "Introduction to Computer Science", title_czech: "Úvod do počítačové vědy", credits: 6, department: "Computer Science", universityId: "1" },
    { id: "2", code: "MATH201", title: "Advanced Mathematics", title_czech: "Pokročilá matematika", credits: 5, department: "Mathematics", universityId: "1" },
    { id: "3", code: "HIST301", title: "Czech History", title_czech: "Dějiny Česka", credits: 4, department: "History", universityId: "2" },
    { id: "4", code: "ENG205", title: "Technical Writing", title_czech: "Technické psaní", credits: 4, department: "Languages", universityId: "2" },
    { id: "5", code: "ART105", title: "Modern Art", title_czech: "Moderní umění", credits: 3, department: "Arts", universityId: "3" },
    { id: "6", code: "ENG301", title: "Engineering Ethics", title_czech: "Etika v inženýrství", credits: 5, department: "Engineering", universityId: "3" },
    { id: "7", code: "BIO110", title: "General Biology", title_czech: "Obecná biologie", credits: 6, department: "Biology", universityId: "4" },
    { id: "8", code: "PHIL210", title: "Philosophy of Science", title_czech: "Filosofie vědy", credits: 4, department: "Philosophy", universityId: "4" },
    { id: "9", code: "LIT101", title: "French Literature", title_czech: "Francouzská literatura", credits: 5, department: "Literature", universityId: "5" },
    { id: "10", code: "HIST210", title: "European Intellectual History", title_czech: "Evropské intelektuální dějiny", credits: 6, department: "History", universityId: "5" },
    { id: "11", code: "MECH301", title: "Mechanical Systems", title_czech: "Mechanické systémy", credits: 6, department: "Engineering", universityId: "6" },
    { id: "12", code: "ELEC202", title: "Electrical Circuits", title_czech: "Elektrické obvody", credits: 5, department: "Electrical Engineering", universityId: "6" },
    { id: "13", code: "COMM101", title: "Media and Society", title_czech: "Média a společnost", credits: 4, department: "Communication", universityId: "7" },
    { id: "14", code: "SOC205", title: "Urban Sociology", title_czech: "Městská sociologie", credits: 5, department: "Sociology", universityId: "7" },
    { id: "15", code: "LAW101", title: "Roman Law Foundations", title_czech: "Základy římského práva", credits: 6, department: "Law", universityId: "8" },
    { id: "16", code: "PHIL101", title: "Medieval Philosophy", title_czech: "Středověká filosofie", credits: 5, department: "Philosophy", universityId: "8" },
    { id: "17", code: "MED101", title: "Human Anatomy", title_czech: "Lidská anatomie", credits: 6, department: "Medicine", universityId: "9" },
    { id: "18", code: "BIO205", title: "Cell Biology", title_czech: "Buněčná biologie", credits: 5, department: "Biology", universityId: "9" },
    {
      id: "19",
      code: "CS301",
      title: "Algorithms and Data Structures",
      title_czech: "Algoritmy a datové struktury",
      credits: 6,
      department: "Computer Science",
      universityId: "10",
    },
    { id: "20", code: "ROBO210", title: "Introduction to Robotics", title_czech: "Úvod do robotiky", credits: 5, department: "Engineering", universityId: "10" },
    { id: "21", code: "ENV101", title: "Environmental Science", title_czech: "Environmentální věda", credits: 5, department: "Environmental Studies", universityId: "11" },
    { id: "22", code: "PSY201", title: "Cognitive Psychology", title_czech: "Kognitivní psychologie", credits: 6, department: "Psychology", universityId: "11" },
    { id: "23", code: "AI101", title: "Artificial Intelligence", title_czech: "Umělá inteligence", credits: 6, department: "Computer Science", universityId: "12" },
    { id: "24", code: "MATH310", title: "Linear Algebra", title_czech: "Lineární algebra", credits: 5, department: "Mathematics", universityId: "12" },
    { id: "25", code: "DATA201", title: "Data Science Fundamentals", title_czech: "Základy datové vědy", credits: 6, department: "Data Science", universityId: "13" },
    { id: "26", code: "SYS205", title: "Systems Engineering", title_czech: "Systémové inženýrství", credits: 5, department: "Engineering", universityId: "13" },
    { id: "27", code: "LAW205", title: "Swiss Constitutional Law", title_czech: "Švýcarské ústavní právo", credits: 5, department: "Law", universityId: "14" },
    { id: "28", code: "POL301", title: "European Politics", title_czech: "Evropská politika", credits: 6, department: "Political Science", universityId: "14" },
    { id: "29", code: "MED202", title: "Public Health Systems", title_czech: "Systémy veřejného zdraví", credits: 5, department: "Medicine", universityId: "15" },
    { id: "30", code: "SOC310", title: "Social Epidemiology", title_czech: "Sociální epidemiologie", credits: 6, department: "Sociology", universityId: "15" },
    { id: "31", code: "AGRI101", title: "Agricultural Economics", title_czech: "Zemědělská ekonomika", credits: 5, department: "Agriculture", universityId: "16" },
    { id: "32", code: "BIO310", title: "Plant Biology", title_czech: "Biologie rostlin", credits: 6, department: "Biology", universityId: "16" },
    { id: "33", code: "HIST101", title: "Hungarian History", title_czech: "Maďarské dějiny", credits: 4, department: "History", universityId: "17" },
    { id: "34", code: "LIT205", title: "Central European Literature", title_czech: "Středoevropská literatura", credits: 5, department: "Literature", universityId: "17" },
    { id: "35", code: "MED310", title: "Clinical Diagnostics", title_czech: "Klinická diagnostika", credits: 6, department: "Medicine", universityId: "18" },
    { id: "36", code: "CHEM201", title: "Organic Chemistry", title_czech: "Organická chemie", credits: 5, department: "Chemistry", universityId: "18" },
    { id: "37", code: "BIO220", title: "Genetics", title_czech: "Genetika", credits: 6, department: "Biology", universityId: "19" },
    { id: "38", code: "PHYS310", title: "Thermodynamics", title_czech: "Termodynamika", credits: 5, department: "Physics", universityId: "19" },

    { id: "39", code: "THEO101", title: "Catholic Theology", title_czech: "Katolická teologie", credits: 5, department: "Theology", universityId: "20" },
    { id: "40", code: "PHIL310", title: "Ethics and Society", title_czech: "Etika a společnost", credits: 6, department: "Philosophy", universityId: "20" },
    { id: "41", code: "BUS101", title: "Business Fundamentals", title_czech: "Základy podnikání", credits: 5, department: "Business", universityId: "21" },
    { id: "42", code: "ECON201", title: "Microeconomics", title_czech: "Mikroekonomie", credits: 6, department: "Economics", universityId: "21" },
    { id: "43", code: "LAW310", title: "European Law", title_czech: "Evropské právo", credits: 6, department: "Law", universityId: "22" },
    { id: "44", code: "SOC101", title: "Introduction to Sociology", title_czech: "Úvod do sociologie", credits: 5, department: "Sociology", universityId: "22" },
    { id: "45", code: "POL101", title: "Political Theory", title_czech: "Politická teorie", credits: 5, department: "Political Science", universityId: "23" },
    { id: "46", code: "LANG201", title: "Slovak Language and Culture", title_czech: "Slovenský jazyk a kultura", credits: 4, department: "Languages", universityId: "23" },
    { id: "47", code: "ENG205", title: "Civil Engineering Basics", title_czech: "Základy stavebního inženýrství", credits: 6, department: "Engineering", universityId: "24" },
    { id: "48", code: "TECH301", title: "Applied Technology", title_czech: "Aplikovaná technologie", credits: 5, department: "Technology", universityId: "24" },
    { id: "49", code: "TRANS101", title: "Transport Systems", title_czech: "Dopravní systémy", credits: 5, department: "Transport", universityId: "25" },
    { id: "50", code: "IT201", title: "Information Systems", title_czech: "Informační systémy", credits: 6, department: "Information Technology", universityId: "25" },
    { id: "51", code: "PHIL101", title: "Introduction to Philosophy", title_czech: "Úvod do filosofie", credits: 5, department: "Philosophy", universityId: "26" },
    { id: "52", code: "LIT301", title: "German Literature", title_czech: "Německá literatura", credits: 6, department: "Literature", universityId: "26" },
    { id: "53", code: "CS205", title: "Software Engineering", title_czech: "Softwarové inženýrství", credits: 6, department: "Computer Science", universityId: "27" },
    { id: "54", code: "MATH101", title: "Calculus I", title_czech: "Kalkulus I", credits: 5, department: "Mathematics", universityId: "27" },
    { id: "55", code: "ENV205", title: "Climate Change Studies", title_czech: "Studie změny klimatu", credits: 6, department: "Environmental Studies", universityId: "28" },
    { id: "56", code: "GEOG101", title: "Physical Geography", title_czech: "Fyzická geografie", credits: 5, department: "Geography", universityId: "28" },
    { id: "57", code: "LAW101", title: "Polish Legal System", title_czech: "Polský právní systém", credits: 6, department: "Law", universityId: "29" },
    { id: "58", code: "HIST205", title: "Polish History", title_czech: "Polské dějiny", credits: 5, department: "History", universityId: "29" },
    { id: "59", code: "SCI101", title: "Scientific Method", title_czech: "Vědecká metoda", credits: 5, department: "Science", universityId: "30" },
    { id: "60", code: "PHIL205", title: "Ethics in Research", title_czech: "Etika ve výzkumu", credits: 6, department: "Philosophy", universityId: "30" },
    { id: "61", code: "TECH205", title: "Technology and Society", title_czech: "Technologie a společnost", credits: 6, department: "Technology", universityId: "31" },
    { id: "62", code: "ENG101", title: "Academic English", title_czech: "Akademická angličtina", credits: 5, department: "Languages", universityId: "31" },
    { id: "63", code: "LIT205", title: "Slovenian Literature", title_czech: "Slovinská literatura", credits: 5, department: "Literature", universityId: "32" },
    { id: "64", code: "SOC205", title: "Social Policy", title_czech: "Sociální politika", credits: 6, department: "Sociology", universityId: "32" },
    { id: "65", code: "CS101", title: "Web Development", title_czech: "Vývoj webu", credits: 6, department: "Computer Science", universityId: "33" },
    { id: "66", code: "BUS205", title: "Entrepreneurship", title_czech: "Podnikání", credits: 5, department: "Business", universityId: "33" },
    { id: "67", code: "ART101", title: "Visual Arts", title_czech: "Vizuální umění", credits: 5, department: "Arts", universityId: "34" },
    { id: "68", code: "LANG205", title: "Multilingual Communication", title_czech: "Vícejazyčná komunikace", credits: 6, department: "Languages", universityId: "34" },
  ];

  const universities: University[] = [
    // Czech Republic
    { id: "1", name: "Charles University", city: "Prague", country: "Czech Republic" },
    { id: "2", name: "Masaryk University", city: "Brno", country: "Czech Republic" },
    { id: "3", name: "Czech Technical University", city: "Prague", country: "Czech Republic" },
    { id: "4", name: "Palacký University", city: "Olomouc", country: "Czech Republic" },

    // France
    { id: "5", name: "Sorbonne University", city: "Paris", country: "France" },

    // Germany
    { id: "6", name: "Technical University of Munich", city: "Munich", country: "Germany" },

    // Netherlands
    { id: "7", name: "University of Amsterdam", city: "Amsterdam", country: "Netherlands" },

    // Italy
    { id: "8", name: "University of Bologna", city: "Bologna", country: "Italy" },

    // Sweden
    { id: "9", name: "Karolinska Institute", city: "Stockholm", country: "Sweden" },
    { id: "10", name: "KTH Royal Institute of Technology", city: "Stockholm", country: "Sweden" },
    { id: "11", name: "Lund University", city: "Lund", country: "Sweden" },

    // Switzerland
    { id: "12", name: "ETH Zurich", city: "Zurich", country: "Switzerland" },
    { id: "13", name: "EPFL Lausanne", city: "Lausanne", country: "Switzerland" },
    { id: "14", name: "University of Bern", city: "Bern", country: "Switzerland" },
    { id: "15", name: "University of Basel", city: "Basel", country: "Switzerland" },
    { id: "16", name: "University of Lausanne", city: "Lausanne", country: "Switzerland" },

    // Hungary
    { id: "17", name: "Eötvös Loránd University (ELTE)", city: "Budapest", country: "Hungary" },
    { id: "18", name: "University of Debrecen", city: "Debrecen", country: "Hungary" },
    { id: "19", name: "University of Szeged", city: "Szeged", country: "Hungary" },

    // Belgium
    { id: "20", name: "KU Leuven", city: "Leuven", country: "Belgium" },
    { id: "21", name: "Ghent University", city: "Ghent", country: "Belgium" },
    { id: "22", name: "Université catholique de Louvain (UCL)", city: "Louvain-la-Neuve", country: "Belgium" },

    // Slovakia
    { id: "23", name: "Comenius University", city: "Bratislava", country: "Slovakia" },
    { id: "24", name: "Slovak University of Technology", city: "Bratislava", country: "Slovakia" },
    { id: "25", name: "University of Žilina", city: "Žilina", country: "Slovakia" },

    // Austria
    { id: "26", name: "University of Vienna", city: "Vienna", country: "Austria" },
    { id: "27", name: "TU Wien", city: "Vienna", country: "Austria" },
    { id: "28", name: "University of Innsbruck", city: "Innsbruck", country: "Austria" },

    // Poland
    { id: "29", name: "University of Warsaw", city: "Warsaw", country: "Poland" },
    { id: "30", name: "Jagiellonian University", city: "Kraków", country: "Poland" },
    { id: "31", name: "Warsaw University of Technology", city: "Warsaw", country: "Poland" },

    // Slovenia
    { id: "32", name: "University of Ljubljana", city: "Ljubljana", country: "Slovenia" },
    { id: "33", name: "University of Maribor", city: "Maribor", country: "Slovenia" },
    { id: "34", name: "University of Primorska", city: "Koper", country: "Slovenia" },
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
