export type ISupportStaff = {
  id: number;
  name: string;
  position: string;
  bio: string;
  photo: string;
  languages: string[];
};

export type IUniversity = {
  name: string;
  country: string;
  img: string;
  highlight: string;
  ranking?: string;
};

export type ICountryInfo = {
  name: string;
  flag: string;
  advantage: string;
  popularField: string;
};

export interface IStudent {
  id: string; // UUID
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  university_id?: string; // UUID, optional if nullable
  date_of_birth?: string; // ISO format: YYYY-MM-DD
  nationality?: string;
  created_at?: string; // ISO timestamp: YYYY-MM-DDTHH:mm:ssZ
}