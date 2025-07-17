"use client";

import { useEffect, useState } from "react";
import { useStudentStore } from "../api/db-stores/store.students";
import { Button, Skeleton, Badge } from "@/app/components/ui";
import { Table } from "@/app/components/ui/table";
import { StudentForm } from "./StudentForm";
import { toast } from "sonner";
import { IStudent } from "@/types/Model.Universities";
import { capitalizeFirstLetter } from "@/lib/functions";

export default function StudentsPage() {
  const { students, loading, error, fetchStudents, addStudent, deleteStudent } = useStudentStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<IStudent | null>(null);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleAddStudent = async (studentData: Omit<IStudent, "id">) => {
    try {
      await addStudent(studentData);
      setIsFormOpen(false);
      toast.success("Student added successfully!");
      fetchStudents(); // Refresh the list
    } catch (err) {
      toast.error("Failed to add student");
      console.error("Add student error:", err);
    }
  };

  const handleEditStudent = async (studentData: IStudent) => {
    try {
      await useStudentStore.getState().updateStudent(studentData.id, {
        first_name: studentData.first_name,
        last_name: studentData.last_name,
        email: studentData.email,
        phone: studentData.phone,
        date_of_birth: studentData.date_of_birth,
        university_id: studentData.university_id,
        gender: studentData.gender,
      });
      setIsFormOpen(false);
      setEditingStudent(null);
      toast.success("Student updated successfully!");
      fetchStudents(); // Refresh the list
    } catch (err) {
      toast.error("Failed to update student");
      console.error("Update student error:", err);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        toast.success("Student deleted successfully!");
        fetchStudents(); // Refresh the list
      } catch (err) {
        toast.error("Failed to delete student");
        console.error("Delete student error:", err);
      }
    }
  };

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Error loading students: {error}
        <Button onClick={fetchStudents} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Student Registry</h1>
        <Button variant="primary" onClick={() => setIsFormOpen(true)}>
          Add New Student
        </Button>
      </div>

      {/* Student Form Modal */}
      {isFormOpen && (
        <StudentForm
          onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingStudent(null);
          }}
          initialData={editingStudent}
        />
      )}

      {loading ? (
        <StudentSkeleton />
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Name</Table.Head>
                  <Table.Head>Contact</Table.Head>
                  <Table.Head>Personal Info</Table.Head>
                  <Table.Head>University</Table.Head>
                  <Table.Head>Actions</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {students.length > 0 ? (
                  students.map((student) => (
                    <Table.Row key={student.id}>
                      <Table.Cell>
                        <div className="font-medium">
                          {capitalizeFirstLetter(student.last_name)}, {capitalizeFirstLetter(student.first_name)}
                        </div>
                        <div className="text-sm text-gray-500">ID: {student.id.substring(0, 8)}</div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="text-gray-900">{capitalizeFirstLetter(student.last_name)}</div>
                        {student.phone && <div className="text-sm text-gray-500">{student.phone}</div>}
                      </Table.Cell>
                      <Table.Cell>
                        {student.date_of_birth && <div className="text-gray-900">DOB: {new Date(student.date_of_birth).toLocaleDateString()}</div>}
                        {student.gender && (
                          <Badge variant="outline" className="capitalize mt-1">
                            {student.gender}
                          </Badge>
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="text-gray-500">{student.university_id || "Not specified"}</div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex space-x-2">
                          <Button
                            variant="secondary"
                            onClick={() => {
                              setEditingStudent(student);
                              setIsFormOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button variant="primary" className="text-red-600" onClick={() => handleDeleteStudent(student.id)}>
                            Delete
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan={5} className="text-center py-8">
                      No students found
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}

function StudentSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
          <Skeleton className="h-4 w-[100px]" />
        </div>
      ))}
    </div>
  );
}
