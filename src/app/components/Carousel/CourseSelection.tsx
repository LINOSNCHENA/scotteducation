import { useState, useEffect } from "react";
// import Button from "../ui/button";
import { fetchCourses } from "@/lib/api";
import { RegistrationData, ICourse } from "@/types/Model.Universities";
import { Button } from "../ui/button";

interface CourseSelectionProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function CourseSelection({ data, updateData, nextStep, prevStep }: CourseSelectionProps) {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<ICourse[]>(data.courses || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      try {
        const fetchedCourses = await fetchCourses();
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  const toggleCourse = (course: ICourse) => {
    setSelectedCourses((prev) => {
      const exists = prev.some((c) => c.id === course.id);
      if (exists) {
        return prev.filter((c) => c.id !== course.id);
      } else {
        return [...prev, course];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateData({ courses: selectedCourses });
    nextStep();
  };

  if (loading) return <div>Loading courses...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Course Selection</h2>
      <p className="text-sm text-gray-600">Select the courses you want to take this semester. Current selection: {selectedCourses.length} courses</p>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {courses.map((course) => (
          <div key={course.id} className="p-3 border rounded hover:bg-gray-50">
            <label className="flex items-center space-x-3">
              <input type="checkbox" checked={selectedCourses.some((c) => c.id === course.id)} onChange={() => toggleCourse(course)} className="h-4 w-4" />
              <div>
                <span className="font-medium">
                  {course.code} - {course.title}
                </span>
                <p className="text-sm text-gray-500">{course.description}</p>
                <p className="text-sm">Credits: {course.credits}</p>
              </div>
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="secondary" onClick={prevStep}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
