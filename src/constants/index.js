import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  threejs,
  aiCareerCoach,
  abyssiniaDating,
  futurexMicroservices,
  rideAdminDashboard,
  digitalCodeFlutter,
  delalayeBackend,
  aiApiIntegrations,
  ecommerceRedora,
  hotelbee,
  jobPortal,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Experience",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Full Stack Developer",
    company_name: "Abyssinia Software Technology",
    icon: meta,
    iconBg: "#1d1836",
    date: "Jan 2024 - Present",
    points: [
      "Architecting and delivering full-stack web and mobile platforms, including the Abyssinia Marriage platform and Telegram Mini App integration.",
      "Developing backend microservices and service routing with Node.js, Express, and MongoDB for scalable production systems.",
      "Implementing robust security controls: OTP phone verification, role-based authorization, input field allowlisting, and access validation.",
      "Conducting comprehensive QA/UAT reviews, regression testing, and production deployment automation.",
    ],
  },
  {
    title: "React.js Developer",
    company_name: "Minte",
    icon: starbucks,
    iconBg: "#383E56",
    date: "Jan 2023 - Dec 2024",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Laravel Developer",
    company_name: "minte",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "Jan 2023 - Feb 2024",
    points: [
      "Developing and maintaining web applications using Laravel and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "JIT",
    icon: shopify,
    iconBg: "#383E56",
    date: "Jan 2022 - Jan 2024",
    points: [
      "Developing and maintaining web applications using HTML, CSS, and JavaScript and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful and high-performing as our product, but Minte delivered beyond our expectations.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've rarely met a full-stack developer who truly cares about code architecture and user experience like Minte does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Minte built and optimized our web application, our page speed and user engagement increased tremendously. Highly recommended!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

export const projectCategories = [
  "All",
  "Full-Stack",
  "Backend & APIs",
  "Mobile",
  "Frontend",
];

const projects = [
  {
    id: "ai-career-coach",
    name: "AI Career Coach",
    subtitle: "Full-Stack Web Application",
    category: "Full-Stack",
    description:
      "Full-stack AI-powered career coaching platform built with Next.js, Prisma, PostgreSQL, Clerk authentication, and Inngest background event processing. Features automated onboarding, role-based routing, resume optimization workflows, and serverless deployment on Vercel.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "React", color: "green-text-gradient" },
      { name: "PostgreSQL", color: "pink-text-gradient" },
      { name: "Prisma", color: "orange-text-gradient" },
      { name: "API Integration", color: "blue-text-gradient" },
    ],
    image: aiCareerCoach,
    live_demo_link: "https://ai-career-coach-green.vercel.app",
    source_code_link: "https://github.com/mintekoo/AI-Career-Coach",
  },
  {
    id: "abyssinia-dating",
    name: "Abyssinia Marriage Platform",
    subtitle: "Full-Stack Platform & Telegram Mini App",
    category: "Full-Stack",
    description:
      "Full-stack matchmaking and dating platform built with Node.js, Express, MongoDB, and React with Telegram Mini App integration. Features phone OTP verification, role-based authorization, input field allowlisting, sensitive data protection, and QA/UAT verification.",
    tags: [
      { name: "Node.js", color: "green-text-gradient" },
      { name: "Express.js", color: "blue-text-gradient" },
      { name: "React", color: "pink-text-gradient" },
      { name: "MongoDB", color: "green-text-gradient" },
      { name: "REST API Development", color: "orange-text-gradient" },
    ],
    image: abyssiniaDating,
    live_demo_link: "https://dating.ethiomillionsko.com",
    source_code_link: "https://github.com/abyssiniasoftware",
    is_client_work: true,
  },
  {
    id: "futurex-microservices",
    name: "FutureX Microservices",
    subtitle: "Backend Microservices Architecture",
    category: "Backend & APIs",
    description:
      "Scalable backend microservices architecture organizing enrollment, activity tracking, and community forum features across independent services. Configured multi-port service routing, subdomain orchestration, and database management.",
    tags: [
      { name: "Node.js", color: "green-text-gradient" },
      { name: "REST API Development", color: "blue-text-gradient" },
      { name: "Microservices", color: "orange-text-gradient" },
      { name: "Backend Development", color: "pink-text-gradient" },
      { name: "Database Management", color: "blue-text-gradient" },
    ],
    image: futurexMicroservices,
    source_code_link: "https://github.com/abyssiniasoftware/futurex-backend-microservice",
    is_organization_repo: true,
  },
  {
    id: "ride-admin-dashboard",
    name: "Ride Admin Dashboard",
    subtitle: "React Frontend Architecture",
    category: "Frontend",
    description:
      "Enterprise administrative dashboard built with React, Vite, JavaScript, and Tailwind CSS. Implements reusable CRUD components, centralized API client configuration, shared theme/auth context providers, and versioned REST API integration.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "JavaScript", color: "pink-text-gradient" },
      { name: "Tailwind CSS", color: "green-text-gradient" },
      { name: "REST API Integration", color: "orange-text-gradient" },
      { name: "Frontend Development", color: "blue-text-gradient" },
    ],
    image: rideAdminDashboard,
    source_code_link: "https://github.com/mintekoo/Ride-Admin-Dashboard",
  },
  {
    id: "digital-code-mobile",
    name: "Digital Code Mobile App",
    subtitle: "Flutter Mobile Application",
    category: "Mobile",
    description:
      "Cross-platform mobile application developed with Flutter and Dart using a feature-oriented architecture (Home, Package, Product, Scan). Implements deep link routing, authoritative package payment requests, and automated test coverage.",
    tags: [
      { name: "Flutter", color: "blue-text-gradient" },
      { name: "Dart", color: "pink-text-gradient" },
      { name: "REST API Integration", color: "green-text-gradient" },
      { name: "Mobile App Development", color: "orange-text-gradient" },
      { name: "State Management", color: "blue-text-gradient" },
    ],
    image: digitalCodeFlutter,
    source_code_link: "https://github.com/mintekoo/Digital-Code-Flutter",
  },
  {
    id: "delalaye-backend",
    name: "Delalaye Backend System",
    subtitle: "Database Seeding & Validation",
    category: "Backend & APIs",
    description:
      "Deterministic and idempotent database seeding and data validation engine for backend services. Implements environment-aware execution, schema constraint assertions, repeatable seeder pipelines, and automated test verification.",
    tags: [
      { name: "Backend Development", color: "green-text-gradient" },
      { name: "Database Management", color: "blue-text-gradient" },
      { name: "JavaScript", color: "orange-text-gradient" },
      { name: "Data Validation", color: "pink-text-gradient" },
      { name: "Software Testing", color: "green-text-gradient" },
    ],
    image: delalayeBackend,
    source_code_link: "https://github.com/mintekoo/Delalaye-Backend-Seeder",
  },
  {
    id: "ai-api-integrations",
    name: "AI & API Integrations",
    subtitle: "Application Development & Gateway",
    category: "Full-Stack",
    description:
      "Production-grade integration connecting web interfaces with OpenAI and Hugging Face inference APIs. Implements resilient request handling, streaming responses, token usage controls, and secure server-side environment management.",
    tags: [
      { name: "OpenAI API", color: "blue-text-gradient" },
      { name: "Hugging Face", color: "pink-text-gradient" },
      { name: "JavaScript", color: "green-text-gradient" },
      { name: "REST API Integration", color: "orange-text-gradient" },
      { name: "Backend Development", color: "blue-text-gradient" },
    ],
    image: aiApiIntegrations,
    source_code_link: "https://github.com/mintekoo/AI-API-Integrations",
  },
  {
    id: "redora-ecommerce",
    name: "Redora Tech E-commerce",
    subtitle: "Full-Stack E-commerce Platform",
    category: "Full-Stack",
    description:
      "Full-stack e-commerce solution featuring product catalogs, shopping cart workflows, customer authentication, checkout pipeline, inventory management, and responsive administrative dashboards.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Laravel", color: "pink-text-gradient" },
      { name: "JavaScript", color: "green-text-gradient" },
      { name: "Database Management", color: "orange-text-gradient" },
      { name: "REST APIs", color: "blue-text-gradient" },
    ],
    image: ecommerceRedora,
    source_code_link: "https://github.com/mintekoo/E-Commerce",
  },
  {
    id: "hotelbee-booking",
    name: "HotelBee Booking System",
    subtitle: "Hotel Reservation Engine",
    category: "Full-Stack",
    description:
      "Online hotel booking and room reservation platform supporting dynamic room availability queries, guest reservation workflows, booking confirmation management, and administrative UI controls.",
    tags: [
      { name: "Web Development", color: "blue-text-gradient" },
      { name: "JavaScript", color: "pink-text-gradient" },
      { name: "Database Management", color: "green-text-gradient" },
      { name: "Backend Development", color: "orange-text-gradient" },
      { name: "UI Design", color: "blue-text-gradient" },
    ],
    image: hotelbee,
    source_code_link: "https://github.com/mintekoo/Hotel-Booking-System",
  },
  {
    id: "job-finder-portal",
    name: "Job Finder Platform",
    subtitle: "Recruitment & Career Portal",
    category: "Full-Stack",
    description:
      "Job recruitment platform connecting applicants and employers with faceted search filtering, resume submissions, employer listing dashboards, and candidate application status tracking.",
    tags: [
      { name: "Web Development", color: "blue-text-gradient" },
      { name: "JavaScript", color: "green-text-gradient" },
      { name: "Database Management", color: "orange-text-gradient" },
      { name: "REST APIs", color: "pink-text-gradient" },
      { name: "Frontend Development", color: "blue-text-gradient" },
    ],
    image: jobPortal,
    source_code_link: "https://github.com/mintekoo/Job-Portal-System",
  },
];

export { services, technologies, experiences, testimonials, projects };
