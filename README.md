# 3D Developer Portfolio - Minte

A modern, responsive 3D developer portfolio showcasing interactive WebGL visuals, full-stack projects, and real-world work experience. Built with **React 18**, **Three.js / React Three Fiber**, **Tailwind CSS**, and **Framer Motion**.

## 🌐 Live Demo

Visit the live website:
- **[minte-portfolio.onrender.com](https://minte-portfolio.onrender.com)**

---

## ✨ Features

- **Interactive 3D Graphics**:
  - Desktop PC model with dynamic lighting and camera controls in the hero section.
  - Interactive floating 3D tech icons powered by React Three Fiber with lightweight responsive fallbacks for mobile devices.
  - Orbiting 3D Earth model with auto-rotation in the contact section.
  - Starfield background rendering animated 3D particle points.
- **Responsive & Accessible**:
  - Smooth mobile navigation menu with full ARIA accessibility and keyboard support.
  - Adaptive layouts across mobile, tablet, and widescreen desktop displays.
  - Clean semantic markup with accessible links and image descriptions.
- **Interactive Contact Form**:
  - EmailJS integration with client-side input validation and non-blocking in-app alert feedback.
- **Optimized Bundling**:
  - Vite code-splitting separating React, Three.js, and motion vendors for fast initial load times.

---

## 🛠️ Technologies Used

- **Frontend Core**: [React 18](https://react.dev/), [React Router](https://reactrouter.com/)
- **3D & Visuals**: [Three.js](https://threejs.org/), [@react-three/fiber](https://github.com/pmndrs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei), [maath](https://github.com/pmndrs/maath)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [PostCSS](https://postcss.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [react-tilt](https://www.npmjs.com/package/react-tilt), [react-vertical-timeline-component](https://www.npmjs.com/package/react-vertical-timeline-component)
- **Services & Tools**: [EmailJS](https://www.emailjs.com/), [Vite](https://vitejs.dev/), [ESLint](https://eslint.org/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/WizMiner/Portfolio_developer_3D.git
   cd Portfolio_developer_3D
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local` and add your EmailJS keys:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your service details:
   ```env
   VITE_APP_EMAILJS_SERVICE_ID=your_service_id
   VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   # or
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Available Scripts

- `npm run dev` / `npm start`: Starts Vite development server at `http://localhost:3000`.
- `npm run build`: Compiles production build to `dist/`.
- `npm run lint`: Runs ESLint across the codebase.
- `npm run preview`: Previews the production build locally.
