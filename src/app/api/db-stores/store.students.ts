//
// src/stores/student.store.ts
//
import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { IStudent } from "@/app/utils/education/Models.Universities";

interface StudentStoreState {
    students: IStudent[];
    loading: boolean;
    error: string | null;
    fetchStudents: () => Promise<void>;
    addStudent: (student: Omit<IStudent, "id">) => Promise<void>;
    updateStudent: (id: string, updates: Partial<IStudent>) => Promise<void>;
    deleteStudent: (id: string) => Promise<void>;
}

export const useStudentStore = create<StudentStoreState>((set) => ({
    students: [],
    loading: false,
    error: null,

    fetchStudents: async () => {
        set({ loading: true, error: null });
        try {
            const { data, error } = await supabase
                .from("students")
                .select("*")
                .order("last_name", { ascending: true });

            if (error) throw error;

            set({ students: data || [], loading: false });
        } catch (err) {
            set({
                error: err instanceof Error ? err.message : "Failed to fetch students",
                loading: false,
            });
        }
    },

    addStudent: async (student) => {
        set({ loading: true });
        try {
            const cleanedStudent = {
                ...student,
                university_id: student.university_id || null,
                phone: student.phone || null,
                date_of_birth: student.date_of_birth || null
            };
            const { data, error } = await supabase
                .from("students")
                .insert(cleanedStudent)
                .select()
                .single();

            if (error) throw error;

            set((state) => ({
                students: [...state.students, data],
                loading: false,
            }));
        } catch (err) {
            set({
                error: err instanceof Error ? err.message : "Failed to add student",
                loading: false,
            });
        }
    },

    updateStudent: async (id, updates) => {
        set({ loading: true });
        try {
            const { data, error } = await supabase
                .from("students")
                .update(updates)
                .eq("id", id)
                .select()
                .single();

            if (error) throw error;

            set((state) => ({
                students: state.students.map((s) => (s.id === id ? data : s)),
                loading: false,
            }));
        } catch (err) {
            set({
                error: err instanceof Error ? err.message : "Failed to update student",
                loading: false,
            });
        }
    },

    deleteStudent: async (id) => {
        set({ loading: true });
        try {
            const { error } = await supabase.from("students").delete().eq("id", id);

            if (error) throw error;

            set((state) => ({
                students: state.students.filter((s) => s.id !== id),
                loading: false,
            }));
        } catch (err) {
            set({
                error: err instanceof Error ? err.message : "Failed to delete student",
                loading: false,
            });
        }
    },
}));