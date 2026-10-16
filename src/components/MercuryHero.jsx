import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import mercuryAlpineBg from "../assets/mercury_alpine_bg.png";
import TechMarquee from "./TechMarquee";

const MercuryHero = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    let scrollTimeout;
    let rafId = null;
    let targetTime = 0;
    let isSeeking = false;

    const applyScrub = () => {
      if (!video) return;
      const duration = video.duration || 6.4;
      if (!isNaN(duration) && duration > 0 && !isSeeking) {
        isSeeking = true;
        video.currentTime = targetTime;
      }
      rafId = null;
    };

    const handleSeeked = () => {
      isSeeking = false;
      const duration = video.duration || 6.4;
      if (!isNaN(duration) && duration > 0 && Math.abs(video.currentTime - targetTime) > 0.08 && !rafId) {
        rafId = requestAnimationFrame(applyScrub);
      }
    };

    video.addEventListener("seeked", handleSeeked);

    const handleScroll = () => {
      const hero = document.getElementById("observatory");
      if (!hero || !video) return;

      const rect = hero.getBoundingClientRect();
      const totalHeight = hero.offsetHeight || window.innerHeight;

      // When hero is within viewport, scrub video relative to scroll progress
      if (rect.top <= 0 && rect.bottom >= 0) {
        clearTimeout(scrollTimeout);
        const progress = Math.min(1, Math.max(0, -rect.top / totalHeight));
        const duration = video.duration || 6.4;
        if (!isNaN(duration) && duration > 0) {
          targetTime = progress * duration;
          if (!rafId) {
            rafId = requestAnimationFrame(applyScrub);
          }
        }

        // Resume gentle playback when scroll pauses
        scrollTimeout = setTimeout(() => {
          if (video && video.paused) {
            video.play().catch(() => {});
          }
        }, 150);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      video.removeEventListener("seeked", handleSeeked);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    setSubmitted(true);
    try {
      sessionStorage.setItem("prefill_email", cleanEmail);
      window.dispatchEvent(new CustomEvent("prefill-email", { detail: cleanEmail }));
    } catch (_) {}

    // Smoothly scroll to the contact section after brief confirmation
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  };

  return (
    <div id="observatory" className="relative w-full bg-primary text-[#ededf3]">
      {/* =========================================================================
          HERO PAGE: 100vh FULL-BLEED ALPINE BLUE-HOUR ATMOSPHERE
          ========================================================================= */}
      <section className="relative w-full h-screen min-h-[640px] flex flex-col justify-between overflow-hidden">
        {/* Full-bleed Alpine Video Background (Direct Mercury scrub video with fallback poster) */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={mercuryAlpineBg}
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 pointer-events-none select-none"
        >
          <source src="/hero-scrub-lg.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Atmospheric Cosmic Obsidian & Violet-Cobalt Vignette Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5, 8, 22, 0.75) 0%, rgba(5, 8, 22, 0.2) 40%, rgba(5, 8, 22, 0.65) 80%, rgba(5, 8, 22, 0.98) 100%), radial-gradient(circle at 50% 38%, rgba(145, 94, 255, 0.16) 0%, rgba(82, 102, 235, 0.12) 45%, transparent 70%)",
          }}
        />

        {/* Centered Hero Content Stack */}
        <div className="relative z-10 w-full max-w-[760px] mx-auto px-6 text-center flex flex-col items-center justify-center flex-1 my-auto">
          {/* Main Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[38px] sm:text-[54px] lg:text-[64px] font-normal tracking-[0.012em] text-[#ededf3] leading-[1.12]"
          >
            Radically disciplined engineering
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] text-[#ededf3]/90 font-normal leading-[1.5] max-w-[560px]"
          >
            Architecting high-concurrency systems, spatial 3D computing, and
            calibrated web platforms with mathematical restraint.
          </motion.p>

          {/* Email Capture Pill Input with Cobalt-to-Violet Action */}
          <motion.form
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            onSubmit={handleInquirySubmit}
            className="mt-8 sm:mt-10 w-full max-w-[460px] flex items-center"
          >
            <div className="relative flex-1">
              <label htmlFor="mercury-inquiry-email" className="sr-only">
                Email address for project inquiries
              </label>
              <input
                id="mercury-inquiry-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email address for project inquiries"
                className="w-full h-[48px] bg-[#151030]/65 backdrop-blur-xl text-[#ededf3] placeholder-[#aaa6c3] text-[15px] pl-5 pr-3 border border-white/10 border-r-0 rounded-l-[32px] focus:outline-none focus:border-[#915eff] transition-colors"
              />
            </div>
            <button
              type="submit"
              aria-live="polite"
              className="h-[48px] px-6 sm:px-7 bg-gradient-to-r from-[#5266eb] via-[#705bf2] to-[#915eff] hover:opacity-95 hover:shadow-[0_0_24px_rgba(145,94,255,0.4)] text-[#ffffff] text-[15px] font-medium rounded-r-[32px] border-0 transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              {submitted ? "Inquiry Sent ✓" : "Connect"}
            </button>
          </motion.form>
        </div>

        {/* Bottom Floating Disclaimer Strip */}
        <div className="relative z-10 w-full px-6 pb-6 flex flex-col items-center gap-3">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="px-6 py-2.5 rounded-full bg-[#151030]/75 backdrop-blur-xl border border-white/10 text-secondary text-[12px] sm:text-[13px] text-center max-w-[820px] shadow-sm"
          >
            Minte is a software engineer specializing in full-stack architecture, spatial 3D web systems, and high-performance interfaces.
          </motion.div>

          {/* Smooth Scroll Indicator pointing down to Technologies marquee */}
          <a
            href="#tech-marquee"
            aria-label="Scroll down to Technologies"
            className="text-secondary hover:text-white text-[11px] uppercase tracking-[0.14em] flex items-center gap-1.5 transition-colors pt-1 group"
          >
            <span>Scroll for Technologies</span>
            <span className="text-[14px] text-[#915eff] group-hover:translate-y-0.5 transition-transform">↓</span>
          </a>
        </div>
      </section>

      {/* Infinite Technologies Ribbon */}
      <TechMarquee />
    </div>
  );
};

export default MercuryHero;
