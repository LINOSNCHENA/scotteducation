-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create universities table with Czech universities (must come first as it's referenced by students)
CREATE TABLE public.universities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) DEFAULT 'Czech Republic',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Czech universities
INSERT INTO public.universities (name, city) VALUES 
('Charles University', 'Prague'),
('Masaryk University', 'Brno'),
('Czech Technical University in Prague', 'Prague'),
('Palacký University Olomouc', 'Olomouc'),
('University of Ostrava', 'Ostrava'),
('University of West Bohemia', 'Pilsen'),
('Brno University of Technology', 'Brno'),
('Mendel University in Brno', 'Brno'),
('University of Chemistry and Technology, Prague', 'Prague'),
('Academy of Performing Arts in Prague', 'Prague');

-- Create academic periods table (adjusted for Czech academic year)
CREATE TABLE public.academic_periods (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    registration_deadline DATE NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert current Czech academic period
INSERT INTO public.academic_periods (name, start_date, end_date, registration_deadline, is_current)
VALUES 
('2023/2024 Academic Year', '2023-10-01', '2024-09-30', '2023-09-15', true);

-- Create semesters table (Czech system typically has winter/summer semesters)
CREATE TABLE public.semesters (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    academic_period_id UUID REFERENCES academic_periods(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    exam_period_start DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Czech-style semesters
INSERT INTO public.semesters (name, academic_period_id, start_date, end_date, exam_period_start)
VALUES 
('Winter Semester 2023/2024', 
 (SELECT id FROM academic_periods WHERE is_current = true), 
 '2023-10-01', '2024-02-10', '2024-01-15'),
('Summer Semester 2023/2024', 
 (SELECT id FROM academic_periods WHERE is_current = true), 
 '2024-02-19', '2024-06-30', '2024-05-20');

-- Create courses table (with Czech credit system - typically ECTS)
CREATE TABLE public.courses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    title_czech VARCHAR(255),
    description TEXT,
    description_czech TEXT,
    credits INTEGER NOT NULL, -- ECTS credits
    department VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample courses with Czech names
INSERT INTO public.courses (code, title, title_czech, credits, department)
VALUES
('CS101', 'Introduction to Computer Science', 'Úvod do počítačové vědy', 6, 'Computer Science'),
('MATH201', 'Advanced Mathematics', 'Pokročilá matematika', 5, 'Mathematics'),
('HIST301', 'Czech History', 'Dějiny Česka', 4, 'History'),
('ART105', 'Central European Art', 'Středoevropské umění', 3, 'Arts'),
('LANG202', 'Czech for Foreigners', 'Čeština pro cizince', 4, 'Languages');

-- Create leisure trips table (Czech destinations)
c
-- Insert Czech leisure trips
INSERT INTO public.leisure_trips (name, name_czech, destination, start_date, end_date, cost)
VALUES
('Prague Castle Tour', 'Prohlídka Pražského hradu', 'Prague', '2023-11-10', '2023-11-10', 25.00),
('Český Krumlov Excursion', 'Výlet do Českého Krumlova', 'Český Krumlov', '2024-04-15', '2024-04-17', 150.00),
('Karlštejn Castle Visit', 'Návštěva hradu Karlštejn', 'Karlštejn', '2024-05-05', '2024-05-05', 40.00),
('Bohemian Switzerland Hike', 'Výlet do Českého Švýcarska', 'Hřensko', '2024-06-10', '2024-06-12', 180.00);

-- Now create students table (after universities exists)
CREATE TABLE public.students (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    gender VARCHAR(20),
    university_id UUID REFERENCES universities(id),
    date_of_birth DATE,
    nationality VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create registrations table (after students, academic_periods, and semesters exist)
CREATE TABLE public.registrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES students(id) NOT NULL,
    academic_period_id UUID REFERENCES academic_periods(id) NOT NULL,
    semester_id UUID REFERENCES semesters(id) NOT NULL,
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) NOT NULL,
    payment_status VARCHAR(50) NOT NULL,
    total_cost DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course selections table (after registrations and courses exist)
CREATE TABLE public.course_selections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    registration_id UUID REFERENCES registrations(id) NOT NULL,
    course_id UUID REFERENCES courses(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(registration_id, course_id)
);

-- Create leisure trip selections table (after registrations and leisure_trips exist)
CREATE TABLE public.leisure_trip_selections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    registration_id UUID REFERENCES registrations(id) NOT NULL,
    leisure_trip_id UUID REFERENCES leisure_trips(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(registration_id, leisure_trip_id)
);

-- Create registration function
CREATE OR REPLACE FUNCTION public.create_registration(registration_data JSONB)
RETURNS TABLE (
    id UUID,
    student_id UUID,
    academic_period_id UUID,
    semester_id UUID,
    registration_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50),
    payment_status VARCHAR(50),
    total_cost DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE
) 
LANGUAGE plpgsql
AS $$
DECLARE
  new_registration RECORD;
  course_id UUID;
  trip_id UUID;
  total_cost DECIMAL(10, 2) DEFAULT 0;
BEGIN
  -- Vypočítat celkovou cenu z výletů
  SELECT COALESCE(SUM(cost), 0) INTO total_cost
  FROM leisure_trips
  WHERE id = ANY(
    SELECT jsonb_array_elements_text(registration_data->'leisure_trips')::UUID
  );
  
  -- Vložit hlavní záznam o registraci
  INSERT INTO public.registrations (
    student_id,
    academic_period_id,
    semester_id,
    status,
    payment_status,
    total_cost
  ) VALUES (
    (registration_data->>'student_id')::UUID,
    (registration_data->>'academic_period_id')::UUID,
    (registration_data->>'semester_id')::UUID,
    'pending',
    'unpaid',
    total_cost
  ) RETURNING 
    id,
    student_id,
    academic_period_id,
    semester_id,
    registration_date,
    status,
    payment_status,
    total_cost,
    created_at
  INTO new_registration;

  -- Vložit vybrané předměty
  FOR course_id IN SELECT jsonb_array_elements_text(registration_data->'courses')::UUID
  LOOP
    INSERT INTO course_selections (
      registration_id,
      course_id
    ) VALUES (
      new_registration.id,
      course_id
    );
  END LOOP;

  -- Vložit vybrané výlety
  FOR trip_id IN SELECT jsonb_array_elements_text(registration_data->'leisure_trips')::UUID
  LOOP
    INSERT INTO leisure_trip_selections (
      registration_id,
      leisure_trip_id
    ) VALUES (
      new_registration.id,
      trip_id
    );
  END LOOP;

  -- Vrátit nově vytvořenou registraci
  RETURN QUERY SELECT 
    new_registration.id,
    new_registration.student_id,
    new_registration.academic_period_id,
    new_registration.semester_id,
    new_registration.registration_date,
    new_registration.status,
    new_registration.payment_status,
    new_registration.total_cost,
    new_registration.created_at;
END;
$$;

-- Create indexes
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_registrations_student ON registrations(student_id);
CREATE INDEX idx_course_selections_reg ON course_selections(registration_id);
CREATE INDEX idx_leisure_trip_selections_reg ON leisure_trip_selections(registration_id);
CREATE INDEX idx_academic_periods_current ON academic_periods(is_current);
CREATE INDEX idx_courses_active ON courses(is_active);
CREATE INDEX idx_leisure_trips_active ON leisure_trips(is_active);