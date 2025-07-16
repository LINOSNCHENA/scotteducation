// 
// Data
//

import { IUniversity, IAcademicPeriod, ISemester, ICourse, ILeisureTrip, RegistrationData } from '@/types/Model.Universities';
import { supabase } from './supabase';

// API Functions 
export async function fetchUniversities(): Promise<IUniversity[]> {
    const { data, error } = await supabase
        .from('universities')
        .select('*');

    if (error) throw new Error(error.message);
    return data;
}

export async function fetchCurrentPeriod(): Promise<IAcademicPeriod> {
    const { data, error } = await supabase
        .from('academic_periods')
        .select('*')
        .eq('is_current', true)
        .limit(1)
        .single();

    if (error) throw new Error(error.message);
    return data;
}

export async function fetchSemesters(periodId: string): Promise<ISemester[]> {
    const { data, error } = await supabase
        .from('semesters')
        .select('*')
        .eq('academic_period_id', periodId);

    if (error) throw new Error(error.message);
    return data;
}

export async function fetchCourses(): Promise<ICourse[]> {
    const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_active', true);

    if (error) throw new Error(error.message);
    return data;
}

export async function fetchLeisureTrips(): Promise<ILeisureTrip[]> {
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