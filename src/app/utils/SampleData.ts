import { IReview } from "@/types/Models.subscriptions";
import { COMP_ICON_LOGO } from "./Branding/ApiRoutes";

export const UtilClients: IReview[] = [
    {
        name: "Natasha Zulu",
        location: "Lusaka, Zambia",
        review: "The website they built for our school is modern, fast, and easy to update. We love it!",
        rating: 5,
        avatar_url: "https://randomuser.me/api/portraits/women/50.jpg",
        created_at: "2025-06-08",
    },
    {
        name: "Michael Ochieng",
        location: "Nairobi, Kenya",
        review: "They redesigned our NGO's website in record time. Great UI and mobile optimization.",
        rating: 5,
        avatar_url: "https://randomuser.me/api/portraits/men/45.jpg",
        created_at: "2025-06-09",
    },
    {
        name: "Linda Phiri",
        location: "Blantyre, Malawi",
        review: "Excellent WordPress work. Very responsive and patient with our edits.",
        rating: 4,
        avatar_url: "https://randomuser.me/api/portraits/women/48.jpg",
        created_at: "2025-06-10",
    },
    {
        name: "Joseph Mwamba",
        location: "Kitwe, Zambia",
        review: "We needed an e-commerce site, and they delivered a clean and secure platform.",
        rating: 5,
        avatar_url: "https://randomuser.me/api/portraits/men/32.jpg",
        created_at: "2025-06-11",
    },
    {
        name: "Rebecca Wambui",
        location: "Nakuru, Kenya",
        review: "Creative, timely, and affordable. They helped bring our brand online.",
        rating: 4,
        avatar_url: COMP_ICON_LOGO,
        created_at: "2025-06-12",
    },
    {
        name: "Samuel Daka",
        location: "Ndola, Zambia",
        review: "Highly professional team. They integrated our payment system perfectly.",
        rating: 5,
        avatar_url: "https://randomuser.me/api/portraits/men/40.jpg",
        created_at: "2025-06-13",
    },
    {
        name: "Chipo Mhlanga",
        location: "Harare, Zimbabwe",
        review: "Our law firm needed a sleek, professional site, and they nailed the design.",
        rating: 5,
        avatar_url: "https://randomuser.me/api/portraits/women/46.jpg",
        created_at: "2025-06-14",
    },
    {
        name: "Tinashe Banda",
        location: "Bulawayo, Zimbabwe",
        review: "Very flexible and skilled developers. They helped us add custom features quickly.",
        rating: 4,
        avatar_url: "https://randomuser.me/api/portraits/men/37.jpg",
        created_at: "2025-06-15",
    },
    {
        name: "Agnes Mbewe",
        location: "Livingstone, Zambia",
        review: "They explained every step clearly and made our first site launch a breeze.",
        rating: 5,
        avatar_url: "https://randomuser.me/api/portraits/women/42.jpg",
        created_at: "2025-06-16",
    },
    {
        name: "Peter Njeri",
        location: "Kampala, Uganda",
        review: "The CMS they built for us is exactly what we needed. Reliable and intuitive.",
        rating: 4,
        avatar_url: "https://randomuser.me/api/portraits/men/35.jpg",
        created_at: "2025-06-17",
    },
    {
        name: "Diana Musonda",
        location: "Mansa, Zambia",
        review: "The team understood our church's goals and made a beautiful website for us.",
        rating: 5,
        avatar_url: "https://randomuser.me/api/portraits/women/49.jpg",
        created_at: "2025-06-18",
    },
    {
        name: "George Otieno",
        location: "Kisumu, Kenya",
        review: "From domain setup to deployment, they handled it all professionally.",
        rating: 5,
        avatar_url: "https://randomuser.me/api/portraits/men/36.jpg",
        created_at: "2025-06-19",
    }
];


export const utilProjectData = [
    {
        id: "1",
        title: "E-commerce Website",
        description: "A fully responsive online store with shopping cart functionality.",
        imageUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        tags: ["React", "E-commerce"],
        github: "https://github.com/example/ecommerce",
        link: "https://slghana.com/"
    },
    {
        id: "2",
        title: "Portfolio Website",
        description: "A modern portfolio site with animations and dark mode.",
        imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        tags: ["Next.js"],
        link: "https://slghana.com/"
    },
    {
        id: "3",
        title: "Banking System",
        description: "Secure online banking platform with transaction monitoring.",
        imageUrl: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        tags: ["Java", "Spring Boot", "Security"],
        link: "https://example.com/banking"
    },
    {
        id: "4",
        title: "Hospital Management",
        description: "Patient records and appointment scheduling system.",
        imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        tags: ["MySQL"],
        link: "https://example.com/hospital"
    },
    {
        id: "5",
        title: "IoT Dashboard",
        description: "Real-time monitoring of smart devices and sensors.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        tags: ["Python", "React"],
        link: "https://example.com/iot"
    },
    {
        id: "6",
        title: "Mobile Payment App",
        description: "Cross-platform mobile payment solution.",
        imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        tags: ["Firebase", "Node.js"],
        link: "https://example.com/mobilepay"
    },
    {
        id: "7",
        title: "School Management",
        description: "Complete school administration and learning platform.",
        imageUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        tags: ["MERN Stack", "LMS"],
        link: "https://example.com/school"
    },
    {
        id: "8",
        title: "Inventory System",
        description: "Barcode scanning and stock management solution.",
        imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        tags: ["C#", ".NET", "SQL Server"],
        link: "https://example.com/inventory"
    },
    {
        id: "9",
        title: "CRM Platform",
        description: "Customer relationship management for sales teams.",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        tags: ["Salesforce"],
        link: "https://example.com/crm"
    },
    {
        id: "10",
        title: "Analytics Dashboard",
        description: "Business intelligence and data visualization tool.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        tags: ["Power BI", "SQL"],
        link: "https://example.com/analytics"
    },
    {
        id: "11",
        title: "Restaurant POS",
        description: "Point of sale system with inventory integration.",
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        tags: ["Java"],
        link: "https://example.com/pos"
    },
    {
        id: "12",
        title: "Travel Booking",
        description: "Flight and hotel reservation platform.",
        imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        tags: ["Angular", "Node.js", "MongoDB"],
        //  link: "https://example.com/travel"
        link: "https://slghana.com/"
    }
];
