import { ISupportStaff } from "@/types/Model.Universities";

export const mockStaff: ISupportStaff[] = [
    {
        id: 1,
        name: "Pascal Bassey",
        position: "Student Success Specialist",
        bio: "8+ years helping students navigate university applications across Europe. Fluent in 5 EU languages.",
        photo: "/images/ux_pascal/staff/1.jpg",
        languages: ["English", "French", "Spanish", "Italian"],
    },
    {
        id: 2,
        name: "Sabina Bassey",
        position: "Visa & Accommodation Coordinator",
        bio: "Expert in EU student visa requirements and finding perfect student housing in 15+ countries.",
        photo: "/images/ux_pascal/staff/2.jpg",
        languages: ["English", "Czech", "Polish", "Russian"],
    },
    {
        id: 3,
        name: "Sophie Pascal",
        position: "Scholarship Advisor",
        bio: "Helped secure over €2M in scholarships for international students in the past 3 years.",
        photo: "/images/ux_pascal/staff/3.jpg",
        languages: ["English", "German", "Dutch"],
    },
];