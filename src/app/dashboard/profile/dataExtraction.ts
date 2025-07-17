import { supabase } from "@/lib/supabase";
import { IStudent, RegistrationData } from "@/types/Model.Universities";

// Fetch authenticated user
export const fetchUser = async () => {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);
    if (!user) throw new Error("No authenticated user found");
    return user;
};

// Fetch student by email
export const fetchStudentxxxw = async (email: string): Promise<IStudent> => {
    const { data, error } = await supabase
        .from("students")
        // .select("*, universities(name)")
        .select("*")
        .eq("email", email)
        .single();
    console.log(data);
    console.log("============|Student|===========");

    if (error) throw new Error(error.message);
    if (!data) throw new Error("Student not found");
    return data;
};

export const fetchStudent = async (email: string): Promise<IStudent> => {
    const { data, error } = await supabase
        .from("students")
        .select("*, universities(name)")
        .eq("email", email)
        .single();

    if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message.includes("JSON object requested")
            ? `Student not found with email: ${email}`
            : error.message);
    }

    if (!data) {
        throw new Error("Student data is null");
    }

    return data;
};

// Fetch registrations, courses, and trips for a student
export const fetchStudentData = async (studentId: string): Promise<RegistrationData[]> => {
    // Fetch registrations
    const { data: regData, error: regError } = await supabase
        .from("registrations")
        .select(`
            id,
            student_id,
            academic_period_id,
            semester_id,
            status,
            payment_status,
            total_cost,
            created_at,
            registration_date,
            academic_period:academic_periods(
                name, 
                start_date, 
                end_date, 
                registration_deadline, 
                is_current
            ),
            semester:semesters(
                name, 
                start_date, 
                end_date, 
                exam_period_start
            )
        `)
        .eq("student_id", studentId)
        .order("created_at", { ascending: false });
    console.log(regData);
    console.log("============|regData|===========");

    if (regError) throw new Error(regError.message);
    if (!regData) return [];

    // Process each registration
    const registrationPromises = regData.map(async (reg) => {
        try {
            // Fetch courses in parallel
            const coursesPromise = supabase
                .from("course_selections")
                .select("courses(id, code, title, description, credits, department)")
                .eq("registration_id", reg.id);

            // Fetch trips in parallel
            const tripsPromise = supabase
                .from("leisure_trip_selections")
                .select("leisure_trips(id, name, description, destination, start_date, end_date, cost, max_participants)")
                .eq("registration_id", reg.id);

            // Wait for both requests to complete
            const [{ data: coursesData, error: coursesError }, { data: tripsData, error: tripsError }] =
                await Promise.all([coursesPromise, tripsPromise]);

            if (coursesError) throw coursesError;
            if (tripsError) throw tripsError;

            // Transform the data
            const courses = coursesData?.flatMap((item) => item.courses) || [];
            const trips = tripsData?.flatMap((item) => item.leisure_trips) || [];

            return {
                id: reg.id,
                student_id: reg.student_id,
                academic_period_id: reg.academic_period_id,
                academicPeriod: reg.academic_period ? {
                    id: reg.academic_period_id,
                    name: reg.academic_period,
                    start_date: reg.academic_period,
                    end_date: reg.academic_period,
                    registration_deadline: reg.academic_period,
                    is_current: reg.academic_period,
                } : undefined,
                semester_id: reg.semester_id,
                semester: reg.semester ? {
                    id: reg.semester_id,
                    name: reg.semester,
                    academic_period_id: reg.academic_period_id,
                    start_date: reg.semester,
                    end_date: reg.semester,
                    exam_period_start: reg.semester,
                } : undefined,
                courses,
                leisureTrips: trips,
                status: reg.status || "pending",
                payment_status: reg.payment_status || "unpaid",
                total_cost: reg.total_cost || 0,
                created_at: reg.created_at,
                registration_date: reg.registration_date,
            } as RegistrationData;
        } catch (error) {
            console.error(`Error processing registration ${reg.id}:`, error);
            return null;
        }
    });

    const registrationResults = await Promise.all(registrationPromises);
    return registrationResults.filter((reg): reg is RegistrationData => reg !== null);
};