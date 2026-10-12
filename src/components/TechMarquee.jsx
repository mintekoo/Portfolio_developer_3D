import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiLaravel,
  SiTypescript,
  SiTailwindcss,
  SiMysql,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiFlutter,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiExpress,
} from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";

const skills = [
  { name: "React.js", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Prisma", icon: SiPrisma, color: "#A8B2D1" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B" },
  { name: "React Native", icon: SiReact, color: "#61DAFB" },
  { name: "OpenAI", icon: RiOpenaiFill, color: "#10A37F" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#ffffff" },
  { name: "CI/CD", icon: SiGithubactions, color: "#2088FF" },
  { name: "Express.js", icon: SiExpress, color: "#ffffff" },
];

const TechMarquee = () => {
  return (
    <section className="relative w-full py-10 bg-primary/90 overflow-hidden border-y border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#00cea8] animate-pulse" />
            <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-[#aaa6c3]">
              Technologies I Work With
            </span>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden w-full">
        {/* Left Gradient Edge Mask */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-primary via-primary/80 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Right Gradient Edge Mask */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-primary via-primary/80 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Continuous Infinite Scrolling Track */}
        <div className="flex animate-marquee py-2">
          {[...skills, ...skills].map((skill, idx) => (
            <div
              key={`${skill.name}-${idx}`}
              className="group flex items-center gap-3.5 flex-shrink-0 px-5 py-2.5 mx-2.5 rounded-2xl bg-[#151030]/60 border border-white/[0.07] backdrop-blur-md transition-all duration-300 hover:bg-[#1d1836] hover:border-white/20 hover:-translate-y-0.5 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(145,94,255,0.25)]"
            >
              <div className="p-1.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center">
                <skill.icon
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: skill.color }}
                  aria-hidden="true"
                />
              </div>
              <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors tracking-wide">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;
