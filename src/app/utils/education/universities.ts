//
// Data sources
//

import { IUniversity, ICountryInfo} from "@/types/Model.Universities";

export const universities: IUniversity[] = [
    {
        name: "Sorbonne University",
        country: "France",
        img: "/images/ux_pascal/1.jpg",
        highlight: "Ranked #1 in Europe for Humanities",
        ranking: "QS World #90",
        id: '',
    },
    {
        name: "Technical University of Munich",
        country: "Germany",
        img: "/images/ux_pascal/2.jpg",
        highlight: "Top 5 worldwide for Engineering",
        ranking: "QS World #50",
        id: '',
    },
    {
        name: "Charles University",
        country: "Czech Republic",
        img: "/images/ux_pascal/3.jpg",
        highlight: "Founded 1348 - oldest in Central Europe",
        ranking: "QS World #300",
        id: '',
    },
    {
        name: "University of Amsterdam",
        country: "Netherlands",
        img: "/images/ux_pascal/4.jpg",
        highlight: "Top 10 globally for Communication Studies",
        ranking: "QS World #58",
        id: '',
    },
    {
        name: "University of Bologna",
        country: "Italy",
        img: "/images/ux_pascal/5.jpg",
        highlight: "World's oldest university (founded 1088)",
        ranking: "QS World #154",
        id: '',
    },
    {
        name: "Karolinska Institute",
        country: "Sweden",
        img: "/images/ux_pascal/6.jpg",
        highlight: "Nobel Prize in Physiology or Medicine",
        ranking: "QS World #10 (Medicine)",
        id: '',
    },
];

export const countries: ICountryInfo[] = [
    {
        name: "Germany",
        flag: "🇩🇪",
        advantage: "No tuition at public universities",
        popularField: "Engineering & Technology",
    },
    {
        name: "France",
        flag: "🇫🇷",
        advantage: "Low tuition (€170-€600/year)",
        popularField: "Business & Arts",
    },
    {
        name: "Netherlands",
        flag: "🇳🇱",
        advantage: "2000+ English programs",
        popularField: "Social Sciences",
    },
    {
        name: "Sweden",
        flag: "🇸🇪",
        advantage: "Innovation-focused education",
        popularField: "Environmental Science",
    },
    {
        name: "Italy",
        flag: "🇮🇹",
        advantage: "Rich cultural heritage",
        popularField: "Architecture & Design",
    },
    {
        name: "Czech Republic",
        flag: "🇨🇿",
        advantage: "Low cost of living",
        popularField: "Medicine & IT",
    },
];

