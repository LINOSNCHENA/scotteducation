"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IStudent, RegistrationData } from "@/types/Model.Universities";
import { fetchUser, fetchStudent, fetchStudentData } from "../dashboard/profile/dataExtraction";
import { User } from "@supabase/supabase-js";
import { useState, useCallback, useEffect } from "react";

export default function DisplayStudent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [student, setStudent] = useState<IStudent | null>(null);
  const [user, setUser] = useState<User>();
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [registrationData, setRegistratData] = useState<RegistrationData>();

  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const userData = await fetchUser();
      if (!userData) {
        router.push("/login");
        return;
      }

      const studentData: IStudent = await fetchStudent(String(userData.email));
      setStudent(studentData);
      setUser(userData);

      const registrationData = await fetchStudentData(String(studentData.id));
      setRegistrations(registrationData);
      setRegistratData(registrationData[0]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load profile";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    const statusStyles = {
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
      paid: "bg-blue-100 text-blue-800",
    };

    return <span className={`${baseStyles} ${statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800"}`}>{status}</span>;
  };

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      {/* User Information */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <span className="mr-2">👤</span>
            User Information
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="font-medium text-gray-900">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Account Status</p>
              <StatusBadge status="verified" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Last Sign In</p>
              <p className="font-medium text-gray-900">{formatDate(String(user?.last_sign_in_at))}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Account Created</p>
              <p className="font-medium text-gray-900">{formatDate(String(user?.created_at))}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Information */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <span className="mr-2">🎓</span>
            Student Information
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              <p className="font-medium text-gray-900">
                {student?.first_name} {student?.last_name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
              <p className="font-medium text-gray-900">{formatDate(String(student?.date_of_birth))}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Gender</p>
              <p className="font-medium text-gray-900 capitalize">{student?.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Phone</p>
              <p className="font-medium text-gray-900">{student?.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">University</p>
              <p className="font-medium text-gray-900">{student?.universities?.name}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Information */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <span className="mr-2">📝</span>
            Registration Information
          </h2>
        </div>
        {JSON.stringify(registrations)}

        <div className="p-6">
          {registrations.length > 0 ? (
            registrations.map((registration) => (
              <div key={registration.id} className="mb-6 last:mb-0 pb-6 border-b last:border-b-0 border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* {JSON.stringify(registration.courses)} */}
                  {/* <div>
                    <p className="text-sm text-gray-500 mb-1">Academic Period</p>
                    <p className="font-medium text-gray-900">{registration.academicPeriod?.name || "N/A"}</p>
                  </div> */}
                  {/* <div>
                    <p className="text-sm text-gray-500 mb-1">Semester</p>
                    <p className="font-medium text-gray-900">{registration.semester?.name || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <StatusBadge status={registration.status} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Payment Status</p>
                    <StatusBadge status={registration.payment_status} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Cost</p>
                    <p className="font-medium text-gray-900">${registration.total_cost || "0"}</p>
                  </div> */}
                </div>
                {/* {registration.courses?.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-500 mb-2">Registered Courses</p>
                    <div className="flex flex-wrap gap-2">
                       {registration.courses.map((course) => (
                        <span key={course.id} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {course.name}
                        </span>
                      ))} 
                    </div>
                  </div>
                )} */}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No registration information available</p>
          )}
        </div>
      </section>
      <section />

      <section>
        <div>
          <h1>Student Registration Information</h1>
          <div></div>
          {JSON.stringify(registrationData?.total_cost)}
          ====================================================
          <h1>Student Registration Information</h1>
          {JSON.stringify(registrationData?.academicPeriod)}
          ====================================================
          <h1>Student Registration Information</h1>
          {JSON.stringify(registrationData?.courses)}
          ===================================================
          <h1>Student Registration Information</h1>
          {JSON.stringify(registrationData?.student)}
        </div>
      </section>
    </div>
  );
}
