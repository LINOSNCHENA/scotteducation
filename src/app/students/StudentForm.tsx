// components/StudentForm.tsx
"use client";

import { Button } from "@/app/components/ui";
import { useState } from "react";
import { formatDate } from "../utils/Functions";

interface StudentData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  university_id?: string;
}

interface StudentFormProps {
  onSubmit: (studentData: StudentData) => void;
  onCancel: () => void;
}

export function StudentForm({ onSubmit, onCancel }: StudentFormProps) {
  const [formData, setFormData] = useState<StudentData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_of_birth: formatDate(new Date()),
    university_id: "",
  });

  console.log(formData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            {/* Add other fields similarly */}
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
