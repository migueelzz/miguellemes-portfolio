export interface Experience {
  company: string;
  via?: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
  description: string[];
  stack: string[];
  url?: string;
}

export const experiences: Experience[] = [
  {
    company: "Prime Control",
    via: "via Infinitfy",
    role: "Software Developer",
    period: "Jan 2025 – Present",
    location: "Remote",
    current: true,
    description: [
      "Developed scalable backend APIs and services using Node.js and Python.",
      "Built an AI platform using RAG architecture and multi-agent systems, improving team productivity.",
      "Developed and operated cloud-native applications on AWS using Docker and CI/CD pipelines.",
      "Defined best practices and standards for AI usage in software development.",
    ],
    stack: ["React", "Node.js", "Python", "AWS", "Azure", "Docker", "RAG", "LangChain", "CI/CD"],
    url: "https://www.primecontrol.com.br"
  },
  {
    company: "Infinitfy",
    role: "Software Developer",
    period: "Mar 2024 – Jan 2025",
    location: "Lins, SP, Brazil",
    current: false,
    description: [
      "Developed a chatbot integrated with SAP, WhatsApp, and Jira, increasing process efficiency.",
      "Implemented a notification system supporting 100+ concurrent users.",
      "Designed and implemented RBAC authorization and authentication using JWT and 2FA.",
      "Integrated external APIs and automated support workflows.",
      "Implemented CI/CD pipelines and automated testing.",
    ],
    stack: ["Node.js", "TypeScript", "React", "AWS", "Docker", "PostgreSQL", "CI/CD"],
    url: "https://infinitfy.com.br",
  },
  {
    company: "City Hall of Lins",
    role: "IT Support Intern",
    period: "Oct 2023 – Mar 2024",
    location: "Lins, SP, Brazil",
    current: false,
    description: [
      "Provided technical support and infrastructure maintenance for city employees.",
      "Troubleshot hardware, software, and network issues.",
      "Supported internal systems operations.",
    ],
    stack: ["Linux", "Windows", "infrastructure", "Hardware"],
    url: "https://www.lins.sp.gov.br"
  },
  {
    company: "AD Soluções em Tecnologia",
    role: "Frontend Developer Intern",
    period: "Jun 2022 – May 2023",
    location: "Lins, SP, Brazil",
    current: false,
    description: [
      "Developed web applications including ERP systems, legal systems, and event solutions.",
      "Built responsive user interfaces using React, focusing on UX and component-based architecture.",
      "Integrated external APIs and payment gateways.",
      "Modernized and migrated legacy systems to modern stacks.",
    ],
    stack: ["React", "JavaScript", "TypeScript", "REST APIs"],
  },
];
