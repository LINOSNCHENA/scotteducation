// 
// Data
//

import { University, AcademicPeriod, Semester, Course, LeisureTrip, RegistrationData } from '@/types/Model.Universities';
import { supabase } from './supabase';

// API Functions 
export async function fetchUniversities(): Promise<University[]> {
    const { data, error } = await supabase
        .from('universities')
        .select('*');

    if (error) throw new Error(error.message);
    return data;
}

export async function fetchCurrentPeriod(): Promise<AcademicPeriod> {
    const { data, error } = await supabase
        .from('academic_periods')
        .select('*')
        .eq('is_current', true)
        .limit(1)
        .single();

    if (error) throw new Error(error.message);
    return data;
}

export async function fetchSemesters(periodId: string): Promise<Semester[]> {
    const { data, error } = await supabase
        .from('semesters')
        .select('*')
        .eq('academic_period_id', periodId);

    if (error) throw new Error(error.message);
    return data;
}

export async function fetchCourses(): Promise<Course[]> {
    const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_active', true);

    if (error) throw new Error(error.message);
    return data;
}

export async function fetchLeisureTrips(): Promise<LeisureTrip[]> {
    const { data, error } = await supabase
        .from('leisure_trips')
        .select('*')
        .eq('is_active', true);

    if (error) throw new Error(error.message);
    return data;
}

export async function submitRegistration(registrationData: {
    student_id: string;
    academic_period_id: string;
    semester_id: string;
    courses: string[];
    leisure_trips: string[];
    total_cost: number;
}): Promise<RegistrationData> {
    // Start a transaction
    const { data, error } = await supabase
        .rpc('create_registration', {
            registration_data: registrationData
        });

    if (error) throw new Error(error.message);
    return data;
}