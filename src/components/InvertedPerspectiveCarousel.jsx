import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiChevronLeft,
  HiChevronRight,
  HiPlay,
  HiPause,
  HiSparkles,
  HiArrowsRightLeft,
  HiBriefcase,
  HiCodeBracket,
  HiRocketLaunch,
  HiAcademicCap,
} from "react-icons/hi2";

const roleIcons = {
  "abyssinia-software": HiCodeBracket,
  "freelance-developer": HiRocketLaunch,
  "jit-developer": HiAcademicCap,
};

/**
 * InvertedPerspectiveCarousel
 * A luxury 3D Coverflow Carousel featuring customizable Inverted (concave)
 * and Classic (convex) 3D perspective animations, depth layers, and interactive controls.
 *
 * @param {Array} items - List of items (e.g. experiences or projects)
 * @param {number} activeIndex - Optional controlled active index
 * @param {function} onSelect - Callback when active card changes (index, item) => void
 * @param {boolean} defaultInverted - Start in inverted perspective mode (default: true)
 * @param {boolean} autoPlay - Enable auto-cycling when not hovered (default: true)
 * @param {number} autoPlayInterval - Interval in ms (default: 5000)
 */
const InvertedPerspectiveCarousel = ({
  items = [],
  activeIndex: controlledIndex,
  onSelect,
  defaultInverted = true,
  autoPlay = true,
  autoPlayInterval = 5000,
}) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const [inverted, setInverted] = useState(defaultInverted);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const containerRef = useRef(null);

  const currentIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;

  // Responsive breakpoint tracking across all device sizes
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setWindowWidth(window.innerWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const handleSelect = useCallback(
    (index) => {
      if (index < 0 || index >= items.length) return;
      if (controlledIndex === undefined) {
        setInternalIndex(index);
      }
      if (onSelect) {
        onSelect(index, items[index]);
      }
    },
    [controlledIndex, items, onSelect]
  );

  const handleNext = useCallback(() => {
    if (items.length === 0) return;
    const nextIdx = (currentIndex + 1) % items.length;
    handleSelect(nextIdx);
  }, [currentIndex, items.length, handleSelect]);

  const handlePrev = useCallback(() => {
    if (items.length === 0) return;
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    handleSelect(prevIdx);
  }, [currentIndex, items.length, handleSelect]);

  // Auto-play interval timer
  useEffect(() => {
    if (!autoPlay || isPaused || items.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, items.length, autoPlayInterval, handleNext]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
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
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full my-2 sm:my-4 select-none focus:outline-none"
    >
      {/* Interactive Controls & Options Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#915eff]/15 border border-[#915eff]/30">
            <HiSparkles className="w-3.5 h-3.5 text-[#915eff] animate-pulse" />
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.16em] uppercase text-[#dfd9ff]">
              3D Inverted Coverflow
            </span>
          </div>

          <span className="text-secondary text-xs hidden sm:inline">
            • Centered Depth Perspective & Drag Navigation
          </span>
        </div>

        {/* Customizable Navigation Controls */}
        <div className="flex items-center gap-2">
          {/* Indicator Dots */}
          <div className="flex items-center gap-1.5 mr-1 hidden xs:flex">
            {items.map((item, idx) => (
              <button
                key={item.id || idx}
                type="button"
                onClick={() => handleSelect(idx)}
                aria-label={`View slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? "w-6 h-2 bg-[#915eff] shadow-[0_0_8px_rgba(145,94,255,0.7)]"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Inverted vs Classic Mode Toggle */}
          <button
            type="button"
            onClick={() => setInverted((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-tertiary/80 border border-white/10 hover:border-[#915eff]/50 text-white transition-all cursor-pointer shadow-md"
            title="Toggle between Inverted (concave) and Classic (convex) 3D perspective"
          >
            <HiArrowsRightLeft className="w-3.5 h-3.5 text-[#915eff]" />
            <span className="hidden sm:inline">
              {inverted ? "Inverted Perspective" : "Classic Coverflow"}
            </span>
          </button>

          {/* AutoPlay Toggle */}
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            className="p-1.5 rounded-lg bg-tertiary/70 border border-white/10 hover:border-white/30 text-secondary hover:text-white transition-colors cursor-pointer"
            title={isPaused ? "Play slideshow" : "Pause slideshow"}
          >
            {isPaused ? (
              <HiPlay className="w-3.5 h-3.5 text-[#915eff]" />
            ) : (
              <HiPause className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="p-1.5 rounded-lg bg-tertiary/70 border border-white/10 hover:border-[#915eff]/50 text-secondary hover:text-white transition-colors cursor-pointer"
            >
              <HiChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="p-1.5 rounded-lg bg-tertiary/70 border border-white/10 hover:border-[#915eff]/50 text-secondary hover:text-white transition-colors cursor-pointer"
            >
              <HiChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Luxury Frame Enclosure matching HoverExpandGallery */}
      <div className="w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-black/60 backdrop-blur-2xl p-2 sm:p-4 shadow-2xl relative">
        {/* Ambient Top Glow Bar */}
        <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[#915eff]/40 to-transparent pointer-events-none" />

        {/* 3D Perspective Stage - Responsive Height, Touch Drag & Circular Symmetry */}
        <div
          className="relative w-full h-[530px] xs:h-[540px] sm:h-[550px] md:h-[565px] flex items-center justify-center overflow-hidden py-1 sm:py-2"
          style={{
            perspective: isMobile ? "800px" : isTablet ? "1000px" : "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, index) => {
              const total = items.length;
              let offset = index - currentIndex;

              // Circular wrap: guarantees perfectly balanced 3D wings (Left, Center, Right)
              if (total >= 3) {
                if (offset > total / 2) offset -= total;
                if (offset < -total / 2) offset += total;
              }

              const absOffset = Math.abs(offset);
              const isCenter = offset === 0;

              // Only render cards within active view window (-2 to +2)
              if (absOffset > 2) return null;

              // 3D Perspective Transform Calculations with responsive mobile scaling
              const rotationY = inverted
                ? offset * (isMobile ? -18 : isTablet ? -25 : -32)
                : offset * (isMobile ? 22 : isTablet ? 30 : 38);

              const translateX = isMobile
                ? offset * Math.min(windowWidth * 0.28, 110)
                : isTablet
                ? offset * 210
                : offset * 325;

              const translateZ = -absOffset * (isMobile ? 55 : isTablet ? 85 : 120);
              const scale = Math.max(isMobile ? 0.86 : 0.75, 1 - absOffset * (isMobile ? 0.08 : 0.12));
              const opacity = Math.max(0.35, 1 - absOffset * 0.28);
              const zIndex = 50 - absOffset * 10;

              return (
                <motion.div
                  key={item.id || `coverflow-card-${index}`}
                  onClick={() => handleSelect(index)}
                  drag={isCenter ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset: dragOffset, velocity }) => {
                    if (dragOffset.x > 45 || velocity.x > 400) {
                      handlePrev();
                    } else if (dragOffset.x < -45 || velocity.x < -400) {
                      handleNext();
                    }
                  }}
                  style={{
                    position: "absolute",
                    zIndex,
                    transformStyle: "preserve-3d",
                    cursor: isCenter ? "grab" : "pointer",
                  }}
                  whileDrag={{ cursor: "grabbing" }}
                  animate={{
                    x: translateX,
                    z: translateZ,
                    rotateY: rotationY,
                    scale,
                    opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 28,
                    mass: 0.9,
                  }}
                  className={`w-[88vw] xs:w-[360px] sm:w-[460px] md:w-[500px] lg:w-[540px] h-[485px] xs:h-[495px] sm:h-[505px] md:h-[515px] rounded-3xl p-6 sm:p-7 md:p-8 backdrop-blur-2xl flex flex-col justify-between transition-[box-shadow,border-color] duration-300 ${
                    isCenter
                      ? "bg-gradient-to-br from-[#1c163a]/95 via-[#130f28]/95 to-[#0b0818]/95 border-2 border-[#915eff] shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(145,94,255,0.3)] ring-1 ring-[#915eff]/40"
                      : "bg-gradient-to-br from-[#15102a]/85 via-[#0e0a1c]/85 to-[#080512]/90 border border-white/10 hover:border-white/30 hover:brightness-110 shadow-xl"
                  }`}
                >
                  {/* Ambient Top Light Bar */}
                  <div
                    className="absolute top-0 left-10 right-10 h-[2px] rounded-full opacity-80"
                    style={{
                      background: `linear-gradient(to right, transparent, ${item.accentColor || "#915eff"}, transparent)`,
                    }}
                  />

                  {/* Card Header: Branded Avatar & Metadata */}
                  <div className="shrink-0 flex items-start justify-between gap-3 pb-3.5 border-b border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      {/* Company Role Icon Avatar */}
                      <div
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center p-2.5 shrink-0 shadow-lg"
                        style={{
                          backgroundColor: item.iconBg || "#1d1836",
                          border: `2px solid ${item.accentColor || "#915eff"}`,
                          boxShadow: isCenter ? `0 0 16px ${item.accentColor || "#915eff"}40` : "none",
                        }}
                      >
                        {(() => {
                          const IconComponent = roleIcons[item.id] || HiBriefcase;
                          return (
                            <IconComponent
                              className="w-5 h-5 sm:w-6 sm:h-6"
                              style={{ color: item.accentColor || "#ffffff" }}
                              aria-hidden="true"
                            />
                          );
                        })()}
                      </div>

                      <div>
                        <h4 className="text-white text-base sm:text-lg font-bold leading-tight">
                          {item.company_name}
                        </h4>
                        <p className="text-xs sm:text-[13px] text-secondary/90 mt-0.5">
                          {item.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      {item.status === "Active Role" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.25)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                          <span>Active Role</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/15 text-blue-300 border border-blue-500/30">
                          <span>Completed</span>
                        </span>
                      )}

                      <span className="text-[11px] sm:text-xs font-semibold text-[#b08eff]">
                        {item.date}
                      </span>
                    </div>
                  </div>

                  {/* Title & Role Category */}
                  <div className="shrink-0 pt-2.5 pb-1">
                    <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#915eff]">
                      {item.type || "Software Engineering"}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight mt-0.5">
                      {item.title}
                    </h3>
                  </div>

                  {/* Key Contributions - Spacious, Natural Line-Height, Zero Truncation */}
                  <ul className="shrink-0 space-y-2.5 text-[13px] sm:text-[14px] text-white/90 leading-relaxed my-1">
                    {item.points &&
                      item.points.slice(0, 2).map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5">
                          <span
                            className="font-bold select-none text-xs sm:text-sm shrink-0 mt-0.5"
                            style={{ color: item.accentColor || "#915eff" }}
                          >
                            ✓
                          </span>
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                  </ul>

                  {/* Delivered Systems & Core Technologies Badges */}
                  <div className="shrink-0 pt-2.5 border-t border-white/[0.08]">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {item.connectedProjects &&
                        item.connectedProjects.slice(0, 2).map((proj) => (
                          <span
                            key={proj}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#00cea8]/10 text-[#5eead4] border border-[#00cea8]/30 shadow-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00cea8]" />
                            <span>{proj}</span>
                          </span>
                        ))}

                      {item.skills &&
                        item.skills.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-[#dfd9ff] border border-white/10 hover:border-[#915eff]/40 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Bottom Milestone Card Focus Indicator */}
                  <div className="shrink-0 h-8 flex items-center justify-between border-t border-white/[0.08] pt-2 mt-auto">
                    {isCenter ? (
                      <div className="flex items-center justify-between w-full text-xs font-semibold">
                        <span className="inline-flex items-center gap-2 text-[#915eff] font-bold">
                          <span className="w-2 h-2 rounded-full bg-[#915eff] animate-pulse shadow-[0_0_8px_#915eff]" />
                          <span>Active Milestone</span>
                        </span>
                        <span className="text-secondary text-xs font-medium">
                          Slide {index + 1} of {items.length}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full text-xs text-secondary/80 group-hover:text-white transition-colors">
                        <span>Click card to inspect</span>
                        <span className="text-xs text-[#915eff] font-bold">
                          Slide {index + 1} →
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Milestone Indicator Pills inside luxury frame */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-2 pt-3 border-t border-white/[0.06] w-full">
          {items.map((item, idx) => {
            const isSelected = currentIndex === idx;
            return (
              <button
                key={item.id || idx}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer border ${
                  isSelected
                    ? "bg-[#1d1836] text-white border-[#915eff] shadow-[0_0_12px_rgba(145,94,255,0.4)] scale-105"
                    : "bg-tertiary/40 text-secondary hover:text-white border-white/[0.08]"
                }`}
              >
                <span
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                  style={{
                    backgroundColor: item.accentColor || "#915eff",
                    boxShadow: isSelected
                      ? `0 0 8px ${item.accentColor || "#915eff"}`
                      : "none",
                  }}
                />
                <span>{item.company_name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InvertedPerspectiveCarousel;
