export interface IUniversity {
    id: string;
    name: string;
    country: string;
    img?: string;
    highlight?: string;
    ranking?: string;
}

export interface IStudent {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    date_of_birth?: string;
    gender: string;
    university_id?: string;
}

export interface IStudent {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    date_of_birth?: string;
    gender: string;
    nationality?: string;
    university_id?: string;
    universities?: { name: string };
}

export interface ICourse {
    id: string;
    code: string;
    title: string;
    description?: string;
    credits: number;
    department?: string;
}

export interface IAcademicPeriod {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
    registration_deadline: string;
    is_current: boolean;
}

export interface ISemester {
    id: string;
    name: string;
    academic_period_id: string;
    start_date: string;
    end_date: string;
}

export interface ILeisureTrip {
    id: string;
    name: string;
    description?: string;
    destination: string;
    start_date: string;
    end_date: string;
    cost: number;
    max_participants?: number;
}

export type ISupportStaff = {
    id: number;
    name: string;
    position: string;
    bio: string;
    photo: string;
    languages: string[];
};

export type ICountryInfo = {
    name: string;
    flag: string;
    advantage: string;
    popularField: string;
};

export interface RegistrationData {
    student: Partial<IStudent>;
    academicPeriod?: IAcademicPeriod;
    semester?: ISemester;
    courses: ICourse[];
    leisureTrips: ILeisureTrip[];
}

export interface IAcademicPeriod {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
    registration_deadline: string;
    is_current: boolean;
}

export interface ISemester {
    id: string;
    name: string;
    academic_period_id: string;
    start_date: string;
    end_date: string;
    exam_period_start?: string;
}

export interface ICourse {
    id: string;
    code: string;
    title: string;
    description?: string;
    credits: number;
    department?: string;
}

export interface ILeisureTrip {
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
    id: string;
    student_id: string;
    academic_period_id?: string;
    academicPeriod?: IAcademicPeriod;
    semester_id?: string;
    semester?: ISemester;
    courses: ICourse[];
    leisureTrips: ILeisureTrip[];
    status: "pending" | "approved" | "rejected";
    payment_status: "unpaid" | "paid" | "pending";
    total_cost: number;
    created_at: string;
    registration_date?: string;
}