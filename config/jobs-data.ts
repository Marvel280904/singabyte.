// config/jobs-data.ts

export interface Job {
  id: string;
  title: string;
  stack: string;
  description: string;
  type: "Fulltime" | "Freelance" | "Internship" | "Contract";
  location: "Remote" | "On-site" | "Hybrid";
  link: string;
}

export const jobsData: Job[] = [
  {
    id: "1",
    title: "Mobile & Full Stack",
    stack: "Dart, Bloc/Riverpod, Firebase",
    description: "We are looking for a versatile developer to handle end-to-end mobile solutions.",
    type: "Fulltime",
    location: "Remote",
    link: "mailto:dev@singabyte.com",
  },
  {
    id: "2",
    title: "Product & Management",
    stack: "Agile/Scrum, Jira, Client Communication",
    description: "Lead our product teams and ensure smooth delivery of complex software projects.",
    type: "Freelance",
    location: "Remote",
    link: "mailto:dev@singabyte.com",
  },
  {
    id: "3",
    title: "UI/UX Designer",
    stack: "Figma, Prototyping",
    description: "Design intuitive, user-centered experiences that align business goals with user needs.",
    type: "Internship",
    location: "Remote",
    link: "mailto:dev@singabyte.com",
  },
  {
    id: "4",
    title: "Backend Engineer",
    stack: "Node.js, PostgreSQL, Docker",
    description: "Build scalable and secure server-side architectures for high-traffic applications.",
    type: "Fulltime",
    location: "On-site",
    link: "mailto:dev@singabyte.com",
  },
  {
    id: "5",
    title: "Frontend Developer",
    stack: "React, Next.js, Tailwind",
    description: "Craft beautiful and responsive web interfaces with modern frontend technologies.",
    type: "Fulltime",
    location: "Hybrid",
    link: "mailto:dev@singabyte.com",
  },
  {
    id: "6",
    title: "DevOps Engineer",
    stack: "AWS, CI/CD, Terraform",
    description: "Manage our cloud infrastructure and automate deployment pipelines.",
    type: "Contract",
    location: "Remote",
    link: "mailto:dev@singabyte.com",
  },
  {
    id: "7",
    title: "QA Engineer",
    stack: "Selenium, Cypress, Manual Testing",
    description: "Ensure the highest quality of our software through rigorous testing.",
    type: "Fulltime",
    location: "Remote",
    link: "mailto:dev@singabyte.com",
  },
  {
    id: "8",
    title: "Data Analyst",
    stack: "Python, SQL, Tableau",
    description: "Analyze data trends to help clients make informed business decisions.",
    type: "Fulltime",
    location: "On-site",
    link: "mailto:dev@singabyte.com",
  },
  {
    id: "9",
    title: "Project Manager",
    stack: "Management, Notion, Slack",
    description: "Coordinate between clients and dev teams to ensure project success.",
    type: "Fulltime",
    location: "Remote",
    link: "mailto:dev@singabyte.com",
  },
  {
    id: "10",
    title: "Mobile Developer (iOS)",
    stack: "Swift, SwiftUI",
    description: "Build native iOS applications with a focus on performance and UX.",
    type: "Fulltime",
    location: "Hybrid",
    link: "mailto:dev@singabyte.com",
  },
];