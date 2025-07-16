import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { IStudent, IUniversity } from "@/types/Model.Universities";

interface StudentStoreState {
    students: IStudent[];
    universities: IUniversity[];
    loading: boolean;
    error: string | null;
    fetchStudents: (options?: { page?: number; limit?: number }) => Promise<void>;
    fetchUniversities: (options?: { page?: number; limit?: number }) => Promise<void>;
    addStudent: (student: Omit<IStudent, "id">) => Promise<void>;
    updateStudent: (id: string, updates: Partial<IStudent>) => Promise<void>;
    deleteStudent: (id: string) => Promise<void>;
}

export const useStudentStore = create<StudentStoreState>((set) => ({
    students: [],
    universities: [],
    loading: false,
    error: null,

    fetchStudents: async ({ page = 1, limit = 100 } = {}) => {
        set({ loading: true, error: null });
        try {
            const { data, error } = await supabase
                .from("students")
                .select("*")
                .order("last_name", { ascending: true })
                .range((page - 1) * limit, page * limit - 1);

            if (error) throw error;

            const students: IStudent[] = data.map((item) => ({
                id: item.id,
                first_name: item.first_name || "",
                last_name: item.last_name || "",
                email: item.email || "",
                phone: item.phone || "",
                date_of_birth: item.date_of_birth || "",
                university_id: item.university_id || "",
                gender: item.gender || "",
            }));

            set({ students, loading: false });
        } catch (err) {
            set({
                error: err instanceof Error ? err.message : "Failed to fetch students",
                loading: false,
            });
        }
    },

    fetchUniversities: async ({ page = 1, limit = 100 } = {}) => {
        set({ loading: true, error: null });
        try {
            const { data, error } = await supabase
                .from("universities")
                .select("id, name, country")
                .order("name", { ascending: true })
                .range((page - 1) * limit, page * limit - 1);

            if (error) throw error;

            const universities: IUniversity[] = data.map((item) => ({
                id: item.id,
                name: item.name || "",
                country: item.country || "",
            }));

            set({ universities, loading: false });
        } catch (err) {
            set({
                error: err instanceof Error ? err.message : "Failed to fetch universities",
                loading: false,
            });
        }
    },

    addStudent: async (student) => {
        set({ loading: true, error: null });
        try {
            if (!student.first_name || !student.last_name || !student.email || !student.gender) {
                throw new Error("First name, last name, email, and gender are required");
            }

            const cleanedStudent: Omit<IStudent, "id"> = {
                first_name: student.first_name,
                last_name: student.last_name,
                email: student.email,
                gender: student.gender,
                phone: student.phone || "",
                date_of_birth: student.date_of_birth || "",
                university_id: student.university_id || "",
            };

            const { data, error } = await supabase
                .from("students")
                .insert(cleanedStudent)
                .select()
                .single();

            console.log(data, error);

            if (error) throw error;

            set((state) => ({
                students: [...state.students, data as IStudent],
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
        set({ loading: true, error: null });
        try {
            if (updates.first_name === "" || updates.last_name === "" || updates.email === "" || updates.gender === "") {
                throw new Error("First name, last name, email, and gender cannot be empty");
            }

            const { data, error } = await supabase
                .from("students")
                .update(updates)
                .eq("id", id)
                .select()
                .single();

            if (error) throw error;

            set((state) => ({
                students: state.students.map((s) => (s.id === id ? (data as IStudent) : s)),
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
        set({ loading: true, error: null });
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