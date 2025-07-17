// import { createClient } from "@supabase/supabase-js";

"use client"; // Add this line

import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

// Initialize Supabase client
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
// const supabase = createClient(supabaseUrl, supabaseKey);

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

const DatabaseTables = () => {
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

        // Fetch all tables in parallel
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

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="database-tables-container">
      <h1>University Management System</h1>

      {/* Universities Table */}
      <div className="table-container">
        <h2>Universities</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Country</th>
              <th>Highlight</th>
              <th>Ranking</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((university) => (
              <tr key={university.id}>
                <td>{university.id}</td>
                <td>{university.name}</td>
                <td>{university.country}</td>
                <td>{university.highlight || "-"}</td>
                <td>{university.ranking || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Students Table */}
      <div className="table-container">
        <h2>Students</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>University ID</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
                <td>{student.email}</td>
                <td>{student.university_id || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Courses Table */}
      <div className="table-container">
        <h2>Courses</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Title</th>
              <th>Credits</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.code}</td>
                <td>{course.title}</td>
                <td>{course.credits}</td>
                <td>{course.department || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Academic Periods Table */}
      <div className="table-container">
        <h2>Academic Periods</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {academicPeriods.map((period) => (
              <tr key={period.id}>
                <td>{period.id}</td>
                <td>{period.name}</td>
                <td>{period.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Semesters Table */}
      <div className="table-container">
        <h2>Semesters</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Academic Period ID</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {semesters.map((semester) => (
              <tr key={semester.id}>
                <td>{semester.id}</td>
                <td>{semester.name}</td>
                <td>{semester.academic_period_id}</td>
                <td>{semester.start_date}</td>
                <td>{semester.end_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leisure Trips Table */}
      <div className="table-container">
        <h2>Leisure Trips</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Destination</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {leisureTrips.map((trip) => (
              <tr key={trip.id}>
                <td>{trip.id}</td>
                <td>{trip.name}</td>
                <td>{trip.destination}</td>
                <td>{trip.start_date}</td>
                <td>{trip.end_date}</td>
                <td>${trip.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DatabaseTables;
