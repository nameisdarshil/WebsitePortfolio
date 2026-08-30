export const siteConfig = {
  name: "Darshil Shah",
  title: "Data Analyst",
  email: "djshah2000@gmail.com",
  phone: "+91 9978380490",
  location: "Ahmedabad, Gujarat, India",
  linkedin: "https://www.linkedin.com/in/darshilshah2001",
  github: "https://github.com/nameisdarshil",
  resumeUrl: "/DARSHIL_S_RESUME.pdf",
} as const;

export const summary = `Data Analyst with hands-on experience turning raw, messy datasets into clear, actionable insight. Currently at Atopic Laboratories, analyzing sales, prescriber, and territory-level performance data across multiple pharmaceutical product lines using SQL and Excel. Comfortable across the full analytics workflow — data cleaning, exploratory data analysis (EDA), statistical modeling, and dashboarding — with Python (Pandas, NumPy, Matplotlib, Seaborn), SQL, and BI tools like Power BI and Tableau. Postgraduate graduate from Humber College, Toronto, with Dean's Honour Roll recognition across four consecutive terms. Focused on finding the story inside the data and presenting it in a way stakeholders can actually act on.`;

export const skills = [
  {
    category: "Languages & Analysis",
    items: ["Python (Pandas, NumPy)", "SQL", "R"],
  },
  {
    category: "Visualization & BI",
    items: ["Power BI", "Tableau", "Excel", "Matplotlib", "Seaborn"],
  },
  {
    category: "Databases",
    items: ["MySQL", "PostgreSQL", "MongoDB", "MariaDB"],
  },
  {
    category: "Tools & Platforms",
    items: ["Jupyter Notebook", "Git", "GitHub", "AWS (Cloud Practitioner)"],
  },
  {
    category: "Core Competencies",
    items: [
      "Data Cleaning",
      "Exploratory Data Analysis",
      "Statistical Modeling",
      "Dashboarding",
      "MIS Reporting",
    ],
  },
  {
    category: "Soft Skills",
    items: ["Problem Solving", "Teamwork", "Communication"],
  },
] as const;

export const experience = [
  {
    role: "Data Analyst",
    company: "Atopic Laboratories Pvt. Ltd.",
    location: "Ahmedabad, India",
    period: "Feb 2026 – Present",
    highlights: [
      "Analyze sales, field, and product performance data at a pharmaceutical marketing company spanning dermatology, pediatrics, gynecology, orthopedics, dental, and ENT categories, using Excel and SQL to build reports and dashboards tracking performance by product, territory, and division.",
      "Analyze prescriber and market data to identify growth opportunities and underperforming areas across product divisions; prepare periodic MIS reports summarizing sales trends versus targets and achievements.",
      "Support the marketing team with data-backed insights for product launches, promotional campaigns, and territory planning while maintaining well-organized data across multiple product lines.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Arth Infosoft Pvt. Ltd.",
    location: "Ahmedabad, India",
    period: "Jan 2022 – Apr 2022",
    highlights: [
      "Developed a web-based Appraisal Tracking System using Python and Django, implementing core modules including employee registration, attendance tracking, leave management, payroll processing, and department management.",
      "Built an admin dashboard displaying employee records, department details, and performance-related data, with the database schema designed and managed in PostgreSQL using Django models and migrations.",
      "Followed the complete software development lifecycle — requirement analysis, database design, coding, and manual testing — to ensure reliable application performance.",
    ],
  },
] as const;

export const projects = [
  {
    title: "Employee Performance and HR Analytics Dashboard",
    subtitle: "Personal Project",
    description:
      "Built an end-to-end HR analytics pipeline to analyze attendance, leave utilization, and performance trends across departments, cleaning and transforming raw records with Pandas to resolve duplicates, null values, and inconsistencies. Developed dynamic dashboards using Matplotlib and Seaborn for HR managers to monitor KPIs and payroll anomalies at a glance, and automated data aggregation tasks with Python scripts to reduce manual effort and improve monthly reporting turnaround time.",
    stack: ["Python", "Pandas", "SQL", "Matplotlib", "Seaborn"],
    image: "/assets/accent-web-dev.gif",
    featured: true,
  },
  {
    title: "Stock Newsletter Platform",
    subtitle: "Capstone Project · Humber College · 2024",
    description:
      "Designed and developed a Stock Newsletter Platform that transforms raw stock market data into clear, dynamic visual insights for end users, using Chart.js to build interactive data visualizations that make complex stock trends easy to interpret at a glance. Delivered as the culminating capstone for the Information Technology Solutions program, applying end-to-end skills in data handling and visualization.",
    stack: ["Chart.js", "Data Visualization", "Data Handling"],
    image: "/assets/project-stock-newsletter.jpg",
    team: "Web Wizards of North",
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
