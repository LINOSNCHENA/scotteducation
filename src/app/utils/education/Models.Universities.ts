export type SupportStaff = {
  id: number;
  name: string;
  position: string;
  bio: string;
  photo: string;
  languages: string[];
};

export type University = {
  name: string;
  country: string;
  img: string;
  highlight: string;
  ranking?: string;
};

export type CountryInfo = {
  name: string;
  flag: string;
  advantage: string;
  popularField: string;
};