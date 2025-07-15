import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { fetchSemesters } from "@/lib/api";
import { RegistrationData, Semester } from "@/types/Model.Universities";

interface PeriodSelectionProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function PeriodSelection({ data, updateData, nextStep, prevStep }: PeriodSelectionProps) {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(data.semester || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSemesters() {
      if (!data.academicPeriod) return;

      try {
        const fetchedSemesters = await fetchSemesters(data.academicPeriod.id);
        setSemesters(fetchedSemesters);
      } catch (error) {
        console.error("Failed to fetch semesters:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSemesters();
  }, [data.academicPeriod]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSemester) return;
    updateData({ semester: selectedSemester });
    nextStep();
  };

  if (loading) return <div>Loading semesters...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Academic Period Selection</h2>

      <div className="p-4 bg-blue-50 rounded">
        <h3 className="font-medium">Selected Academic Period</h3>
        <p>{data.academicPeriod?.name}</p>
        <p className="text-sm text-gray-600">
          {new Date(data.academicPeriod?.start_date || "").toLocaleDateString()} -{new Date(data.academicPeriod?.end_date || "").toLocaleDateString()}
        </p>
      </div>

      <div>
        <h3 className="font-medium mb-2">Available Semesters</h3>
        <div className="space-y-2">
          {semesters.map((semester) => (
            <div
              key={semester.id}
              className={`p-3 border rounded cursor-pointer ${selectedSemester?.id === semester.id ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"}`}
              onClick={() => setSelectedSemester(semester)}
            >
              <div className="font-medium">{semester.name}</div>
              <div className="text-sm text-gray-600">
                {new Date(semester.start_date).toLocaleDateString()} -{new Date(semester.end_date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="secondary" onClick={prevStep}>
          Back
        </Button>
        <Button type="submit" disabled={!selectedSemester}>
          Next
        </Button>
      </div>
    </form>
  );
}
