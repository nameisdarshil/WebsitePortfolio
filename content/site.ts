export const siteConfig = {
  name: "Darshil Shah",
  title: "Frontend Developer",
  email: "djshah2000@gmail.com",
  phone: "+91 9978380490",
  location: "Ahmedabad, Gujarat, India",
  linkedin: "https://www.linkedin.com/in/darshilshah2001",
  github: "https://github.com/nameisdarshil",
  resumeUrl: "/DARSHIL_S_RESUME.pdf",
} as const;

export const summary = `Frontend Developer and AWS Certified Cloud Practitioner with hands-on experience in the MERN stack, REST API development, and full-stack web applications. Postgraduate graduate from Humber College, Toronto, with Dean's Honour Roll recognition across four consecutive terms. Passionate about building scalable, user-friendly web experiences that blend clean design with robust engineering.`;

export const skills = [
  {
    category: "Languages",
    items: ["JavaScript (ES6+)", "Python", "HTML5", "CSS3", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React.js", "Chart.js", "Responsive Design", "REST API Integration"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "RESTful APIs"],
  },
  {
    category: "Databases",
    items: ["MongoDB", "PostgreSQL", "MariaDB"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS (Cloud Practitioner)", "Docker", "Git", "GitHub"],
  },
  {
    category: "Auth & Soft Skills",
    items: [
      "Auth0",
      "JWT Authentication",
      "Problem Solving",
      "Teamwork",
      "Communication",
    ],
  },
] as const;

export const experience = [
  {
    role: "Software Engineer Intern",
    company: "Arth Infosoft Pvt. Ltd.",
    location: "Ahmedabad, India",
    period: "Jan 2022 – Apr 2022",
    highlights: [
      "Developed an Appraisal Tracking System for HR operations including registration, attendance, leave, payroll, and department management.",
      "Built an admin dashboard for employee, department, and performance data visualization.",
      "Designed database schemas, models, and migrations for reliable data storage.",
      "Contributed across the full SDLC — requirements, design, coding, and manual testing.",
    ],
  },
] as const;

export const projects = [
  {
    title: "Stock Newsletter Platform",
    subtitle: "Capstone Project · Humber College · 2024",
    description:
      "Full-stack MERN platform with client and admin dashboards for a stock newsletter service. Features Auth0 role-based access, Chart.js stock visualizations, and REST APIs for real-time market data.",
    stack: ["React.js", "Node.js", "Auth0", "Chart.js", "MongoDB"],
    image: "/assets/project-stock-newsletter.jpg",
    team: "Web Wizards of North",
    featured: true,
  },
  {
    title: "Appraisal Tracking System",
    subtitle: "Arth Infosoft · 2022",
    description:
      "Enterprise HR management system covering employee lifecycle, attendance tracking, leave management, payroll processing, and departmental administration.",
    stack: ["Full-Stack", "Database Design", "Admin Dashboard"],
    image: "/assets/accent-web-dev.gif",
    featured: false,
  },
] as const;

export const education = [
  {
    institution: "Humber College",
    location: "Toronto, ON, Canada",
    degree: "Postgraduate Certificate, Information Technology Solutions",
    period: "Jan 2023 – Aug 2024",
    honors: "Dean's Honour Roll — Winter 2023, Summer 2023, Winter 2024, Summer 2024",
  },
  {
    institution: "Gujarat Technological University (GTU)",
    location: "Ahmedabad, India",
    degree: "B.E., Information Technology",
    period: "2018 – 2022",
    honors: null,
  },
] as const;

export const certifications = [
  "AWS Certified Cloud Practitioner",
  "Database Operations in MariaDB Using Python — Certification of Completion",
] as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;
