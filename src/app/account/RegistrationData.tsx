"use client";

import React from "react";

// Define interfaces for the JSON data
interface NameField {
  name: string;
  end_date: string;
  is_current?: boolean;
  start_date: string;
  registration_deadline?: string;
  exam_period_start?: string;
}

interface AcademicPeriod {
  id: string;
  name: NameField;
  start_date: NameField;
  end_date: NameField;
  registration_deadline: NameField;
  is_current: NameField;
}

interface Semester {
  id: string;
  name: NameField;
  academic_period_id: string;
  start_date: NameField;
  end_date: NameField;
  exam_period_start: NameField;
}

interface Course {
  id?: string;
  name: string;
  // Add other course fields as needed
}

interface LeisureTrip {
  id?: string;
  name: string;
  // Add other trip fields as needed
}

interface Registration {
  id: string;
  student_id: string;
  academic_period_id: string;
  academicPeriod: AcademicPeriod;
  semester_id: string;
  semester: Semester;
  courses: Course[];
  leisureTrips: LeisureTrip[];
  status: string;
  payment_status: string;
  total_cost: number;
  created_at: string;
  registration_date: string;
}

interface AcademicRegistrationProps {
  registrations: Registration[];
}

const AcademicRegistration: React.FC<AcademicRegistrationProps> = ({ registrations }) => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto p-8 bg-gray-200 rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Academic Registration Details</h2>
        {registrations.map((registration) => (
          <div key={registration.id} className="w-full sm:w-[90%] max-w-[90%] bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:gap-6">
              {/* Left Column: Academic Period and Semester */}
              <div className="flex-1 mb-6 sm:mb-0">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Academic Information</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-medium">Academic Period:</span> {registration.academicPeriod.name.name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Period Start:</span> {new Date(registration.academicPeriod.start_date.start_date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Period End:</span> {new Date(registration.academicPeriod.end_date.end_date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Semester:</span> {registration.semester.name.name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Semester Start:</span> {new Date(registration.semester.start_date.start_date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Semester End:</span> {new Date(registration.semester.end_date.end_date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    {/* <span className="font-medium">Exam Period Start:</span> {new Date(registration.semester.exam_period_start.exam_period_start).toLocaleDateString()} */}
                  </p>
                </div>
              </div>

              {/* Right Column: Status and Dates */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Registration Details</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-medium">Status:</span>{" "}
                    <span className={`capitalize ${registration.status === "pending" ? "text-yellow-600" : "text-green-600"}`}>{registration.status}</span>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Payment Status:</span>{" "}
                    <span className={`capitalize ${registration.payment_status === "pending" ? "text-yellow-600" : "text-green-600"}`}>{registration.payment_status}</span>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Total Cost:</span> ${registration.total_cost}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Registration Date:</span> {new Date(registration.registration_date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Created At:</span> {new Date(registration.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Courses and Leisure Trips */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Courses & Leisure Trips</h3>
              <div className="flex flex-col sm:flex-row sm:gap-6">
                <div className="flex-1 mb-6 sm:mb-0">
                  <p className="text-gray-700 font-medium">Courses:</p>
                  {registration.courses.length === 0 ? (
                    <p className="text-gray-600">No courses registered.</p>
                  ) : (
                    <ul className="list-disc pl-5 text-gray-600">
                      {registration.courses.map((course, index) => (
                        <li key={course.id || index}>{course.name}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 font-medium">Leisure Trips:</p>
                  {registration.leisureTrips.length === 0 ? (
                    <p className="text-gray-600">No leisure trips registered.</p>
                  ) : (
                    <ul className="list-disc pl-5 text-gray-600">
                      {registration.leisureTrips.map((trip, index) => (
                        <li key={trip.id || index}>{trip.name}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AcademicRegistration;
