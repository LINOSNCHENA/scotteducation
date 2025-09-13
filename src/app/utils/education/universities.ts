//
// Data sources
//

import { IUniversity } from "@/types/Model.Universities";

export const universitiesLogos =
    [
        "/images/ux_pascal/logos/1.jpg",
        "/images/ux_pascal/logos/1.png",
        "/images/ux_pascal/logos/2.png",
        "/images/ux_pascal/logos/2.svg",

        "/images/ux_pascal/logos/3.gif",
        "/images/ux_pascal/logos/4.png",
        "/images/ux_pascal/logos/5.png",
        "/images/ux_pascal/logos/6.jpg",

        "/images/ux_pascal/logos/7.jpg",
        "/images/ux_pascal/logos/8.jpg",
        "/images/ux_pascal/logos/9.gif",
        "/images/ux_pascal/logos/10.png"
    ]


const dataLocation = '/images/ux_pascal/universities';
export const universities: IUniversity[] = [
    // France
    { id: "1", name: "Sorbonne University", country: "France", img: dataLocation + "/1.jpg", highlight: "Ranked #1 in Europe for Humanities", ranking: "QS World #90" },

    // Germany
    { id: "2", name: "Technical University of Munich", country: "Germany", img: dataLocation + "/1.png", highlight: "Top 5 worldwide for Engineering", ranking: "QS World #50" },

    // Czech Republic
    { id: "3", name: "Charles University", country: "Czech Republic", img: dataLocation + "/2.png", highlight: "Founded 1348 - oldest in Central Europe", ranking: "QS World #300" },

    // Netherlands
    { id: "4", name: "University of Amsterdam", country: "Netherlands", img: dataLocation + "/2.jpg", highlight: "Top 10 globally for Communication Studies", ranking: "QS World #58" },

    // Italy
    { id: "5", name: "University of Bologna", country: "Italy", img: dataLocation + "/3.gif", highlight: "World's oldest university (founded 1088)", ranking: "QS World #154" },

    // Sweden
    { id: "6", name: "Karolinska Institute", country: "Sweden", img: dataLocation + "/5.png", highlight: "Nobel Prize in Physiology or Medicine", ranking: "QS World #10 (Medicine)" },
    { id: "7", name: "KTH Royal Institute of Technology", country: "Sweden", img: dataLocation + "/1.jpg", highlight: "Top-ranked for engineering and tech", ranking: "QS World #73" },
    { id: "8", name: "Lund University", country: "Sweden", img: dataLocation + "/6.jpg", highlight: "Founded 1666 – strong in humanities and sciences", ranking: "QS World #85" },

    // Switzerland
    { id: "9", name: "ETH Zurich", country: "Switzerland", img: dataLocation + "/6.webp", highlight: "Ranked ~11 globally", ranking: "QS World #11" },
    { id: "10", name: "EPFL Lausanne", country: "Switzerland", img: dataLocation + "/7.jpg", highlight: "École Polytechnique Fédérale de Lausanne", ranking: "QS World #32" },
    { id: "11", name: "University of Bern", country: "Switzerland", img: dataLocation + "/8.jpg", highlight: "Top 150 globally", ranking: "QS World #104" },
    { id: "12", name: "University of Basel", country: "Switzerland", img: dataLocation + "/9.gif", highlight: "Founded 1460", ranking: "QS World #126" },
    { id: "13", name: "University of Lausanne", country: "Switzerland", img: dataLocation + "/10.png", highlight: "QS World #134", ranking: "QS World #134" },

    // Hungary
    { id: "14", name: "Eötvös Loránd University (ELTE)", country: "Hungary", img: dataLocation + "/10.png", highlight: "Founded 1635 – Budapest’s largest and most prestigious", ranking: "QS World #601–650" },
    { id: "15", name: "University of Debrecen", country: "Hungary", img: dataLocation + "/11.jpg", highlight: "Strong in medicine and sciences", ranking: "QS World #701–750" },
    { id: "16", name: "University of Szeged", country: "Hungary", img: dataLocation + "/1.jpg", highlight: "Top research university in southern Hungary", ranking: "QS World #601–650" },

    // Belgium
    { id: "17", name: "KU Leuven", country: "Belgium", img: dataLocation + "/1.jpg", highlight: "Belgium’s highest ranked university", ranking: "QS World #76" },
    { id: "18", name: "Ghent University", country: "Belgium", img: dataLocation + "/1.png", highlight: "Strong in life sciences and engineering", ranking: "QS World #141" },
    { id: "19", name: "Université catholique de Louvain (UCL)", country: "Belgium", img: dataLocation + "/2.png", highlight: "Leading French-speaking university", ranking: "QS World #188" },

    // Slovakia
    { id: "20", name: "Comenius University", country: "Slovakia", img: dataLocation + "/2.jpg", highlight: "Slovakia’s oldest and largest university", ranking: "QS EECA #51–60" },
    { id: "21", name: "Slovak University of Technology", country: "Slovakia", img: dataLocation + "/3.gif", highlight: "Leading technical university in Bratislava", ranking: "QS EECA #101–110" },
    { id: "22", name: "University of Žilina", country: "Slovakia", img: dataLocation + "/4.jpg", highlight: "Strong in transport and communications engineering", ranking: "QS EECA #151–200" },

    // Austria
    { id: "23", name: "University of Vienna", country: "Austria", img: dataLocation + "/5.jpg", highlight: "Founded 1365 – Austria’s largest and oldest university", ranking: "QS World #130" },
    { id: "24", name: "TU Wien (Technical University of Vienna)", country: "Austria", img: dataLocation + "/5.png", highlight: "Top-ranked for engineering and computer science", ranking: "QS World #180" },
    { id: "25", name: "University of Innsbruck", country: "Austria", img: dataLocation + "/6.jpg", highlight: "Strong in natural sciences and alpine research", ranking: "QS World #266" },

    // Poland
    { id: "26", name: "University of Warsaw", country: "Poland", img: dataLocation + "/6.webp", highlight: "Poland’s top-ranked university", ranking: "QS World #262" },
    { id: "27", name: "Jagiellonian University", country: "Poland", img: dataLocation + "/7.jpg", highlight: "Founded 1364 – one of Europe’s oldest universities", ranking: "QS World #304" },
    { id: "28", name: "Warsaw University of Technology", country: "Poland", img: dataLocation + "/8.jpg", highlight: "Leading technical university in Central Europe", ranking: "QS World #601–650" },

    // Slovenia
    { id: "29", name: "University of Ljubljana", country: "Slovenia", img: dataLocation + "/9.jpg", highlight: "Slovenia’s largest and oldest university", ranking: "QS World #601–650" },
    { id: "30", name: "University of Maribor", country: "Slovenia", img: dataLocation + "/10.png", highlight: "Strong in engineering and economics", ranking: "QS EECA #151–200" },
    { id: "31", name: "University of Primorska", country: "Slovenia", img: dataLocation + "/11.jpg", highlight: "Young and dynamic university in Koper", ranking: "QS EECA #201+" },
];




