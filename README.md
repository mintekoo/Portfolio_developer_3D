# 3D Developer Portfolio - Minte

A modern, responsive 3D developer portfolio showcasing interactive WebGL visuals, full-stack projects, and real-world work experience. Built with **React 18**, **Three.js / React Three Fiber**, **Tailwind CSS**, and **Framer Motion**.

## 🌐 Live Demo

<!-- LIVE_SITE_START -->

🌐 [View Live Portfolio](https://mintekoo.github.io/Portfolio_developer_3D/)

<!-- LIVE_SITE_END -->

- **Alternative Mirror (Render):** [minte-portfolio.onrender.com](https://minte-portfolio.onrender.com)

---

## ✨ Features

- **Interactive 3D Graphics & Visuals**:
  - **Hero Desktop PC**: 3D computer workstation model with realistic directional lighting, responsive camera framing, and intuitive OrbitControls.
  - **Interactive Tech Spheres**: Floating 3D technology balls featuring decals, dynamic hover physics, and smooth interaction.
  - **Orbiting Earth**: 3D globe with auto-rotation in the contact section.
  - **Animated Starfield**: Particle-based 3D background canvas rendering across the hero and contact sections.
  - **Performance Engineered**: Viewport-based rendering, texture compression, lazy WebGL context activation, and throttled animation loops maintaining 60 FPS.
- **Responsive & Accessible (a11y)**:
  - Mobile navigation drawer with full ARIA accessibility, keyboard trapping, and touch gestures.
  - Fluid responsive layouts across mobile, tablet, laptop, and ultra-wide displays.
  - Accessible forms, semantic HTML5 tags, and descriptive alt attributes.
- **Interactive Contact Form**:
  - Real-time client-side validation, loading spinners, and non-blocking toast alerts.
  - Fully integrated with [EmailJS](https://www.emailjs.com/) for instant message delivery without requiring a dedicated backend server.
- **Optimized Production Bundling**:
  - Vite code-splitting separating React, Three.js/Fiber/Drei, and motion libraries into optimized vendor chunks.
  - Automated GitHub Actions CI/CD pipeline for GitHub Pages deployment.

---

## 🛠️ Technologies Used

- **Frontend Core**: [React 18](https://react.dev/), [React Router](https://reactrouter.com/)
- **3D & Visuals**: [Three.js](https://threejs.org/), [@react-three/fiber](https://github.com/pmndrs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei), [maath](https://github.com/pmndrs/maath)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [PostCSS](https://postcss.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [react-tilt](https://www.npmjs.com/package/react-tilt)
- **Icons & Assets**: [React Icons](https://react-icons.github.io/react-icons/)
- **Services & Tools**: [EmailJS](https://www.emailjs.com/), [Vite](https://vitejs.dev/), [ESLint](https://eslint.org/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mintekoo/Portfolio_developer_3D.git
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
