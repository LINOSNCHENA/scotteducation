import { IStudent } from "@/types/Model.Universities";

interface DisplayStudentProps {
  student: IStudent;
}

export default function DisplayStudent({ student }: DisplayStudentProps) {
  const infoFields = [
    { label: "First Name", value: student.first_name },
    { label: "Last Name", value: student.last_name },
    { label: "Email", value: student.email },
    { label: "Gender", value: student.gender },
    {
      label: "Phone",
      value: student.phone,
      condition: !!student.phone,
    },
    {
      label: "Date of Birth",
      value: student.date_of_birth ? new Date(student.date_of_birth).toLocaleDateString() : undefined,
      condition: !!student.date_of_birth,
    },
    {
      label: "University",
      value: student.universities?.name,
      condition: !!student.university_id && !!student.universities?.name,
    },
    {
      label: "Nationality",
      value: student.nationality,
      condition: !!student.nationality,
    },
  ];

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {infoFields.map((field, index) =>
          field.condition !== false && field.value ? (
            <div key={index} className="space-y-1">
              <p className="text-sm text-gray-500">{field.label}</p>
              <p className="font-medium text-gray-800">{field.value}</p>
            </div>
          ) : null
        )}
      </div>
    </section>
  );
}
