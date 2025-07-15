export interface University {
    id: string;
    name: string;
    country: string;
}

export interface Student {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    date_of_birth?: Date;
    gender?: string;
    home_university_id?: string;
}

export interface AcademicPeriod {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
    registration_deadline: string;
    is_current: boolean;
}

export interface Semester {
    id: string;
    name: string;
    academic_period_id: string;
    start_date: string;
    end_date: string;
}

export interface Course {
    id: string;
    code: string;
    title: string;
    description?: string;
    credits: number;
    department?: string;
}

export interface LeisureTrip {
    id: string;
    name: string;
    description?: string;
    destination: string;
    start_date: string;
    end_date: string;
    cost: number;
    max_participants?: number;
}

export interface RegistrationData {
    student: Partial<Student>;
    academicPeriod?: AcademicPeriod;
    semester?: Semester;
    courses: Course[];
    leisureTrips: LeisureTrip[];
}