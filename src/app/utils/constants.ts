// src/utils/constants.ts

export type Website = {
    name: string;
    url: string;
};

export const ITopWebsites: Website[] = [
    { name: "Mining App", url: "https://slghana.com/" },
    { name: "E-commerce Dashboard", url: "https://ecomdash.com" },
    { name: "Wise-Pink", url: "https://hpink-finance.netlify.app/" },
    { name: "Advertisements", url: "https://troopers-infortect.vercel.app/" },
    { name: "Support Portal", url: "https://supportportal.com" },
    { name: "Financials", url: "https://troopers-nexus.netlify.app/#team" },
    { name: "Tourism", url: "https://slghana.com/tourism" },
    { name: "Downloads", url: "https://slghana.com/downloads" },
    { name: "Videos", url: "https://slghana.com/videos" },
];

export type Service = {
    title: string;
    description: string;
    iconName: string; // reference key for icon
};

export const IServices: Service[] = [
    { title: "Business Websites & Blogs", description: "Professional websites tailored to your business needs.", iconName: "FaGlobe" },
    { title: "E-commerce Stores", description: "Secure and scalable online stores with payment integration.", iconName: "FaChartLine" },
    { title: "Custom Web Applications", description: "Build custom solutions to streamline your business processes.", iconName: "FaServer" },
    { title: "Website Redesign & Upgrades", description: "Modernize and optimize your existing website.", iconName: "FaCode" },
    { title: "SEO & Mobile Optimization", description: "Improve your website's visibility and performance.", iconName: "FaMobile" },
    { title: "School Registration Systems", description: "Efficient electronic registration systems for schools.", iconName: "FaShieldAlt" },
];

export const ISpecialists = [
    { name: "Chitundu Chitundu", role: "Chief Executive Officer", description: "Leads the design and development of scalable frontend and backend solutions, ensuring technical excellence and innovation." },
    { name: "Musonda Musonda", role: "Marketing Officer", description: "Drives strategic marketing initiatives and fosters seamless collaboration between product development and user experience teams." },
    //  { name: "Webster Mwanza", role: "Product Officer", description: "Oversees the development of robust and secure web applications, focusing on delivering high-quality products that meet client needs." },
    { name: "Lukas Monde", role: "Senior Telecoms Engineer", description: "Ensures software quality and reliability through comprehensive testing strategies and continuous process improvement." },
    { name: "Benson Mwale", role: "Backend Software Engineer", description: "Contributes to the development of secure and efficient web applications, supporting the team in delivering reliable solutions." },
    { name: "Mbala Mulenga", role: "Cyber Security Consultant", description: "Assists in building and maintaining secure web applications, with a commitment to best practices and continuous learning." },
    //  { name: "James Banda", role: "Software Engineer", description: "Develops and maintains robust web applications, ensuring security, performance, and scalability." },
    { name: "Nikolas Tembo", role: "Hardware Software Engineer", description: "Specializes in architecting and implementing secure, high-performance web solutions tailored to client requirements." },
];

export const ITechStacks = [
    { title: "Frontend", technologies: "Angular, React, Vue.js, TypeScript, JavaScript, Tailwind CSS, Meteor, SpringBoot, Boostrap" },
    {
        title: "Backend", technologies: "Node.js, Express.js, NestJS, Java, NodeJs, Kotlin"
    },
    { title: "Databases", technologies: "PostgreSQL, MySQL, MongoDB" },
    { title: "Hosting & Deployment", technologies: "AWS, Vercel, DigitalOcean, git" },
    { title: "Support", technologies: "Twelve months free service for all product we offer" },
    { title: "Maintanance", technologies: "Management of existing systems" },
];
