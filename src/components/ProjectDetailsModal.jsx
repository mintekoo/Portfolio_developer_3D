import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { github, externalLink, close } from "../assets";

const ProjectDetailsModal = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow || "unset";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="presentation"
        >
          {/* Backdrop with blur & light-dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            aria-describedby="project-modal-desc"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[92vh] bg-[#151030] rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col z-10 my-auto"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between p-5 sm:p-6 border-b border-white/10 bg-black/20">
              <div className="flex-1 pr-4">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  {project.category && (
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#915eff]/20 text-[#b08eff] border border-[#915eff]/30">
                      {project.category}
                    </span>
                  )}
                  {project.is_company_project && (
                    <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                      🏢 {project.company_name || "Abyssinia Software Technology"}
                    </span>
                  )}
                  {project.role && (
                    <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      Role: {project.role}
                    </span>
                  )}
                </div>

                <h2
                  id="project-modal-title"
                  className="text-white font-extrabold text-[22px] sm:text-[26px] leading-tight"
                >
                  {project.name}
                </h2>

                {project.subtitle && (
                  <p className="text-[#915eff] font-medium text-[13px] sm:text-[14px] mt-0.5">
                    {project.subtitle}
                  </p>
                )}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project preview"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/15 text-secondary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#915eff]/50 shrink-0"
              >
                <img
                  src={close}
                  alt="Close"
                  className="w-4 h-4 object-contain brightness-0 invert opacity-80 hover:opacity-100"
                />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
              {/* Media Preview Banner */}
              <div className="relative w-full max-h-[340px] sm:max-h-[380px] rounded-xl overflow-hidden border border-white/10 bg-black/40 shadow-inner group">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover object-center max-h-[380px] transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {project.live_demo_link && (
                  <a
                    href={project.live_demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#915eff] hover:bg-[#7e4ee0] text-white font-medium text-[14px] shadow-lg shadow-[#915eff]/30 transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/40"
                  >
                    <img
                      src={externalLink}
                      alt="Live Demo"
                      className="w-4 h-4 object-contain brightness-0 invert"
                    />
                    <span>Explore Live Demo</span>
                  </a>
                )}

                {project.source_code_link && (
                  <a
                    href={project.source_code_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-tertiary hover:bg-black-200 text-white font-medium text-[14px] border border-white/10 shadow transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/40"
                  >
                    <img
                      src={github}
                      alt="GitHub"
                      className="w-4 h-4 object-contain"
                    />
                    <span>
                      {project.is_organization_repo
                        ? "View Organization Repository"
                        : "View Source Code"}
                    </span>
                  </a>
                )}
              </div>

              {/* 2-Column Grid: Architecture & Technical Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Left Column: Overview & Architecture */}
                <div className="space-y-3">
                  <h3 className="text-white font-bold text-[16px] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#915eff]" />
                    Architecture & Overview
                  </h3>
                  <p
                    id="project-modal-desc"
                    className="text-secondary text-[14px] sm:text-[15px] leading-[26px]"
                  >
                    {project.description}
                  </p>
                </div>

                {/* Right Column: Key Technical Highlights */}
                <div className="bg-black/30 rounded-xl p-5 border border-white/5 space-y-3">
                  <h3 className="text-white font-bold text-[16px] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Key Engineering Highlights
                  </h3>
                  {project.highlights && project.highlights.length > 0 ? (
                    <ul className="space-y-2.5">
                      {project.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-secondary text-[13.5px] leading-relaxed"
                        >
                          <span className="text-[#915eff] font-bold select-none text-[15px] mt-0.5">
                            ✓
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-secondary text-[13.5px]">
                      Delivered full software lifecycle implementation including API integration, responsive interface design, and production deployment testing.
                    </p>
                  )}
                </div>
              </div>

              {/* Skills & Technologies Tags */}
              <div className="pt-2 border-t border-white/5">
                <h4 className="text-white font-semibold text-[14px] mb-3">
                  Technologies & Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={`${project.id || project.name}-${tag.name}`}
                      className={`px-3 py-1 rounded-lg text-[12px] sm:text-[13px] font-medium bg-black/40 border border-white/5 ${tag.color}`}
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
