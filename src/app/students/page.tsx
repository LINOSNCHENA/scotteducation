// app/students/page.tsx

import StudentsList from "../components/Carousel/DataTables/StudentsList";

export default function StudentsPage() {
  return (
    <div className="container mx-auto py-8">
      <StudentsList />
    </div>
  );
}
