"use client";

import { useEffect, useState } from "react";
import { useStudentStore } from "../api/db-stores/store.students";
import { Button, Skeleton, Badge } from "@/app/components/ui";
import { Table } from "@/app/components/ui/table";
import { StudentForm } from "./StudentForm";
import { IStudent } from "../utils/education/Models.Universities";
import { toast } from "sonner";

export default function StudentsPage() {
  const { students, loading, error, fetchStudents, addStudent } = useStudentStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  console.log(students);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleAddStudent = async (studentData: Omit<IStudent, "id">) => {
    try {
      console.log(studentData);
      await addStudent(studentData);
      setIsFormOpen(false);
      toast.success("Student added successfully!");
      fetchStudents(); // Refresh the list
    } catch (err) {
      toast.error("Failed to add student");
      console.error("Add student error:", err);
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
      {isFormOpen && <StudentForm onSubmit={handleAddStudent} onCancel={() => setIsFormOpen(false)} />}

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
                          {student.last_name}, {student.first_name}
                        </div>
                        <div className="text-sm text-gray-500">ID: {student.id.substring(0, 8)}</div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="text-gray-900">{student.email}</div>
                        {student.phone && <div className="text-sm text-gray-500">{student.phone}</div>}
                      </Table.Cell>
                      <Table.Cell>
                        {student.date_of_birth && <div className="text-gray-900">DOB: {new Date(student.date_of_birth).toLocaleDateString()}</div>}
                        {student.first_name && (
                          <Badge variant="outline" className="capitalize mt-1">
                            {student.last_name}
                          </Badge>
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="text-gray-500">{student.university_id || "Not specified"}</div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex space-x-2">
                          <Button variant="secondary">Edit</Button>
                          <Button variant="primary" className="text-red-600">
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
