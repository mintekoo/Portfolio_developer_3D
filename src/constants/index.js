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
  chatApp,
  abayEqub,
  delalayeRealEstate,
  mgwTutorials,
  entranceZone,
  dailyTransport,
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
  "Company Projects",
  "Full-Stack",
  "Backend & APIs",
  "Mobile",
  "Frontend",
];

const projects = [
  {
    id: "ai-career-coach",
    name: "AI Career Coach",
    subtitle: "Full-Stack AI Application",
    category: "Full-Stack",
    description:
      "Full-stack AI-powered career coaching platform using Next.js, Prisma, PostgreSQL, and Clerk authentication. Features automated onboarding, role-based routing, Inngest event-driven background processing, and serverless deployment on Vercel.",
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
    id: "abay-equb",
    name: "Abay Equb Platform",
    subtitle: "Digital Equb Management System",
    category: "Full-Stack",
    is_company_project: true,
    company_name: "Abyssinia Software Technology",
    description:
      "Contributed to the development of Abay Equb at Abyssinia Software Technology, digitizing traditional Equb community savings workflows. Implemented full-stack features, API integration, database design, rotating payout cycles, and maintainable services.",
    tags: [
      { name: "JavaScript", color: "blue-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "React", color: "pink-text-gradient" },
      { name: "MySQL", color: "orange-text-gradient" },
      { name: "REST API Development", color: "blue-text-gradient" },
    ],
    image: abayEqub,
    live_demo_link: "https://mintekoo.github.io/PORTFOLIO/",
    source_code_link: "https://github.com/abyssiniasoftware",
  },
  {
    id: "delalaye-real-estate",
    name: "Delalaye Real Estate",
    subtitle: "Brokerage & Property Management",
    category: "Full-Stack",
    is_company_project: true,
    company_name: "Abyssinia Software Technology",
    description:
      "Full-stack real estate and brokerage management platform built with Node.js, Express, Sequelize ORM, MySQL, and a React + Vite admin dashboard. Manages user auth, broker profiles, property listings, client assignments, deal pipelines, transactions, and analytics.",
    tags: [
      { name: "Node.js", color: "green-text-gradient" },
      { name: "Express.js", color: "blue-text-gradient" },
      { name: "MySQL", color: "orange-text-gradient" },
      { name: "React", color: "pink-text-gradient" },
      { name: "REST API Development", color: "blue-text-gradient" },
    ],
    image: delalayeRealEstate,
    source_code_link: "https://github.com/mintekoo/Delalaye-Real-Estate",
  },
  {
    id: "futurex-microservices",
    name: "FutureX Microservices",
    subtitle: "Backend Microservices Architecture",
    category: "Backend & APIs",
    is_company_project: true,
    company_name: "Abyssinia Software Technology",
    description:
      "Backend microservices architecture organizing enrollment, activity tracking, and community forum features across independent services with multi-port routing, subdomain orchestration, and database management.",
    tags: [
      { name: "Node.js", color: "green-text-gradient" },
      { name: "JavaScript", color: "blue-text-gradient" },
      { name: "Backend Development", color: "pink-text-gradient" },
      { name: "REST APIs", color: "orange-text-gradient" },
      { name: "Microservices", color: "blue-text-gradient" },
    ],
    image: futurexMicroservices,
    source_code_link: "https://github.com/abyssiniasoftware/futurex-backend-microservice",
    is_organization_repo: true,
  },
  {
    id: "abyssinia-dating",
    name: "Abyssinia Marriage Platform",
    subtitle: "Web & Telegram Mini App",
    category: "Full-Stack",
    is_company_project: true,
    company_name: "Abyssinia Software Technology",
    description:
      "Full-stack matchmaking and dating platform built with Node.js, Express, MongoDB, and React with Telegram Mini App integration. Features phone OTP verification, role-based authorization, input field allowlisting, sensitive data protection, and QA/UAT verification.",
    tags: [
      { name: "Node.js", color: "green-text-gradient" },
      { name: "Express.js", color: "blue-text-gradient" },
      { name: "React", color: "pink-text-gradient" },
      { name: "MongoDB", color: "green-text-gradient" },
      { name: "Authentication & Authorization", color: "orange-text-gradient" },
    ],
    image: abyssiniaDating,
    live_demo_link: "https://dating.ethiomillionsko.com",
    source_code_link: "https://github.com/abyssiniasoftware",
  },
  {
    id: "mgw-tutorials",
    name: "MGW Tutorials",
    subtitle: "Educational Application Development",
    category: "Frontend",
    is_company_project: true,
    company_name: "Abyssinia Software Technology",
    description:
      "Contributed to MGW Tutorials, an educational platform project at Abyssinia Software Technology. Focused on maintainable application structure, interactive course navigation, video playback interfaces, and seamless integration between frontend and backend components.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "JavaScript", color: "pink-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "REST APIs", color: "orange-text-gradient" },
      { name: "Database Management", color: "blue-text-gradient" },
    ],
    image: mgwTutorials,
    source_code_link: "https://github.com/abyssiniasoftware",
  },
  {
    id: "entrance-zone",
    name: "Entrance Zone",
    subtitle: "Entrance Exam Preparation Platform",
    category: "Frontend",
    is_company_project: true,
    company_name: "Abyssinia Software Technology",
    description:
      "Contributed to Entrance Zone at Abyssinia Software Technology, supporting university entrance exam preparation. Built maintainable exam practice modules, timed tests, question management interfaces, and student performance assessments.",
    tags: [
      { name: "JavaScript", color: "blue-text-gradient" },
      { name: "React", color: "pink-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "REST APIs", color: "orange-text-gradient" },
      { name: "Web Development", color: "blue-text-gradient" },
    ],
    image: entranceZone,
    source_code_link: "https://github.com/abyssiniasoftware",
  },
  {
    id: "daily-transport",
    name: "Daily Transport",
    subtitle: "Transport Management Application",
    category: "Full-Stack",
    is_company_project: true,
    company_name: "Abyssinia Software Technology",
    description:
      "Contributed to Daily Transport at Abyssinia Software Technology, supporting transport-oriented digital workflows. Focused on vehicle scheduling, route tracking, driver shift coordination, ticket booking management, and API-driven data integration.",
    tags: [
      { name: "JavaScript", color: "blue-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "React", color: "pink-text-gradient" },
      { name: "REST API Development", color: "orange-text-gradient" },
      { name: "Database Management", color: "blue-text-gradient" },
    ],
    image: dailyTransport,
    source_code_link: "https://github.com/abyssiniasoftware",
  },
  {
    id: "digital-code-mobile",
    name: "Digital Code Mobile App",
    subtitle: "Flutter Mobile Application",
    category: "Mobile",
    description:
      "Cross-platform mobile application developed with Flutter and Dart using a feature-oriented architecture (Home, Package, Product, Scan). Implemented package navigation, payment-request workflows, deep link routing, and automated test coverage.",
    tags: [
      { name: "Flutter", color: "blue-text-gradient" },
      { name: "Dart", color: "pink-text-gradient" },
      { name: "Mobile App Development", color: "green-text-gradient" },
      { name: "REST APIs", color: "orange-text-gradient" },
      { name: "State Management", color: "blue-text-gradient" },
    ],
    image: digitalCodeFlutter,
    source_code_link: "https://github.com/mintekoo/Digital-Code-Flutter",
  },
  {
    id: "ride-admin-dashboard",
    name: "Ride Admin Dashboard",
    subtitle: "React Administration Interface",
    category: "Frontend",
    description:
      "Administrative dashboard built with React, Vite, JavaScript, and Tailwind CSS. Implements reusable CRUD components, centralized API configuration, shared theme/auth context providers, and versioned REST API integration.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "JavaScript", color: "pink-text-gradient" },
      { name: "Vite", color: "green-text-gradient" },
      { name: "Tailwind CSS", color: "orange-text-gradient" },
      { name: "REST API Integration", color: "blue-text-gradient" },
    ],
    image: rideAdminDashboard,
    source_code_link: "https://github.com/mintekoo/Ride-Admin-Dashboard",
  },
  {
    id: "delalaye-backend",
    name: "Delalaye Backend System",
    subtitle: "Database Seeding & Validation",
    category: "Backend & APIs",
    is_company_project: true,
    company_name: "Abyssinia Software Technology",
    description:
      "Structured database seeding and validation system for the Delalaye backend using Sequelize ORM and MySQL. Organized seeders for reference data, demo scenarios, and role-based access control with integrity checks across 27 models.",
    tags: [
      { name: "Node.js", color: "green-text-gradient" },
      { name: "Sequelize ORM", color: "blue-text-gradient" },
      { name: "MySQL", color: "orange-text-gradient" },
      { name: "Database Management", color: "pink-text-gradient" },
      { name: "Software Testing", color: "green-text-gradient" },
    ],
    image: delalayeBackend,
    source_code_link: "https://github.com/mintekoo/Delalaye-Backend-Seeder",
  },
  {
    id: "chat-app-mern",
    name: "Real-Time Chat App",
    subtitle: "MERN Stack & Socket.io",
    category: "Full-Stack",
    description:
      "Dynamic real-time chat application built with the MERN stack, enhanced with Socket.io for live messaging and TailwindCSS + Daisy UI for responsive design. Features secure JWT authentication, online user presence tracking, and global state management with Zustand.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "MongoDB", color: "orange-text-gradient" },
      { name: "Socket.io", color: "pink-text-gradient" },
      { name: "Zustand", color: "blue-text-gradient" },
    ],
    image: chatApp,
    source_code_link: "https://github.com/mintekoo/Chat-App-MERN",
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
      { name: "Backend Development", color: "green-text-gradient" },
      { name: "SQL", color: "orange-text-gradient" },
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
      { name: "React", color: "blue-text-gradient" },
      { name: "JavaScript", color: "green-text-gradient" },
      { name: "Database Management", color: "orange-text-gradient" },
      { name: "REST APIs", color: "pink-text-gradient" },
      { name: "Web Development", color: "blue-text-gradient" },
    ],
    image: jobPortal,
    source_code_link: "https://github.com/mintekoo/Job-Portal-System",
  },
];

export { services, technologies, experiences, testimonials, projects };
