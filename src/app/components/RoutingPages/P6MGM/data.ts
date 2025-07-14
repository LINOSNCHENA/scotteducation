
// Define types
type TaskStatus = "Complete" | "Pending";
type TaskPriority = "High" | "Medium" | "Low";
type TaskCategory = "Planning" | "Design" | "Frontend" | "Backend" | "Deployment" | "Testing" | "Maintenance";

export interface TaskItemOne {
    key: string;
    task: string;
    category: TaskCategory;
    priority: TaskPriority;
    status: TaskStatus;
}

export interface TaskItem {
    key: string;
    task: string;
    category: string;
    priority: "High" | "Medium" | "Low";
    status: "Complete" | "Pending";
}


// Full list of 42 web development tasks
export const initialTasks: TaskItem[] = [
    // Planning (5 tasks)
    { key: "1", task: "Define project scope", category: "Planning", priority: "High", status: "Pending" },
    { key: "2", task: "Set up version control (Git)", category: "Planning", priority: "High", status: "Pending" },
    { key: "3", task: "Choose tech stack", category: "Planning", priority: "Medium", status: "Pending" },
    { key: "4", task: "Create project timeline", category: "Planning", priority: "Medium", status: "Pending" },
    { key: "5", task: "Competitor analysis", category: "Planning", priority: "Low", status: "Pending" },

    // Design (5 tasks)
    { key: "6", task: "Wireframe key pages", category: "Design", priority: "High", status: "Pending" },
    { key: "7", task: "Design UI mockups", category: "Design", priority: "High", status: "Pending" },
    { key: "8", task: "Ensure accessibility compliance", category: "Design", priority: "Medium", status: "Pending" },
    { key: "9", task: "Plan responsive breakpoints", category: "Design", priority: "Medium", status: "Pending" },
    { key: "10", task: "Create interactive prototypes", category: "Design", priority: "Low", status: "Pending" },

    // Frontend (10 tasks)
    { key: "11", task: "Set up HTML/CSS boilerplate", category: "Frontend", priority: "High", status: "Pending" },
    { key: "12", task: "Implement responsive layout", category: "Frontend", priority: "High", status: "Pending" },
    { key: "13", task: "Build reusable components", category: "Frontend", priority: "High", status: "Pending" },
    { key: "14", task: "Add CSS animations", category: "Frontend", priority: "Medium", status: "Pending" },
    { key: "15", task: "Integrate frontend framework", category: "Frontend", priority: "High", status: "Pending" },
    { key: "16", task: "Set up state management", category: "Frontend", priority: "Medium", status: "Pending" },
    { key: "17", task: "Optimize images/media", category: "Frontend", priority: "Medium", status: "Pending" },
    { key: "18", task: "Cross-browser testing", category: "Frontend", priority: "High", status: "Pending" },
    { key: "19", task: "Implement SEO basics", category: "Frontend", priority: "Medium", status: "Pending" },
    { key: "20", task: "Add PWA support", category: "Frontend", priority: "Low", status: "Pending" },

    // Backend (10 tasks)
    { key: "21", task: "Set up server environment", category: "Backend", priority: "High", status: "Pending" },
    { key: "22", task: "Design database schema", category: "Backend", priority: "High", status: "Pending" },
    { key: "23", task: "Create REST/GraphQL API", category: "Backend", priority: "High", status: "Pending" },
    { key: "24", task: "Implement user authentication", category: "Backend", priority: "High", status: "Pending" },
    { key: "25", task: "Set up error logging", category: "Backend", priority: "Medium", status: "Pending" },
    { key: "26", task: "Handle file uploads", category: "Backend", priority: "Medium", status: "Pending" },
    { key: "27", task: "Write unit tests", category: "Backend", priority: "Medium", status: "Pending" },
    { key: "28", task: "Optimize database queries", category: "Backend", priority: "High", status: "Pending" },
    { key: "29", task: "Secure API endpoints", category: "Backend", priority: "High", status: "Pending" },
    { key: "30", task: "Set up database backups", category: "Backend", priority: "Low", status: "Pending" },

    // Testing (5 tasks)
    { key: "31", task: "Write unit tests (frontend)", category: "Testing", priority: "Medium", status: "Pending" },
    { key: "32", task: "Write integration tests", category: "Testing", priority: "Medium", status: "Pending" },
    { key: "33", task: "Perform load testing", category: "Testing", priority: "Medium", status: "Pending" },
    { key: "34", task: "User acceptance testing", category: "Testing", priority: "High", status: "Pending" },
    { key: "35", task: "Fix critical bugs", category: "Testing", priority: "High", status: "Pending" },

    // Deployment (5 tasks)
    { key: "36", task: "Configure domain/DNS", category: "Deployment", priority: "High", status: "Pending" },
    { key: "37", task: "Set up CI/CD pipeline", category: "Deployment", priority: "High", status: "Pending" },
    { key: "38", task: "Deploy to staging", category: "Deployment", priority: "Medium", status: "Pending" },
    { key: "39", task: "Deploy to production", category: "Deployment", priority: "High", status: "Pending" },
    { key: "40", task: "Monitor performance", category: "Deployment", priority: "Medium", status: "Pending" },

    // Maintenance (2 tasks)
    { key: "41", task: "Update dependencies", category: "Maintenance", priority: "Medium", status: "Pending" },
    { key: "42", task: "Handle user feedback", category: "Maintenance", priority: "Low", status: "Pending" },
];
