// import { createClient } from "@supabase/supabase-js";
"use client"; // Add this line
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

// Interfaces (same as before)
export interface ICourse {
  id: string;
  code: string;
  title: string;
  description?: string;
  credits: number;
  department?: string;
}

export interface ISemester {
  id: string;
  name: string;
  academic_period_id: string;
  start_date: string;
  end_date: string;
}

export interface ILeisureTrip {
  id: string;
  name: string;
  description?: string;
  destination: string;
  start_date: string;
  end_date: string;
  cost: number;
  max_participants?: number;
}

export interface IUniversity {
  id: string;
  name: string;
  country: string;
  img?: string;
  highlight?: string;
  ranking?: string;
}

export interface IStudent {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  gender: string;
  university_id?: string;
}

export interface IAcademicPeriod {
  id: string;
  name: string;
  year: number;
}

// Type for table column definitions
type TableColumn<T> = {
  header: string;
  accessor: keyof T;
  format?: (value: T[keyof T]) => string;
};

// Union type of all possible data types
type TableData = IUniversity | IStudent | ICourse | IAcademicPeriod | ISemester | ILeisureTrip;

const DatabaseDashboard = () => {
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [academicPeriods, setAcademicPeriods] = useState<IAcademicPeriod[]>([]);
  const [semesters, setSemesters] = useState<ISemester[]>([]);
  const [leisureTrips, setLeisureTrips] = useState<ILeisureTrip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [universitiesData, studentsData, coursesData, academicPeriodsData, semestersData, leisureTripsData] = await Promise.all([
          supabase.from("universities").select("*"),
          supabase.from("students").select("*"),
          supabase.from("courses").select("*"),
          supabase.from("academic_periods").select("*"),
          supabase.from("semesters").select("*"),
          supabase.from("leisure_trips").select("*"),
        ]);

        if (universitiesData.error) throw universitiesData.error;
        if (studentsData.error) throw studentsData.error;
        if (coursesData.error) throw coursesData.error;
        if (academicPeriodsData.error) throw academicPeriodsData.error;
        if (semestersData.error) throw semestersData.error;
        if (leisureTripsData.error) throw leisureTripsData.error;

        setUniversities(universitiesData.data || []);
        setStudents(studentsData.data || []);
        setCourses(coursesData.data || []);
        setAcademicPeriods(academicPeriodsData.data || []);
        setSemesters(semestersData.data || []);
        setLeisureTrips(leisureTripsData.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );

  // Table colors with proper typing
  const tableColors = {
    universities: "bg-indigo-50 border-indigo-200",
    students: "bg-blue-50 border-blue-200",
    courses: "bg-green-50 border-green-200",
    academicPeriods: "bg-purple-50 border-purple-200",
    semesters: "bg-yellow-50 border-yellow-200",
    leisureTrips: "bg-pink-50 border-pink-200",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">University Management Dashboard</h1>
          <p className="text-gray-600">Comprehensive overview of academic data</p>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <SummaryCard title="Universities" count={universities.length} icon="🏛️" color="bg-indigo-100 text-indigo-800" />
          <SummaryCard title="Students" count={students.length} icon="👨‍🎓" color="bg-blue-100 text-blue-800" />
          <SummaryCard title="Courses" count={courses.length} icon="📚" color="bg-green-100 text-green-800" />
          <SummaryCard title="Academic Periods" count={academicPeriods.length} icon="🗓️" color="bg-purple-100 text-purple-800" />
          <SummaryCard title="Semesters" count={semesters.length} icon="📅" color="bg-yellow-100 text-yellow-800" />
          <SummaryCard title="Leisure Trips" count={leisureTrips.length} icon="✈️" color="bg-pink-100 text-pink-800" />
        </div>

        {/* Universities Table */}
        <TableSection<IUniversity>
          title="Universities"
          items={universities}
          className={tableColors.universities}
          columns={[
            { header: "ID", accessor: "id" },
            { header: "Name", accessor: "name" },
            { header: "Country", accessor: "country" },
            { header: "Ranking", accessor: "ranking", format: (value) => value || "-" },
          ]}
        />

        {/* Students Table */}
        <TableSection<IStudent>
          title="Students"
          items={students}
          className={tableColors.students}
          columns={[
            { header: "ID", accessor: "id" },
            { header: "First Name", accessor: "first_name" },
            { header: "Last Name", accessor: "last_name" },
            { header: "Email", accessor: "email" },
          ]}
        />

        {/* Courses Table */}
        <TableSection<ICourse>
          title="Courses"
          items={courses}
          className={tableColors.courses}
          columns={[
            { header: "ID", accessor: "id" },
            { header: "Code", accessor: "code" },
            { header: "Title", accessor: "title" },
            { header: "Credits", accessor: "credits" },
          ]}
        />

        {/* Academic Periods Table */}
        <TableSection<IAcademicPeriod>
          title="Academic Periods"
          items={academicPeriods}
          className={tableColors.academicPeriods}
          columns={[
            { header: "ID", accessor: "id" },
            { header: "Name", accessor: "name" },
            { header: "Year", accessor: "year" },
          ]}
        />

        {/* Semesters Table */}
        <TableSection<ISemester>
          title="Semesters"
          items={semesters}
          className={tableColors.semesters}
          columns={[
            { header: "ID", accessor: "id" },
            { header: "Name", accessor: "name" },
            { header: "Start Date", accessor: "start_date" },
            { header: "End Date", accessor: "end_date" },
          ]}
        />

        {/* Leisure Trips Table */}
        <TableSection<ILeisureTrip>
          title="Leisure Trips"
          items={leisureTrips}
          className={tableColors.leisureTrips}
          columns={[
            { header: "ID", accessor: "id" },
            { header: "Name", accessor: "name" },
            { header: "Destination", accessor: "destination" },
            { header: "Cost", accessor: "cost", format: (value) => `$${value}` },
          ]}
        />
      </div>
    </div>
  );
};

// Typed Summary Card Component
interface SummaryCardProps {
  title: string;
  count: number;
  icon: string;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, count, icon, color }) => (
  <div className={`p-6 rounded-lg shadow-sm border ${color} flex items-center justify-between`}>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-semibold">{count}</p>
    </div>
    <span className="text-3xl">{icon}</span>
  </div>
);

// Strongly typed Table Section Component
interface TableSectionProps<T extends TableData> {
  title: string;
  items: T[];
  className: string;
  columns: TableColumn<T>[];
}

const TableSection = <T extends TableData>({ title, items, className, columns }: TableSectionProps<T>) => (
  <div className={`mb-8 rounded-lg overflow-hidden border ${className}`}>
    <div className="px-6 py-4 border-b flex justify-between items-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <span className="px-3 py-1 bg-white rounded-full text-sm font-medium shadow-sm">{items.length} records</span>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, idx) => (
              <th key={idx} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.slice(0, 5).map((item, rowIdx) => (
            <tr key={rowIdx}>
              {columns.map((column, colIdx) => {
                const value = item[column.accessor];
                const formattedValue = column.format ? column.format(value) : value;

                return (
                  <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formattedValue != null ? String(formattedValue) : "-"}
                  </td>
                );
              })}
            </tr>
          ))}

          {items.length > 5 && (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                + {items.length - 5} more records...
              </td>
            </tr>
          )}
          {items.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default DatabaseDashboard;
