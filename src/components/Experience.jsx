import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
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
          boxShadow: `0 0 20px ${experience.accentColor || "#915eff"}60`,
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
        className={`p-6 sm:p-8 rounded-2xl backdrop-blur-md transition-all duration-300 border ${
          isActive
            ? "bg-[#1d1836]/90 border-[#915eff] shadow-2xl shadow-[#915eff]/20 ring-1 ring-[#915eff]/50"
            : "bg-[#1d1836]/65 border-white/10 hover:border-white/30 hover:bg-[#1d1836]/80 hover:shadow-xl hover:shadow-[#915eff]/10"
        }`}
      >
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/5 pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              {experience.status === "Active Role" ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Active Role</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  <span>Completed</span>
                </span>
              )}
              {experience.type && (
                <span className="text-[11px] text-secondary hidden md:inline">
                  • {experience.type}
                </span>
              )}
            </div>

            <h3 className="text-white text-[22px] sm:text-[24px] font-bold leading-tight">
              {experience.title}
            </h3>
            <p className="text-secondary text-[15px] sm:text-[16px] font-semibold mt-0.5">
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
              <p className="text-secondary text-[12px] mt-1 hidden sm:block">
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
        <ul className="mt-5 space-y-3">
          {experience.points.map((point, pIndex) => (
            <li
              key={`point-${pIndex}`}
              className="flex items-start gap-3 text-secondary text-[13.5px] sm:text-[14.5px] leading-[25px]"
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
          <div className="mt-6 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 mb-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: experience.accentColor || "#915eff" }}
              />
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-secondary">
                Verified Projects Delivered During This Tenure
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {experience.connectedProjects.map((proj) => (
                <span
                  key={proj}
                  className="px-2.5 py-1 rounded-lg text-[12px] font-medium bg-black/40 text-white/90 border border-white/10 hover:border-white/30 transition-colors"
                >
                  🚀 {proj}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Core Tech Stack */}
        {experience.skills && experience.skills.length > 0 && (
          <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
            {experience.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-0.5 rounded-md text-[11px] sm:text-[12px] font-medium bg-white/5 text-[#d8c5ff] border border-white/10"
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
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          Career Progression & Roles
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      {/* Interactive 3D WebGL Career Nexus Canvas */}
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

      {/* Milestone Navigation & Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-6 mb-12">
        <button
          type="button"
          onClick={() => setSelectedFilter("all")}
          className={`px-4 py-2 rounded-full text-[13px] sm:text-[14px] font-semibold transition-all cursor-pointer border ${
            selectedFilter === "all"
              ? "bg-[#915eff] text-white border-transparent shadow-lg shadow-[#915eff]/30"
              : "bg-tertiary text-secondary border-white/5 hover:text-white hover:bg-black-200"
          }`}
        >
          All Roles ({experiences.length})
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
              className={`px-4 py-2 rounded-full text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer flex items-center gap-2 border ${
                isFilterActive
                  ? "bg-[#1d1836] text-white border-white/40 shadow-lg"
                  : "bg-tertiary text-secondary border-white/5 hover:text-white hover:bg-black-200"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: exp.accentColor || "#915eff" }}
              />
              <span>{exp.company_name}</span>
            </button>
          );
        })}
      </div>

      {/* Custom Cyberpunk Glassmorphic Timeline */}
      <div className="relative max-w-5xl mx-auto pl-2 sm:pl-4">
        {/* Continuous Laser Progression Line */}
        <div className="absolute left-[3px] sm:left-[5px] top-6 bottom-8 w-1 bg-gradient-to-b from-[#915eff] via-[#00cea8] to-[#00b4d8] rounded-full opacity-70 shadow-[0_0_12px_#915eff]" />

        {/* Traveling Light Pulse Animation */}
        <motion.div
          animate={{
            y: ["0%", "100%"],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[1px] sm:left-[3px] top-6 w-2 h-16 bg-gradient-to-b from-white via-[#915eff] to-transparent rounded-full blur-[1px] pointer-events-none"
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