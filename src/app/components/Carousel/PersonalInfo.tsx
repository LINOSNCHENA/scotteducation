import { useState } from "react";
import { RegistrationData, University } from "@/lib/types";
import Button from "../ui/Button";

interface PersonalInfoProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  universities: University[];
  nextStep: () => void;
}

export default function PersonalInfo({ data, updateData, universities, nextStep }: PersonalInfoProps) {
  const [formData, setFormData] = useState(data.student);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateData({ student: formData });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">First Name</label>
          <input type="text" name="first_name" value={formData.first_name || ""} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block mb-1">Last Name</label>
          <input type="text" name="last_name" value={formData.last_name || ""} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
      </div>

      <div>
        <label className="block mb-1">Email</label>
        <input type="email" name="email" value={formData.email || ""} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>

      <div>
        <label className="block mb-1">Home University</label>
        <select name="home_university_id" value={formData.home_university_id || ""} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select your university</option>
          {universities.map((univ) => (
            <option key={univ.id} value={univ.id}>
              {univ.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
