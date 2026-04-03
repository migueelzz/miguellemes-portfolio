export interface Project {
  title: string;
  description: string;
  thumb: string;
  tech: string[];
  liveUrl?: string;
  githubUrl: string;
  featured: boolean;
}

// To add/update projects: edit this array.
// For thumbnails: place images in /public/images/projects/ and reference as "/images/projects/filename.png"
// Or use an external URL for the thumb.
export const projects: Project[] = [
  {
    title: "AI Chat Agent — Hybrid RAG",
    description:
      "AI chat application powered by multi-agent reasoning, hybrid RAG (retrieval-augmented generation), and a real-time streaming interface. Built with LangChain and FastAPI.",
    thumb: "https://opengraph.githubassets.com/1/migueelzz/chat-ai-agent-hybrid-rag",
    tech: ["Python", "FastAPI", "LangChain", "React", "TypeScript"],
    githubUrl: "https://github.com/migueelzz/chat-ai-agent-hybrid-rag",
    featured: true,
  },
  {
    title: "Microservices — Java Spring",
    description:
      "Email notification microservice built with Java Spring Boot and RabbitMQ. Demonstrates async messaging between services, queue consumption, and SMTP email delivery.",
    thumb: "https://opengraph.githubassets.com/1/migueelzz/microservices-java",
    tech: ["Java", "Spring Boot", "RabbitMQ", "Docker"],
    githubUrl: "https://github.com/migueelzz/microservices-java",
    featured: true,
  },
  {
    title: "Forum API — NestJS Clean Arch",
    description:
      "Online forum REST API following Clean Architecture, DDD, SOLID, and TDD principles. Features JWT auth, file uploads, caching with Redis, and full test coverage.",
    thumb: "https://opengraph.githubassets.com/1/migueelzz/ignite-nodejs-05-nest-clean",
    tech: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Docker"],
    githubUrl: "https://github.com/migueelzz/ignite-nodejs-05-nest-clean",
    featured: true,
  },
  {
    title: "Next.js SaaS — RBAC",
    description:
      "Full-stack SaaS boilerplate with multi-tenant support and role-based access control (RBAC). Built with Next.js App Router, featuring organizations, invitations, and fine-grained permissions.",
    thumb: "https://opengraph.githubassets.com/1/migueelzz/next-saas-rbac",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "RBAC"],
    githubUrl: "https://github.com/migueelzz/next-saas-rbac",
    featured: true,
  },
];
