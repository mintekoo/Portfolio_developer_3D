import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowTopRightOnSquare, HiCodeBracket, HiSparkles, HiPlay, HiPause, HiChevronLeft, HiChevronRight, HiCommandLine } from "react-icons/hi2";

/**
 * HoverExpandGallery
 * A luxury interactive horizontal expanding accordion gallery showcasing flagship projects.
 *
 * @param {Array} items - List of project objects to display in the gallery
 * @param {number} defaultIndex - Index of the card expanded by default (default 0)
 * @param {boolean} autoPlay - Enable auto-cycling through cards when not hovered
 * @param {number} autoPlayInterval - Delay between cycles in ms (default 5000)
 * @param {function} onSelectProject - Callback when clicking "Inspect Architecture" or expanding card
 */
const HoverExpandGallery = ({
  items = [],
  defaultIndex = 0,
  autoPlay = true,
  autoPlayInterval = 5000,
  onSelectProject,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const galleryRef = useRef(null);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Cycle to next project
  const handleNext = useCallback(() => {
    if (items.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  // Cycle to previous project
  const handlePrev = useCallback(() => {
    if (items.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Auto-play timer
  useEffect(() => {
    if (!autoPlay || isPaused || isManualPaused || items.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, isManualPaused, items.length, autoPlayInterval, handleNext]);

  // Keyboard navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveIndex(index);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div
      ref={galleryRef}
      className="relative w-full my-8 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Gallery Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#915eff]/15 border border-[#915eff]/30">
            <HiSparkles className="w-3.5 h-3.5 text-[#915eff] animate-pulse" />
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.16em] uppercase text-[#dfd9ff]">
              Featured Flagship Showcase
            </span>
          </div>
          <span className="text-secondary text-xs hidden sm:inline">
            • Hover to expand & inspect
          </span>
        </div>

        {/* Gallery Controls (Play/Pause, Prev, Next, Indicator Dots) */}
        <div className="flex items-center gap-2">
          {/* Indicator Dots */}
          <div className="flex items-center gap-1.5 mr-2">
            {items.map((item, idx) => (
              <button
                key={item.id || idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`View slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === idx
                    ? "w-6 h-2 bg-[#915eff] shadow-[0_0_8px_rgba(145,94,255,0.7)]"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* AutoPlay Toggle */}
          <button
            type="button"
            onClick={() => setIsManualPaused((prev) => !prev)}
            aria-label={isManualPaused ? "Resume slideshow" : "Pause slideshow"}
            className="p-1.5 rounded-lg bg-tertiary/70 border border-white/10 hover:border-white/30 text-secondary hover:text-white transition-colors cursor-pointer"
            title={isManualPaused ? "Resume auto-rotation" : "Pause auto-rotation"}
          >
            {isManualPaused ? (
              <HiPlay className="w-3.5 h-3.5 text-[#915eff]" />
            ) : (
              <HiPause className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project"
              className="p-1.5 rounded-lg bg-tertiary/70 border border-white/10 hover:border-white/30 text-secondary hover:text-white transition-colors cursor-pointer"
            >
              <HiChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project"
              className="p-1.5 rounded-lg bg-tertiary/70 border border-white/10 hover:border-white/30 text-secondary hover:text-white transition-colors cursor-pointer"
            >
              <HiChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Horizontal Accordion Container */}
      <div
        className={`w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-black/60 backdrop-blur-2xl p-2 sm:p-2.5 shadow-2xl flex ${
          isMobile
            ? "flex-col gap-2.5 min-h-[540px]"
            : "flex-row items-stretch gap-2.5 lg:gap-3.5 h-[460px] lg:h-[500px]"
        }`}
      >
        {items.map((project, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={project.id || `gallery-item-${index}`}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onMouseEnter={() => {
                if (!isMobile) setActiveIndex(index);
              }}
              style={{
                flex: isMobile
                  ? isActive
                    ? "4 0 auto"
                    : "0.8 0 auto"
                  : isActive
                    ? "5 1 0%"
                    : "1 1 0%",
              }}
              className={`relative overflow-hidden rounded-2xl transition-[flex,transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#915eff]/50 ${
                isActive
                  ? "border border-[#915eff]/60 ring-1 ring-[#915eff]/40 shadow-[0_0_35px_rgba(145,94,255,0.3)] z-10"
                  : "border border-white/[0.06] hover:border-white/20 hover:brightness-110"
              }`}
            >
              {/* Background Image with Dynamic Saturation & Scale */}
              <div
                className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out ${
                  isActive
                    ? "scale-105 brightness-[0.72] saturate-100"
                    : "scale-100 brightness-[0.38] saturate-50 group-hover:brightness-50"
                }`}
                style={{
                  backgroundImage: `url(${project.image})`,
                }}
              />

              {/* Multi-Stop Depth Vignette */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isActive
                    ? "bg-gradient-to-t from-black via-black/65 to-black/25 opacity-95"
                    : "bg-black/60 group-hover:bg-black/50"
                }`}
              />

              {/* Number Watermark (Top Corner) */}
              <div
                className={`absolute top-3 left-3.5 z-10 font-black text-sm tracking-wider transition-colors duration-300 ${
                  isActive
                    ? "text-[#915eff] drop-shadow-[0_0_8px_rgba(145,94,255,0.6)]"
                    : "text-white/40"
                }`}
              >
                0{index + 1}
              </div>

              {/* INACTIVE STATE: Sleek Vertical Pillar Label (Desktop only) */}
              {!isActive && !isMobile && (
                <div className="absolute inset-0 flex flex-col justify-between items-center py-5 px-1.5 pointer-events-none">
                  {/* Category mini dot */}
                  <div className="w-1.5 h-1.5 rounded-full bg-[#915eff]/70 mt-6" />

                  {/* Vertically rotated title */}
                  <div
                    className="text-white/80 font-bold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap select-none"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {project.name}
                  </div>

                  {/* Status Indicator */}
                  <span className="w-2 h-2 rounded-full bg-emerald-400/80 mb-2 shadow-[0_0_6px_#34d399]" />
                </div>
              )}

              {/* INACTIVE STATE: Horizontal collapsed strip on Mobile */}
              {!isActive && isMobile && (
                <div className="relative h-14 flex items-center justify-between px-4 py-2 z-10">
                  <div className="flex items-center gap-2 pl-6">
                    <span className="w-2 h-2 rounded-full bg-[#915eff]" />
                    <span className="text-white font-bold text-sm tracking-tight truncate max-w-[200px]">
                      {project.name}
                    </span>
                  </div>
                  <span className="text-xs text-secondary/80 font-medium">
                    Tap to expand →
                  </span>
                </div>
              )}

              {/* ACTIVE STATE: Rich Full-Width Content Layer */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: 0.08 }}
                    className="relative z-10 w-full h-full flex flex-col justify-between p-4 sm:p-6"
                  >
                    {/* Top Meta Badges Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pl-8 sm:pl-10">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        {/* Company Badge */}
                        {project.is_company_project && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-[#915eff]/20 text-[#dfd9ff] border border-[#915eff]/40 backdrop-blur-md">
                            🏢 {project.company_name || "Company System"}
                          </span>
                        )}

                        {/* Category Pill */}
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-white/10 text-white/90 border border-white/15 backdrop-blur-md">
                          {project.category || "Full-Stack"}
                        </span>
                      </div>

                      {/* Active Live Pulse */}
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-[11px] font-medium backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Interactive Flagship</span>
                      </div>
                    </div>

                    {/* Bottom Project Details Block */}
                    <div className="flex flex-col gap-2.5 sm:gap-3 mt-auto">
                      <div>
                        {project.subtitle && (
                          <p className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-wider text-[#915eff]">
                            {project.subtitle}
                          </p>
                        )}
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight mt-0.5">
                          {project.name}
                        </h3>
                      </div>

                      {/* Description Snippet */}
                      <p className="text-[12px] sm:text-[13px] text-secondary leading-relaxed line-clamp-2 max-w-2xl">
                        {project.description}
                      </p>

                      {/* Tech Stack Pills */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 py-0.5">
                          {project.tags.slice(0, 5).map((tag) => (
                            <span
                              key={tag.name}
                              className={`inline-flex items-center gap-1 text-[11px] sm:text-[12px] font-medium px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] ${
                                tag.color || "text-[#d8c5ff]"
                              }`}
                            >
                              <HiCommandLine className="w-2.5 h-2.5 shrink-0 text-[#915eff]" />
                              <span>{tag.name}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Buttons Row */}
                      <div className="flex flex-wrap items-center gap-2 pt-1.5">
                        {/* Primary: Inspect Architecture Modal */}
                        {onSelectProject && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectProject(project);
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#915eff] to-[#7c4dff] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#915eff]/30 hover:shadow-[#915eff]/50 hover:scale-[1.02] transition-all cursor-pointer"
                          >
                            <HiSparkles className="w-4 h-4 text-white" />
                            <span>Inspect Architecture</span>
                          </button>
                        )}

                        {/* Secondary: Live Demo Link */}
                        {project.live_demo_link && (
                          <a
                            href={project.live_demo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/15 transition-all cursor-pointer"
                            title="Open live demonstration"
                          >
                            <HiArrowTopRightOnSquare className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Live Demo</span>
                          </a>
                        )}

                        {/* Secondary: Source Code Link */}
                        {project.source_code_link && (
                          <a
                            href={project.source_code_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/15 transition-all cursor-pointer"
                            title="View source repository"
                          >
                            <HiCodeBracket className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HoverExpandGallery;
