import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { RegistrationData } from "@/types/Model.Universities";

interface RegistrationStoreState {
    loading: boolean;
    error: string | null;
    addRegistration: (registration: RegistrationData) => Promise<void>;
}

export const useRegistrationStore = create<RegistrationStoreState>((set) => ({
    loading: false,
    error: null,

    addRegistration: async (registration) => {
        set({ loading: true, error: null });

        try {
            // Validate required fields
            if (
                !registration.student.first_name ||
                !registration.student.last_name ||
                !registration.student.email ||
                !registration.student.gender
            ) {
                throw new Error("Student first name, last name, email, and gender are required");
            }

            // 1. Handle student record (upsert without updating name/email if exists)
            const { data: existingStudent, error: lookupError } = await supabase
                .from('students')
                .select('*')
                .eq('email', registration.student.email)
                .single();

            if (lookupError && lookupError.code !== 'PGRST116') { // Ignore "no rows found" error
                throw lookupError;
            }

            let studentId: string;

            if (existingStudent) {
                // Student exists - update only mutable fields
                studentId = existingStudent.id;
                const { error: updateError } = await supabase
                    .from('students')
                    .update({
                        gender: registration.student.gender,
                        phone: registration.student.phone || null,
                        date_of_birth: registration.student.date_of_birth || null,
                        university_id: registration.student.university_id || null,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', studentId);

                if (updateError) throw updateError;
            } else {
                // Student doesn't exist - insert new record
                const { data: newStudent, error: insertError } = await supabase
                    .from('students')
                    .insert({
                        first_name: registration.student.first_name,
                        last_name: registration.student.last_name,
                        email: registration.student.email,
                        gender: registration.student.gender,
                        phone: registration.student.phone || null,
                        date_of_birth: registration.student.date_of_birth || null,
                        university_id: registration.student.university_id || null
                    })
                    .select()
                    .single();

                if (insertError) throw insertError;
                studentId = newStudent.id;
            }

            // 2. Create registration record
            const { data: regData, error: regError } = await supabase
                .from("registrations")
                .insert({
                    student_id: studentId,
                    academic_period_id: registration.academicPeriod?.id || null,
                    semester_id: registration.semester?.id || null,
                    payment_status: "pending", // Add default status
                    status: "pending", // Add default status
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    total_cost: 500,
                })
                .select()
                .single();

            if (regError) throw regError;

            // 3. Insert courses in parallel
            const coursePromises = registration.courses?.length > 0
                ? supabase
                    .from("registration_courses")
                    .insert(registration.courses.map(course => ({
                        registration_id: regData.id,
                        course_id: course.id,
                    })))
                : Promise.resolve({ error: null });

            // 4. Insert trips in parallel
            const tripPromises = registration.leisureTrips?.length > 0
                ? supabase
                    .from("registration_trips")
                    .insert(registration.leisureTrips.map(trip => ({
                        registration_id: regData.id,
                        leisure_trip_id: trip.id,
                    })))
                : Promise.resolve({ error: null });

            // Wait for all inserts to complete
            const [courseResult, tripResult] = await Promise.all([coursePromises, tripPromises]);

            if (courseResult.error) throw courseResult.error;
            if (tripResult.error) throw tripResult.error;

            set({ loading: false });
        } catch (err) {
            const errorMessage = err instanceof Error
                ? err.message
                : "Failed to add registration";
            console.log(err)

            set({
                error: errorMessage,
                loading: false,
            });
            throw err;
        }
    },
}));