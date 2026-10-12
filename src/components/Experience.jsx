import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import { CareerCanvas } from "./canvas";

const ExperienceCard = ({
  experience,
  index,
  isActive,
  onSelect,
}) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.18, 0.75)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      onClick={() => onSelect(index)}
      className="relative pl-8 sm:pl-12 group cursor-pointer"
    >
      {/* Milestone Node on Laser Track */}
      <div
        className={`absolute -left-5 sm:-left-6 top-6 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center p-2.5 transition-all duration-300 z-10 ${
          isActive
            ? "scale-110 shadow-2xl ring-4 ring-white/30"
            : "hover:scale-110"
        }`}
        style={{
          backgroundColor: experience.iconBg || "#1d1836",
          border: `2px solid ${experience.accentColor || "#915eff"}`,
          boxShadow: isActive
            ? `0 0 24px ${experience.accentColor || "#915eff"}80`
            : `0 0 14px ${experience.accentColor || "#915eff"}40`,
        }}
        title={`${experience.title} at ${experience.company_name}`}
      >
        <img
          src={experience.icon}
          alt={experience.company_name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Horizontal Connector to Card */}
      <div
        className="absolute left-6 sm:left-6 top-11 w-4 sm:w-6 h-0.5 opacity-60 hidden sm:block"
        style={{
          background: `linear-gradient(to right, ${experience.accentColor || "#915eff"}, transparent)`,
        }}
      />

      {/* Glassmorphism Experience Card */}
      <div
        className={`p-6 sm:p-8 rounded-2xl backdrop-blur-xl transition-all duration-300 ease-out border ${
          isActive
            ? "bg-gradient-to-br from-[#1d1836] via-[#161132] to-[#0f0c22] border-[#915eff] shadow-2xl shadow-[#915eff]/25 ring-1 ring-[#915eff]/50"
            : "bg-gradient-to-br from-[#1d1836]/90 via-[#151030]/80 to-[#0e0b1f]/90 border-white/[0.08] hover:border-[#915eff]/40 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#915eff]/15"
        }`}
      >
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/[0.06] pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              {experience.status === "Active Role" ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                  <span>Active Role</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  <span>Completed</span>
                </span>
              )}
              {experience.type && (
                <span className="text-[12px] text-secondary hidden md:inline">
                  • {experience.type}
                </span>
              )}
            </div>

            <h3 className="text-white text-[22px] sm:text-[26px] font-extrabold tracking-tight leading-tight">
              {experience.title}
            </h3>
            <p className="text-[#b08eff] text-[16px] sm:text-[17px] font-semibold mt-0.5">
              {experience.company_name}
            </p>
          </div>

          <div className="sm:text-right shrink-0">
            <span
              className="inline-block px-3.5 py-1 rounded-full text-[12px] sm:text-[13px] font-semibold tracking-wide"
              style={{
                backgroundColor: `${experience.accentColor || "#915eff"}15`,
                color: experience.accentColor || "#915eff",
                border: `1px solid ${experience.accentColor || "#915eff"}35`,
              }}
            >
              {experience.date}
            </span>
            {experience.location && (
              <p className="text-secondary text-[12px] mt-1.5 hidden sm:block">
                📍 {experience.location}
              </p>
            )}
          </div>
        </div>

        {/* Location for mobile screens */}
        {experience.location && (
          <p className="text-secondary text-[12px] mt-2 sm:hidden">
            📍 {experience.location}
          </p>
        )}

        {/* Bullet Points / Deliverables */}
        <ul className="mt-5 space-y-3.5">
          {experience.points.map((point, pIndex) => (
            <li
              key={`point-${pIndex}`}
              className="flex items-start gap-3 text-secondary text-[14px] sm:text-[15px] leading-[1.75]"
            >
              <span
                className="font-bold select-none text-[16px] shrink-0 mt-0.5"
                style={{ color: experience.accentColor || "#915eff" }}
              >
                ✓
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {/* Connected Delivered Projects */}
        {experience.connectedProjects && experience.connectedProjects.length > 0 && (
          <div className="mt-6 pt-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-2 mb-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: experience.accentColor || "#915eff" }}
              />
              <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-secondary">
                Delivered Systems & Verified Deployments
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {experience.connectedProjects.map((proj) => (
                <span
                  key={proj}
                  className="px-2.5 py-1 rounded-lg text-[12px] font-medium bg-black/40 text-white/90 border border-white/[0.08] hover:border-white/20 transition-colors"
                >
                  🚀 {proj}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Core Tech Stack */}
        {experience.skills && experience.skills.length > 0 && (
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
            {experience.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-0.5 rounded-md text-[11px] sm:text-[12px] font-medium bg-white/[0.04] text-[#d8c5ff] border border-white/[0.08] hover:border-[#915eff]/40 transition-colors"
              >
                #{skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const containerRef = useRef(null);

  // Scroll-linked progress tracking for the laser rail
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 60%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  const laserHeadTop = useTransform(scaleY, (v) => `${Math.min(Math.max(v * 100, 0), 100)}%`);

  const filteredExperiences = selectedFilter === "all"
    ? experiences
    : experiences.filter((exp) => exp.id === selectedFilter);

  const handleSelectMilestone = (index) => {
    setActiveMilestone(index);
    if (selectedFilter !== "all" && experiences[index]) {
      setSelectedFilter(experiences[index].id);
    }
  };

  return (
    <>
      <motion.div variants={textVariant()} className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#915eff]/10 border border-[#915eff]/20 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#915eff] animate-pulse" />
          <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-[#915eff]">
            Career Trajectory
          </span>
        </div>
        <h2 className={`${styles.sectionHeadText}`}>
          Work Experience.
        </h2>
      </motion.div>

      {/* Interactive 3D WebGL Career Matrix Canvas */}
      <motion.div
        variants={fadeIn("up", "spring", 0.1, 0.75)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <CareerCanvas
          activeMilestone={activeMilestone}
          onSelectMilestone={handleSelectMilestone}
        />
      </motion.div>

      {/* Milestone Navigation & Filter Pills with Sliding Indicator */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-6 mb-12">
        <button
          type="button"
          onClick={() => setSelectedFilter("all")}
          className={`relative px-4 py-2 rounded-full text-[13px] sm:text-[14px] font-medium transition-colors cursor-pointer border ${
            selectedFilter === "all"
              ? "text-white border-transparent"
              : "text-secondary hover:text-white border-white/[0.08] bg-tertiary/40"
          }`}
        >
          {selectedFilter === "all" && (
            <motion.div
              layoutId="activeFilterPill"
              className="absolute inset-0 rounded-full bg-[#915eff] shadow-lg shadow-[#915eff]/30"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <span className="relative z-10 font-semibold">
            All Roles ({experiences.length})
          </span>
        </button>

        {experiences.map((exp, idx) => {
          const isFilterActive = selectedFilter === exp.id;
          return (
            <button
              key={exp.id || exp.company_name}
              type="button"
              onClick={() => {
                setSelectedFilter(exp.id);
                setActiveMilestone(idx);
              }}
              className={`relative px-4 py-2 rounded-full text-[13px] sm:text-[14px] font-medium transition-colors cursor-pointer flex items-center gap-2 border ${
                isFilterActive
                  ? "text-white border-transparent"
                  : "text-secondary hover:text-white border-white/[0.08] bg-tertiary/40"
              }`}
            >
              {isFilterActive && (
                <motion.div
                  layoutId="activeFilterPill"
                  className="absolute inset-0 rounded-full bg-[#1e1740] border border-[#915eff]/60 shadow-lg shadow-[#915eff]/30"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span
                className="relative z-10 w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: exp.accentColor || "#915eff" }}
              />
              <span className="relative z-10">{exp.company_name}</span>
            </button>
          );
        })}
      </div>

      {/* Custom Cyberpunk Glassmorphic Timeline with Scroll-Linked Laser Rail */}
      <div
        ref={containerRef}
        className="relative max-w-5xl mx-auto pl-2 sm:pl-4"
      >
        {/* Background Laser Rail */}
        <div className="absolute left-[3px] sm:left-[5px] top-6 bottom-8 w-1 bg-white/[0.08] rounded-full" />

        {/* Dynamic Scroll-Linked Filling Laser Line */}
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className="absolute left-[3px] sm:left-[5px] top-6 bottom-8 w-1 bg-gradient-to-b from-[#915eff] via-[#00cea8] to-[#00b4d8] rounded-full shadow-[0_0_16px_#915eff]"
        />

        {/* Traveling Laser Tip */}
        <motion.div
          style={{ top: laserHeadTop }}
          className="absolute left-[0px] sm:left-[2px] w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#fff,0_0_20px_#915eff] -translate-y-1/2 pointer-events-none"
        />

        <div className="flex flex-col space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredExperiences.map((experience, index) => {
              const originalIndex = experiences.findIndex(
                (e) => e.id === experience.id
              );
              return (
                <ExperienceCard
                  key={experience.id || `experience-${index}`}
                  experience={experience}
                  index={index}
                  isActive={activeMilestone === originalIndex}
                  onSelect={handleSelectMilestone}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

const ExperienceSection = SectionWrapper(Experience, "work");
export default ExperienceSection;