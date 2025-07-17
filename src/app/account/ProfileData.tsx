"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IStudent, RegistrationData } from "@/types/Model.Universities";
import { fetchUser, fetchStudent, fetchStudentData } from "../dashboard/profile/dataExtraction";
// import DisplayUser from "./DisplayUser";
import DisplayStudent from "./DisplayStudent";
import DisplayStudentData from "./DisplayStudentData";
import DisplayUser from "./DisplayUser";
import { Button, Skeleton } from "../components/ui";

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
  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const user = await fetchUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const student = await fetchStudent(String(user.email));
      let registrations: RegistrationData[] = [];

      if (showRegistrations) {
        registrations = await fetchStudentData(student.id);
      }

      setProfile({ student, registrations });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load profile";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [router, showRegistrations]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) return <ProfileDataSkeleton showRegistrations={showRegistrations} />;
  if (error) return <ErrorState error={error} onRetry={fetchProfile} />;
  if (!profile) return <EmptyState message="No student data found" />;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6 space-y-8">
        <DisplayUser />
        <DisplayStudent student={profile.student} />
        {showRegistrations && <DisplayStudentData registrations={profile.registrations} />}
        <FooterSection router={router} />
      </div>
    </div>
  );
}

function FooterSection({ router }: { router: { push: (path: string) => void } }) {
  return (
    <div className="pt-4 border-t">
      <Button onClick={() => router.push("/dashboard")} variant="primary" className="w-full sm:w-auto">
        ← Back to Dashboard
      </Button>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-lg">{message}</div>;
}

function ErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="p-4 text-center space-y-2">
      <p className="text-red-500">{error}</p>
      <Button onClick={onRetry} variant="primary">
        Try Again
      </Button>
    </div>
  );
}

function ProfileDataSkeleton({ showRegistrations }: ProfileDataProps) {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6 space-y-8">
        <Skeleton className="h-8 w-48" />

        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-full" />
              </div>
            ))}
          </div>
        </div>

        {showRegistrations && (
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <Skeleton className="h-4 w-32" />
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
