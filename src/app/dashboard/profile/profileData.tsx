"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Skeleton } from "@/app/components/ui";
import { toast } from "sonner";
import { fetchUser, fetchStudent, fetchStudentData } from "./dataExtraction";
import { IStudent, RegistrationData } from "@/types/Model.Universities";

interface StudentProfile {
  student: IStudent;
  registrations?: RegistrationData[];
}

interface ProfileDataProps {
  showRegistrations?: boolean;
}

export default function ProfileData({ showRegistrations = false }: ProfileDataProps) {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryLoading, setRetryLoading] = useState(false);
  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    console.log("==============|fetchProfile START|==========");
    console.log("Starting profile fetch process...");
    try {
      console.log("Setting loading states...");
      setLoading(true);
      setError(null);
      setRetryLoading(false);
      console.log("Fetching authenticated user...");
      const user = await fetchUser();
      console.log("Authenticated user:", user);
      if (!user) {
        console.log("No user found - redirecting to login...");
        router.push("/login");
        return;
      }
      console.log("Fetching student data for email:", user.email);
      const student = await fetchStudent(String(user.email));
      console.log("Student data:", student);

      let registrations: RegistrationData[] = [];
      console.log("Show registrations flag:", showRegistrations);

      if (showRegistrations) {
        console.log("Fetching registration data for student ID:", student.id);
        registrations = await fetchStudentData(student.id);
        console.log("Registration data:", registrations);
      } else {
        console.log("Skipping registration data fetch (showRegistrations is false)");
      }

      console.log("Updating profile state with student and registration data...");
      setProfile({
        student,
        registrations,
      });
      console.log("Profile state updated successfully");
    } catch (err: unknown) {
      console.error("Error in fetchProfile:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to load student profile";
      console.log("Setting error state:", errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      console.log("Cleaning up loading states...");
      setLoading(false);
      setRetryLoading(false);
      console.log("==============|fetchProfile END|==========");
    }
  }, [router, showRegistrations]);

  useEffect(() => {
    console.log("ProfileData component mounted - initiating profile fetch");
    fetchProfile();

    return () => {
      console.log("ProfileData component unmounted");
    };
  }, [fetchProfile]);

  const handleEditRegistration = (registrationId: string) => {
    router.push(`/registration/edit/${registrationId}`);
  };

  if (loading) return <ProfileDataSkeleton showRegistrations={showRegistrations} />;
  if (error) {
    return (
      <div className="p-4 text-red-500 text-center">
        {error}
        <Button
          onClick={() => {
            setRetryLoading(true);
            fetchProfile();
          }}
          className="mt-4"
          disabled={retryLoading}
        >
          {retryLoading ? "Retrying..." : "Retry"}
        </Button>
      </div>
    );
  }
  if (!profile) return <div className="p-4 text-center">No student data found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Student Profile</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">First Name</p>
              <p className="font-medium">{profile.student.first_name}</p>
            </div>
            <div>
              <p className="text-gray-600">Last Name</p>
              <p className="font-medium">{profile.student.last_name}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{profile.student.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Gender</p>
              <p className="font-medium">{profile.student.gender}</p>
            </div>
            {profile.student.phone && (
              <div>
                <p className="text-gray-600">Phone</p>
                <p className="font-medium">{profile.student.phone}</p>
              </div>
            )}
            {profile.student.date_of_birth && (
              <div>
                <p className="text-gray-600">Date of Birth</p>
                <p className="font-medium">{new Date(profile.student.date_of_birth).toLocaleDateString()}</p>
              </div>
            )}
            {profile.student.university_id && profile.student.universities?.name && (
              <div>
                <p className="text-gray-600">University</p>
                <p className="font-medium">{profile.student.universities.name}</p>
              </div>
            )}
            {profile.student.nationality && (
              <div>
                <p className="text-gray-600">Nationality</p>
                <p className="font-medium">{profile.student.nationality}</p>
              </div>
            )}
          </div>
        </div>

        {showRegistrations && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Registrations</h2>
            {profile.registrations?.length === 0 ? (
              <p className="text-gray-600">No registrations found</p>
            ) : (
              <div className="space-y-6">
                {profile.registrations?.map((reg) => (
                  <div key={reg.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Registration #{String(reg.id).substring(0, 8)}</h3>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            reg.status === "approved" ? "bg-green-100 text-green-800" : reg.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {reg.status}
                        </span>
                        <Button variant="primary" onClick={() => handleEditRegistration(reg.id)} disabled={reg.status !== "pending"}>
                          Edit
                        </Button>
                      </div>
                    </div>
                    {reg.registration_date && <p className="text-sm text-gray-600 mb-2">Registered: {new Date(reg.registration_date).toLocaleDateString()}</p>}
                    {reg.created_at && <p className="text-sm text-gray-600 mb-2">Created: {new Date(reg.created_at).toLocaleDateString()}</p>}
                    <p className="font-medium">Total Cost: ${reg.total_cost.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Payment Status: {reg.payment_status}</p>

                    {reg.academicPeriod && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Academic Period</h4>
                        <p>{reg.academicPeriod.name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(reg.academicPeriod.start_date).toLocaleDateString()} - {new Date(reg.academicPeriod.end_date).toLocaleDateString()}
                        </p>
                      </div>
                    )}

                    {reg.semester && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Semester</h4>
                        <p>{reg.semester.name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(reg.semester.start_date).toLocaleDateString()} - {new Date(reg.semester.end_date).toLocaleDateString()}
                        </p>
                        {reg.semester.exam_period_start && <p className="text-sm text-gray-600">Exam Period: {new Date(reg.semester.exam_period_start).toLocaleDateString()}</p>}
                      </div>
                    )}

                    {reg.courses.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Courses</h4>
                        <ul className="space-y-2">
                          {reg.courses.map((course) => (
                            <li key={course.id} className="text-sm">
                              {course.code} - {course.title} ({course.credits} credits)
                              {course.description && <span className="text-gray-600"> - {course.description}</span>}
                              {course.department && <span className="text-gray-600"> ({course.department})</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {reg.leisureTrips.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Leisure Trips</h4>
                        <ul className="space-y-2">
                          {reg.leisureTrips.map((trip) => (
                            <li key={trip.id} className="text-sm">
                              {trip.name} to {trip.destination} (${trip.cost.toFixed(2)})
                              <span className="text-gray-600">
                                {" "}
                                ({new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()})
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
      </div>
    </div>
  );
}

function ProfileDataSkeleton({ showRegistrations }: ProfileDataProps) {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <Skeleton className="h-8 w-48 mb-6" />

        <div className="mb-8">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-full" />
              </div>
            ))}
          </div>
        </div>

        {showRegistrations && (
          <div className="mb-8">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-4 w-48 mb-2" />
                  <Skeleton className="h-4 w-48 mb-2" />
                  <Skeleton className="h-5 w-16" />
                </div>
              ))}
            </div>
          </div>
        )}

        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
