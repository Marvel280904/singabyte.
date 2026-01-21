// config/jobs-data.ts

export interface Job {
  id: string;
  title: string;
  stack: string;
  description: string;
  type: "Fulltime" | "Freelance" | "Internship" | "Contract";
  location: "Remote" | "On-site" | "Hybrid";
  about_role: string;
  to_do: string[]; 
  qualifications: string[];
  offer: string[];
}

export const jobsData: Job[] = [
  {
    id: "1",
    title: "Mobile & Full Stack",
    stack: "Dart, Bloc/Riverpod, Firebase",
    description: "We are looking for a versatile developer to handle end-to-end mobile solutions.",
    type: "Fulltime",
    location: "Remote",
    about_role: "We are looking for a versatile Senior Mobile Developer who is passionate about building high-quality mobile applications using Flutter. You will be responsible for the entire lifecycle of the application, from concept to delivery.",
    to_do: [
      "Design and build advanced applications for the iOS and Android platforms using Flutter.",
      "Collaborate with cross-functional teams to define, design, and ship new features.",
      "Work on bug fixing and improving application performance.",
      "Continuously discover, evaluate, and implement new technologies to maximize development efficiency."
    ],
    qualifications: [
      "BS/MS degree in Computer Science, Engineering or a related subject.",
      "3+ years of working experience in software development.",
      "Have published at least one original Android/iOS app.",
      "Experience with third-party libraries and APIs."
    ],
    offer: [
      "Competitive salary range ($3000 - $5000).",
      "Remote work flexibility.",
      "Health insurance and annual leave.",
      "Professional development budget."
    ]
  },
  {
    id: "2",
    title: "Product & Management",
    stack: "Agile/Scrum, Jira, Client Communication",
    description: "Lead our product teams and ensure smooth delivery of complex software projects.",
    type: "Freelance",
    location: "Remote",
    about_role: "We are looking for a versatile Senior Mobile Developer who is passionate about building high-quality mobile applications using Flutter. You will be responsible for the entire lifecycle of the application, from concept to delivery.",
    to_do: [
      "Design and build advanced applications for the iOS and Android platforms using Flutter.",
      "Collaborate with cross-functional teams to define, design, and ship new features.",
      "Work on bug fixing and improving application performance.",
      "Continuously discover, evaluate, and implement new technologies to maximize development efficiency."
    ],
    qualifications: [
      "BS/MS degree in Computer Science, Engineering or a related subject.",
      "3+ years of working experience in software development.",
      "Have published at least one original Android/iOS app.",
      "Experience with third-party libraries and APIs."
    ],
    offer: [
      "Competitive salary range ($3000 - $5000).",
      "Remote work flexibility.",
      "Health insurance and annual leave.",
      "Professional development budget."
    ]
  },
  {
    id: "3",
    title: "UI/UX Designer",
    stack: "Figma, Prototyping",
    description: "Design intuitive, user-centered experiences that align business goals with user needs.",
    type: "Internship",
    location: "Remote",
    about_role: "We are looking for a versatile Senior Mobile Developer who is passionate about building high-quality mobile applications using Flutter. You will be responsible for the entire lifecycle of the application, from concept to delivery.",
    to_do: [
      "Design and build advanced applications for the iOS and Android platforms using Flutter.",
      "Collaborate with cross-functional teams to define, design, and ship new features.",
      "Work on bug fixing and improving application performance.",
      "Continuously discover, evaluate, and implement new technologies to maximize development efficiency."
    ],
    qualifications: [
      "BS/MS degree in Computer Science, Engineering or a related subject.",
      "3+ years of working experience in software development.",
      "Have published at least one original Android/iOS app.",
      "Experience with third-party libraries and APIs."
    ],
    offer: [
      "Competitive salary range ($3000 - $5000).",
      "Remote work flexibility.",
      "Health insurance and annual leave.",
      "Professional development budget."
    ]
  },
];