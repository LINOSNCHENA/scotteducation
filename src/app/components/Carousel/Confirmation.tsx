import { RegistrationData } from "@/types/Model.Universities";
import Link from "next/link";
import { Button } from "../ui";
import { toast } from "sonner";
import { useRegistrationStore } from "@/app/api/db-stores/store.registrations";

interface ConfirmationProps {
  data: RegistrationData;
  prevStep: () => void; // Added to allow going back to previous step
}

export default function Confirmation({ data, prevStep }: ConfirmationProps) {
  const { addRegistration, loading, error } = useRegistrationStore();

  const handleSubmit = async () => {
    try {
      console.log(data);
      await addRegistration(data);
      toast.success("Registration submitted successfully!");
    } catch (err) {
      toast.error(error || "Failed to submit registration");
      console.log(err);
    }
  };

  return (
    <div className="space-y-6 text-center">
      <div className="bg-green-100 text-green-800 p-4 rounded-lg">
        <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h2 className="text-xl font-semibold">Registration Summary</h2>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="space-y-4 text-left max-w-md mx-auto">
        <div>
          <h3 className="font-medium">Confirmation Number</h3>
          <p className="font-mono bg-gray-100 p-2 rounded">REG-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
        </div>

        <div>
          <h3 className="font-medium">Student Details</h3>
          <p>
            Name: {data.student.first_name || "N/A"} {data.student.last_name || "N/A"}
          </p>
          <p>Email: {data.student.email || "N/A"}</p>
          {data.student.phone && <p>Phone: {data.student.phone}</p>}
          {data.student.date_of_birth && <p>DOB: {new Date(data.student.date_of_birth).toLocaleDateString()}</p>}
          <p>Gender: {data.student.gender || "N/A"}</p>
          {data.student.university_id && <p>University ID: {data.student.university_id}</p>}
        </div>

        {data.academicPeriod && (
          <div>
            <h3 className="font-medium">Academic Period</h3>
            <p>
              {data.academicPeriod.name} ({new Date(data.academicPeriod.start_date).toLocaleDateString()} - {new Date(data.academicPeriod.end_date).toLocaleDateString()})
            </p>
            <p>Registration Deadline: {new Date(data.academicPeriod.registration_deadline).toLocaleDateString()}</p>
            <p>Current: {data.academicPeriod.is_current ? "Yes" : "No"}</p>
          </div>
        )}

        {data.semester && (
          <div>
            <h3 className="font-medium">Semester</h3>
            <p>
              {data.semester.name} ({new Date(data.semester.start_date).toLocaleDateString()} - {new Date(data.semester.end_date).toLocaleDateString()})
            </p>
          </div>
        )}

        {data.courses.length > 0 ? (
          <div>
            <h3 className="font-medium">Selected Courses</h3>
            <ul className="list-disc pl-5 space-y-1">
              {data.courses.map((course) => (
                <li key={course.id}>
                  {course.code} - {course.title} ({course.credits} credits)
                  {course.description && <span className="text-sm text-gray-500"> - {course.description}</span>}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h3 className="font-medium">Selected Courses</h3>
            <p className="text-gray-500">No courses selected</p>
          </div>
        )}

        {data.leisureTrips.length > 0 ? (
          <div>
            <h3 className="font-medium">Selected Leisure Trips</h3>
            <ul className="list-disc pl-5 space-y-1">
              {data.leisureTrips.map((trip) => (
                <li key={trip.id}>
                  {trip.name} to {trip.destination} (${trip.cost})
                  <span className="text-sm text-gray-500">
                    {" "}
                    ({new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()})
                  </span>
                  {trip.description && <span className="text-sm text-gray-500"> - {trip.description}</span>}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h3 className="font-medium">Selected Leisure Trips</h3>
            <p className="text-gray-500">No leisure trips selected</p>
          </div>
        )}

        <div>
          <h3 className="font-medium">Next Steps</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>You will receive a confirmation email shortly</li>
            <li>Payment instructions will be sent within 24 hours</li>
            <li>Contact the international office if you have questions</li>
          </ul>
        </div>
      </div>

      <div className="pt-4 flex justify-center space-x-4">
        <Button type="button" variant="secondary" onClick={prevStep} disabled={loading}>
          Back
        </Button>
        <Button type="button" onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Confirm and Submit"}
        </Button>
        <Link href="/">
          <Button variant="secondary" disabled={loading}>
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
