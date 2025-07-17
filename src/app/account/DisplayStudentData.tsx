import { RegistrationData } from "@/types/Model.Universities";
import { Button } from "@/app/components/ui";
import { useRouter } from "next/navigation";

interface DisplayStudentDataProps {
  registrations?: RegistrationData[];
}

export default function DisplayStudentData({ registrations }: DisplayStudentDataProps) {
//   const router = useRouter();

  if (!registrations || registrations.length === 0) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Your Registrations</h2>
        <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-lg">No registrations found</div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Your Registrations</h2>
      <div className="space-y-4">
        {registrations.map((reg) => (
          <RegistrationCard key={reg.id} registration={reg} />
        ))}
      </div>
    </section>
  );
}

function RegistrationCard({ registration: reg }: { registration: RegistrationData }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/registration/edit/${reg.id}`);
  };

  const formatDateRange = (startDate?: string, endDate?: string) => {
    if (!startDate || !endDate) return undefined;
    try {
      return `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`;
    } catch (e) {
      console.error("Invalid date format", e);
      return undefined;
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-start">
        <h3 className="font-medium">Registration #{String(reg.id).substring(0, 8)}</h3>
        <div className="flex items-center gap-2">
          <StatusBadge status={reg.status} />
          <Button variant="primary" onClick={handleEdit} disabled={reg.status !== "pending"}>
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        {reg.registration_date && (
          <div>
            <span className="text-gray-500">Registered: </span>
            {new Date(reg.registration_date).toLocaleDateString()}
          </div>
        )}
        <div>
          <span className="text-gray-500">Total Cost: </span>
          <span className="font-medium">${reg.total_cost.toFixed(2)}</span>
        </div>
        <div>
          <span className="text-gray-500">Payment Status: </span>
          {reg.payment_status}
        </div>
      </div>

      {reg.semester && (
        <DetailSection
          title="Semester"
          items={
            [
              reg.semester.name,
              formatDateRange(reg.semester.start_date, reg.semester.end_date),
              reg.semester.exam_period_start && `Exam Period: ${new Date(reg.semester.exam_period_start).toLocaleDateString()}`,
            ].filter(Boolean) as string[]
          }
        />
      )}

      {reg.courses.length > 0 && (
        <DetailSection
          title="Courses"
          isList={true}
          items={reg.courses.map(
            (course) =>
              `${course.code} - ${course.title} (${course.credits} credits)` +
              (course.description ? ` - ${course.description}` : "") +
              (course.department ? ` (${course.department})` : "")
          )}
        />
      )}

      {reg.leisureTrips.length > 0 && (
        <DetailSection
          title="Leisure Trips"
          isList={true}
          items={reg.leisureTrips.map(
            (trip) =>
              `${trip.name} to ${trip.destination} ($${trip.cost.toFixed(2)}) ` +
              `(${new Date(trip.start_date).toLocaleDateString()} - ${new Date(trip.end_date).toLocaleDateString()})`
          )}
        />
      )}
    </div>
  );
}

function DetailSection({ title, items, isList = false }: { title: string; items: (string | undefined)[]; isList?: boolean }) {
  const filteredItems = items.filter(Boolean);
  if (filteredItems.length === 0) return null;

  return (
    <div className="pt-2 space-y-1">
      <h4 className="font-medium text-gray-800">{title}</h4>
      {isList ? (
        <ul className="space-y-1 text-sm">
          {filteredItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ) : (
        <div className="space-y-1 text-sm">
          {filteredItems.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusClasses = {
    approved: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
    default: "bg-gray-100 text-gray-800",
  };

  const className = statusClasses[status as keyof typeof statusClasses] || statusClasses.default;

  return <span className={`px-2 py-1 rounded text-xs ${className}`}>{status}</span>;
}
