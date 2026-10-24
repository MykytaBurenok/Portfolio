"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import ScrollMotionBackground from "@/components/motion/ScrollMotionBackground";
import SectionReveal from "@/components/motion/SectionReveal";
import ProjectCardMotion from "@/components/motion/ProjectCardMotion";
import {
  HeroArtworkMotion,
  HeroCopyMotion,
  HeroItem,
  HeroLine,
} from "@/components/motion/HeroEntrance";
import {
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  Database,
  Menu,
  Wrench,
  X,
} from "lucide-react";

const themes = [
  { id: "rose-noir", name: "Rose Noir" },
  { id: "dusty-coral", name: "Dusty Coral" },
] as const;

const projects = [
  {
    number: "01",
    name: "Voushify",
    type: "Internship · Full-Stack Development",
    description:
      "As a Frontend Development Intern at Voushify, I contribute significantly to frontend development as the team prepares the product for deployment and presentation.",
    status: "In development · Preparing for deployment",
    tags: ["Python", "JavaScript", "React", "TypeScript", "Tailwind CSS", "Testing"],
    shape: "circle",
    companyWebsite: "https://voushify.com/",
  },
  {
    number: "02",
    name: "Intelligence Dashboard",
    type: "PERSONAL PROJECT / 2026",
    description:
      "A modular intelligence dashboard with an AI Brief Panel, three theme options, interactive news switching, and market impact cards. Built with a responsive Next.js App Router structure.",
    status: null,
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "CSS Variables",
      "AI content integration",
    ],
    shape: "diamond",
    liveDemo: "https://intelligence-dashboard-three.vercel.app/",
    github: "https://github.com/MykytaBurenok/intelligence-dashboard",
  },
  {
    number: "03",
    name: "TMDB Search",
    type: "PERSONAL PROJECT / 2026",
    description:
      "A movie search application with paginated results, TanStack Query caching, Axios requests, and clear loading, error, empty-result, and slow-request feedback.",
    status: null,
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "TanStack Query",
      "Axios",
      "TMDB API",
      "react-hot-toast",
    ],
    shape: "orbit",
    liveDemo: "https://movie-search-app-tmdb-project.vercel.app/",
    github: "https://github.com/MykytaBurenok/Movie-Search-App",
  },
  {
    number: "04",
    name: "Weather Dashboard",
    type: "PERSONAL PROJECT / 2026",
    description:
      "A responsive weather dashboard with city search, current conditions, and multi-day forecasts, powered by the Open-Meteo API.",
    status: null,
    tags: ["HTML", "CSS", "JavaScript", "Open-Meteo API"],
    shape: "circle",
    liveDemo: "https://mykytaburenok.github.io/Weather-Dashboard/",
    github: "https://github.com/MykytaBurenok/Weather-Dashboard",
  },
];

const capabilities = [
  { icon: Code2, title: "Languages", items: ["JavaScript", "TypeScript", "Python — basic/general understanding"] },
  { icon: Code2, title: "Frontend", items: ["React", "Next.js", "Redux", "HTML5", "CSS3", "Sass", "Tailwind CSS, including v3", "Responsive/adaptive design", "Component-based architecture"] },
  { icon: Database, title: "Data & API Integration", items: ["REST APIs", "TanStack Query", "Axios", "React API integrations", "Third-party service integrations", "Data fetching, caching, and error handling"] },
  { icon: Code2, title: "Backend", items: ["Node.js", "Express", "MongoDB", "Backend API development and endpoint integration", "Database connections and application data flow"] },
  { icon: Wrench, title: "Tools & Workflow", items: ["Git", "Vite", "Webpack", "Parcel", "Vercel", "Figma", "AI-assisted UI design and prototyping", "AI-assisted coding tools and agents, including Codex, for implementation, prototyping, and workflow efficiency"] },
];
const principles = [
  {
    title: "Design-minded",
    description:
      "Turning design ideas into polished interfaces through thoughtful visual decisions, Figma workflows, and AI-assisted design and prototyping.",
  },
  {
    title: "Frontend Craft",
    description:
      "Building responsive, accessible, and maintainable interfaces with reusable components, clean architecture, and attention to performance.",
  },
  {
    title: "Details Matter",
    description:
      "Refining spacing, typography, interaction states, responsiveness, and small usability details that make an interface feel complete.",
  },
  {
    title: "Full-Stack Integration",
    description:
      "Connecting frontend applications to REST APIs and backend services, working with application data, integrating databases, and building reliable end-to-end functionality.",
  },
  {
    title: "Build to Last",
    description:
      "Delivering maintainable solutions efficiently through clear communication, collaboration, iterative development, and a focus on long-term quality.",
  },
];
export default function Home() {
  const reduceMotion = Boolean(useReducedMotion());
  const [theme, setTheme] =
    useState<(typeof themes)[number]["id"]>("rose-noir");
  const [themeInitialized, setThemeInitialized] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  type ThemeId = (typeof themes)[number]["id"];

  function changeTheme(id: ThemeId) {
    setTheme(id);
    setThemeInitialized(true);
    localStorage.setItem("portfolio-theme", id);
  }

  function initializeTheme() {
    if (themeInitialized) return;
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (themes.some((item) => item.id === savedTheme)) {
      setTheme(savedTheme as (typeof themes)[number]["id"]);
    }
    setThemeInitialized(true);
  }

  return (
    <div className="portfolio" data-theme={theme}>
      <ScrollMotionBackground />

      <main>
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="ambient ambient-two" aria-hidden="true" />

        <header className="site-header">
          <a className="brand" href="#home" aria-label="Portfolio home">
            <span className="brand-mark">MB</span>
            <span className="brand-copy">
              <strong>Mykyta Burenok</strong>
              <small>FRONTEND DEVELOPER</small>
            </span>
          </a>

          <nav className={`navigation ${menuOpen ? "navigation-open" : ""}`}>
            {[
              ["Home", "#home"],
              ["About", "#about"],
              ["Showcase", "#projects"],
              ["Capabilities", "#skills"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <div className="theme-toggle" onFocus={initializeTheme}>
              <span
                className={
                  theme === "rose-noir" ? "theme-label active" : "theme-label"
                }
              >
                Cherry
              </span>
              <input
                className="theme-range"
                type="range"
                min="0"
                max="1"
                step="1"
                value={theme === "rose-noir" ? 0 : 1}
                onChange={(event) =>
                  changeTheme(themes[Number(event.target.value)].id)
                }
                aria-label="Theme: drag to switch between Cherry and Light"
                aria-valuetext={
                  theme === "rose-noir"
                    ? "Cherry, Rose Noir"
                    : "Light, Dusty Coral"
                }
                title={`Theme: ${theme === "rose-noir" ? "Cherry" : "Light"}`}
              />
              <span
                className={
                  theme === "dusty-coral" ? "theme-label active" : "theme-label"
                }
              >
                Light
              </span>
            </div>

            <a className="header-cta" href="#contact">
              Let&apos;s talk <ArrowUpRight size={15} />
            </a>

            <button
              className="mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        <div className="page-content">
          <section className="hero section-wrap" id="home">
            <HeroCopyMotion className="hero-copy">
              <HeroItem className="hero-eyebrow">
                <p className="eyebrow">
                  <span className="status-dot" />
                  FRONTEND / FULL-STACK DEVELOPER
                </p>
              </HeroItem>

              <h1>
                <HeroLine>
                  Building <em>thoughtful digital experiences.</em>
                </HeroLine>
              </h1>

              <HeroItem>
                <p className="hero-description">
                  I build responsive web applications with clear, intuitive
                  interfaces and thoughtful functionality.
                </p>
              </HeroItem>

              <HeroItem className="hero-actions">
                <a className="button-primary" href="#projects">
                  Explore selected work <ArrowUpRight size={16} />
                </a>
                <a className="button-secondary" href="#about">
                  <ArrowDownRight size={16} /> My approach
                </a>
              </HeroItem>

              <div className="hero-socials">
                <a
                  href="https://github.com/MykytaBurenok"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <ArrowUpRight size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/mykyta-burenok/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="hero-coordinate" aria-hidden="true">
                <span>BERLIN / GERMANY</span>
              </div>
            </HeroCopyMotion>

            <HeroArtworkMotion>
              <div className="hero-visual">
                <div className="visual-topline">
                  <span>PROFILE / 001</span>
                  <span>BERLIN / DE</span>
                </div>

                <div className="hero-art">
                  <div className="portrait-composition">
                    <div
                      className="portrait-orbit portrait-orbit-one"
                      aria-hidden="true"
                    >
                      <span className="orbit-marker orbit-marker-dot" />
                    </div>
                    <div
                      className="portrait-orbit portrait-orbit-two"
                      aria-hidden="true"
                    >
                      <span className="orbit-marker orbit-marker-diamond" />
                    </div>
                    <div className="profile-photo-frame">
                      <Image
                        className="art-portrait"
                        src="/mykyta-photo.png"
                        alt="Portrait of Mykyta Burenok"
                        width={960}
                        height={1280}
                        priority
                      />
                    </div>
                  </div>
                </div>
                <div className="arcturus-marker arcturus-marker--hero" role="img" aria-label="Arctur star marker">
                  <span className="arcturus-light" aria-hidden="true" />
                  <span className="arcturus-connector" aria-hidden="true" />
                  <span className="arcturus-label">Arctur</span>
                </div>
                <div className="visual-caption">
                  <div>
                    <strong>Mykyta Burenok</strong>
                  </div>
                  <span className="caption-index">BERLIN</span>
                </div>
              </div>
            </HeroArtworkMotion>
          </section>

          <SectionReveal as="section" className="section-wrap" id="about">
            <div className="section-heading">
              <div>
                <p className="eyebrow">01 — THE PHILOSOPHY</p>
                <h2>
                  Precision in the code. <em>Character</em> in the details.
                </h2>
              </div>
              <span className="section-count">THINK / MAKE / REFINE</span>
            </div>

            <div className="about-grid">
              <div className="about-copy">
                <p>
                  Great digital work lives between a clear idea and a careful
                  implementation. The typography, spacing, color, and motion
                  should all work together rather than compete for attention.
                </p>
                <p>
                  I approach interfaces as systems: expressive enough to be
                  memorable, structured enough to grow, and accessible enough to
                  work for the people using them.
                </p>

                <blockquote>
                  Good design isn&apos;t more decoration. It&apos;s more
                  intention.
                  <span className="quote-mark">✳</span>
                </blockquote>
              </div>

              <aside className="profile-card">
                <div className="profile-decoration" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <p className="eyebrow">AVAILABILITY</p>
                <p className="availability-copy">
                  Open to relocation, remote collaboration, and on-site
                  opportunities.
                </p>
                <a className="button-primary profile-link" href="#contact">
                  Start a conversation <ArrowUpRight size={16} />
                </a>
              </aside>
            </div>

            <div className="resume-details">
              <article className="resume-card resume-card-education">
                <p className="eyebrow">EDUCATION</p>
                <div className="resume-entry">
                  <strong>Bachelor Degree</strong>
                </div>
                <div className="resume-entry">
                  <strong>Professional Development &amp; Certifications</strong>
                </div>
                <div className="resume-entry">
                  <strong>Computer Science</strong>
                </div>
              </article>
              <article className="resume-card">
                <p className="eyebrow">ADDITIONAL EXPERIENCE</p>
                <ul className="experience-list">
                  <li>Professional Theater and Cinema Acting</li>
                  <li>Live Performance Experience</li>
                  <li>Collaboration</li>
                  <li>Adaptability</li>
                  <li>Creativity</li>
                </ul>
                <div className="resume-entry languages-entry">
                  <strong>Languages</strong>
                  <span>English: Fluent / German: Upper-Intermediate</span>
                  <span>Russian: Native / Ukrainian: Native</span>
                </div>
              </article>
            </div>
          </SectionReveal>

          <SectionReveal as="section" className="section-wrap" id="principles">
            <div className="section-heading">
              <div>
                <p className="eyebrow">02 / HOW I WORK</p>
                <h2>
                  Principles behind the <em>practice.</em>
                </h2>
              </div>
              <span className="section-count">DESIGN / ENGINEERING</span>
            </div>
            <div className="principles-grid">
              {principles.map((principle, index) => (
                <motion.article
                  className="principle-card"
                  key={principle.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.55,
                    delay: reduceMotion ? 0 : index * 0.08,
                  }}
                >
                  <span>{String(index + 1).padStart(2, "0")} / PRINCIPLE</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </motion.article>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal as="section" className="section-wrap" id="projects">
            <div className="section-heading">
              <div>
                <p className="eyebrow">02 — SELECTED WORK</p>
                <h2>
                  Curated project <em>showcase.</em>
                </h2>
                <p className="section-description">
                  A selection of projects and current work.
                </p>
              </div>
              <span className="section-count">04 PROJECTS</span>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCardMotion
                  key={project.number}
                  index={Number(project.number) - 1}
                >
                  <div className="project-art">
                    <div className="project-art-top">
                      <span>PROJECT / {project.number}</span>
                      <span>{project.type}</span>
                    </div>

                    <div
                      className={`project-geometry geometry-${project.shape}`}
                    >
                      <span className="geometry-line geometry-line-one" />
                      <span className="geometry-line geometry-line-two" />
                      <span className="geometry-line geometry-line-three" />
                      <span className="geometry-center">{project.number}</span>
                      <span className="geometry-orbit" />
                    </div>

                    <span className="project-art-caption">
                      VISUAL STUDY / {project.number}
                    </span>
                  </div>

                  <div className="project-body">
                    <div className="project-title-row">
                      <div>
                        <p className="eyebrow">{project.type}</p>
                        <h3>{project.name}</h3>
                        {"companyWebsite" in project && project.companyWebsite && (
                          <span className="project-location">Texas, USA</span>
                        )}
                      </div>
                      <span className="project-arrow">
                        <ArrowUpRight size={19} />
                      </span>
                    </div>

                    <p className="project-description">{project.description}</p>

                    {project.status && (
                      <p className="project-status">{project.status}</p>
                    )}

                    {project.tags.length > 0 && (
                      <div className="tag-list">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    )}

                    <div className="project-footer">
                      {"companyWebsite" in project && project.companyWebsite ? (
                        <a
                          href={project.companyWebsite}
                          target="_blank"
                          rel="noreferrer"
                        >
                          COMPANY WEBSITE ↗
                        </a>
                      ) : "liveDemo" in project && project.liveDemo ? (
                        <>
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noreferrer"
                          >
                            LIVE DEMO ↗
                          </a>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                          >
                            GITHUB ↗
                          </a>
                        </>
                      ) : (
                        <a href="#contact">DISCUSS PROJECT ↗</a>
                      )}
                    </div>
                  </div>
                </ProjectCardMotion>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal as="section" className="section-wrap" id="skills">
            <div className="section-heading">
              <div>
                <p className="eyebrow">03 — THE TOOLKIT</p>
                <h2>
                  Technical <em>skills.</em>
                </h2>
                <p className="section-description">
                  A practical toolkit for turning considered designs into
                  dependable digital experiences.
                </p>
              </div>
              <span className="section-count">DESIGN / ENGINEERING</span>
            </div>

            <motion.div
              className="skills-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={{
                visible: {
                  transition: { staggerChildren: reduceMotion ? 0 : 0.09 },
                },
                hidden: {},
              }}
            >
              {capabilities.map((group, index) => {
                const Icon = group.icon;
                return (
                  <motion.article
                    className="skill-card"
                    key={group.title}
                    variants={{
                      hidden: {
                        opacity: reduceMotion ? 1 : 0,
                        y: reduceMotion ? 0 : 12,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: reduceMotion ? 0 : 0.5 },
                      },
                    }}
                  >
                    <div className="skill-card-heading">
                      <span className="skill-icon">
                        <Icon size={18} />
                      </span>
                      <span className="skill-number">0{index + 1}</span>
                    </div>
                    <h3>{group.title}</h3>
                    <p className="skill-card-subtitle">SELECTED SKILLS</p>
                    <div className="skill-list">
                      {group.items.map((item) => (
                        <div className="skill-row" key={item}>
                          <span>{item}</span>
                          <ArrowUpRight size={13} />
                        </div>
                      ))}
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </SectionReveal>

          <SectionReveal
            as="section"
            className="contact-section section-wrap"
            id="contact"
          >
            <div className="contact-copy">
              <p className="eyebrow">04 — THE NEXT CHAPTER</p>
              <h2>
                Let&apos;s make something <em>matter.</em>
              </h2>
              <p>
                Have a thoughtful project, a difficult interface, or an idea
                that needs a good technical partner? Let&apos;s talk about it.
              </p>
              <div className="contact-note">
                <span className="status-dot" />
                BERLIN-BASED DEVELOPER
              </div>
            </div>

            <div className="contact-details">
              <div className="contact-geometry" aria-hidden="true" />
              <p className="eyebrow">HAVE SOMETHING IN MIND?</p>
              <h3>Start a conversation.</h3>
              <p className="contact-hint">burenoknikitad@gmail.com</p>
              <a
                className="button-primary contact-button"
                href="mailto:burenoknikitad@gmail.com"
              >
                Write an email <ArrowUpRight size={16} />
              </a>
              <div className="contact-socials">
                <a
                  href="https://github.com/MykytaBurenok"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/mykyta-burenok/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
                <a href="#home">Back to top ↑</a>
              </div>
            </div>
          </SectionReveal>

          <footer className="site-footer">
            <a className="brand" href="#home">
              <span className="brand-mark">MB</span>
              <span className="brand-copy">
                <strong>Mykyta Burenok</strong>
                <small>FRONTEND DEVELOPER</small>
              </span>
            </a>
            <span>DESIGNED WITH INTENTION / BUILT WITH CARE</span>
            <span className="footer-edition">EDITION Nº 001</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
