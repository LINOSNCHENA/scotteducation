"use client";

import { Button } from "@/app/components/ui";
import { IStudent, IUniversity } from "@/types/Model.Universities";
import { useState, useEffect } from "react";
import { useStudentStore } from "../api/db-stores/store.students";

interface StudentFormProps {
  onSubmit: (studentData: IStudent) => void;
  onCancel: () => void;
  initialData?: IStudent | null;
}

export function StudentForm({ onSubmit, onCancel, initialData }: StudentFormProps) {
  const { universities, fetchUniversities, loading, error } = useStudentStore();
  const [formData, setFormData] = useState<IStudent>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    university_id: "",
    gender: "",
    id: "",
  });

  useEffect(() => {
    fetchUniversities(); // Fetch universities when the component mounts
  }, [fetchUniversities]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        first_name: initialData.first_name || "",
        last_name: initialData.last_name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        date_of_birth: initialData.date_of_birth || "",
        university_id: initialData.university_id || "",
        gender: initialData.gender || "",
        id: initialData.id || "",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.gender) {
      alert("Please select a gender.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{initialData ? "Edit Student" : "Add New Student"}</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {loading && <div className="text-gray-500 mb-4">Loading universities...</div>}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input id="first_name" type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input id="last_name" type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone
              </label>
              <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" pattern="[0-9]{10,15}" />
            </div>
            <div>
              <label htmlFor="date_of_birth" className="block text-sm font-medium mb-1">
                Date of Birth
              </label>
              <input id="date_of_birth" type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label htmlFor="university_id" className="block text-sm font-medium mb-1">
                University
              </label>
              <select id="university_id" name="university_id" value={formData.university_id} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="" disabled>
                  Select a university
                </option>
                {universities.map((university: IUniversity) => (
                  <option key={university.id} value={university.id}>
                    {university.name} ({university.country})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium mb-1">
                Gender
              </label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded" required>
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {initialData ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
