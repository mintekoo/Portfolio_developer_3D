import { useState, forwardRef } from "react";
import { Tilt } from "react-tilt";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { github, externalLink } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects, projectCategories } from "../constants";
import { fadeIn } from "../utils/motion";
import ProjectDetailsModal from "./ProjectDetailsModal";

const ProjectCard = forwardRef(({
  index,
  name,
  subtitle,
  description,
  tags,
  image,
  live_demo_link,
  source_code_link,
  is_organization_repo,
  is_company_project,
  company_name,
  onSelect,
}, ref) => {
  return (
    <motion.div
      ref={ref}
      layout
      variants={fadeIn("up", "spring", (index % 3) * 0.15, 0.75)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="w-full flex"
    >
      <Tilt
        options={{
          max: 20,
          scale: 1,
          speed: 450,
        }}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`View details and preview for ${name}`}
        className="bg-tertiary p-5 rounded-2xl w-full flex flex-col justify-between cursor-pointer border border-transparent hover:border-[#915eff]/30 hover:shadow-xl hover:shadow-[#915eff]/10 transition-all focus:outline-none focus:ring-2 focus:ring-[#915eff]/40"
      >
        <div>
          <div className="relative w-full h-[220px]">
            <img
              src={image}
              alt={name}
              className="object-cover w-full h-full rounded-2xl"
              loading="lazy"
            />

            <div className="absolute inset-0 flex justify-end items-start m-3 gap-2 card-img_hover">
              {live_demo_link && (
                <a
                  href={live_demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Open live demo for ${name}`}
                  className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-[#915eff] hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-white/40 shadow-lg"
                  title="View Live Demo"
                >
                  <img
                    src={externalLink}
                    alt="Live demo"
                    className="object-contain w-5 h-5 brightness-0 invert"
                  />
                </a>
              )}

              {source_code_link && (
                <a
                  href={source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`View ${name} source code on GitHub`}
                  className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer black-gradient hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-white/40 shadow-lg"
                  title={is_organization_repo ? "Organization Repository" : "GitHub Repository"}
                >
                  <img
                    src={github}
                    alt="GitHub source code"
                    className="object-contain w-1/2 h-1/2"
                  />
                </a>
              )}
            </div>
          </div>

          <div className="mt-5">
            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
              {subtitle && (
                <span className="text-[12px] font-semibold uppercase tracking-wider text-[#915eff]">
                  {subtitle}
                </span>
              )}
              {is_company_project && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#915eff]/15 text-[#b08eff] border border-[#915eff]/30">
                  🏢 {company_name || "Abyssinia Software"}
                </span>
              )}
            </div>
            <h3 className="text-white font-bold text-[22px] mt-1">{name}</h3>
            <p className="mt-2 text-secondary text-[14px] leading-[22px]">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mt-5 pt-3 border-t border-white/5">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className={`text-[13px] font-medium ${tag.color}`}
              >
                #{tag.name}
              </p>
            ))}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="text-[#915eff] hover:text-[#b08eff] text-[12px] sm:text-[13px] font-semibold flex items-center gap-1 transition-colors shrink-0 group/btn focus:outline-none"
            aria-label={`View details and live preview for ${name}`}
          >
            <span>Preview</span>
            <span className="transition-transform group-hover/btn:translate-x-1">→</span>
          </button>
        </div>
      </Tilt>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

const Works = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === "All"
    ? projects
    : activeCategory === "Company Projects"
      ? projects.filter((project) => project.is_company_project)
      : projects.filter((project) => project.category === activeCategory);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="flex w-full">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mt-2 text-secondary text-[16px] sm:text-[17px] max-w-3xl leading-[28px]"
        >
          The following multi-project showcase highlights my full-stack engineering experience, company projects delivered with Abyssinia Software Technology, backend microservices, mobile app development with Flutter, database reliability, and production AI integrations.
        </motion.p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2.5 mt-4 sm:mt-5">
        {projectCategories.map((category) => {
          const count = category === "All"
            ? projects.length
            : category === "Company Projects"
              ? projects.filter((p) => p.is_company_project).length
              : projects.filter((p) => p.category === category).length;
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={isActive}
              className={`px-4 py-2 rounded-full text-[13px] sm:text-[14px] font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#915eff]/50 ${
                isActive
                  ? "bg-[#915eff] text-white shadow-lg shadow-[#915eff]/30"
                  : "bg-tertiary text-secondary hover:text-white hover:bg-black-200"
              }`}
            >
              <span>{category}</span>
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-black/30 text-secondary"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-6 sm:mt-7 w-full">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id || `project-${index}`}
              index={index}
              project={project}
              onSelect={() => setSelectedProject(project)}
              {...project}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Reusable Project Details Preview Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

const WorksSection = SectionWrapper(Works, "projects", "sm:px-16 px-6 pt-2 pb-16 sm:pt-3 sm:pb-20");
export default WorksSection;
