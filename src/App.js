import React, { useState, useEffect, useRef } from "react";
import { motion, useInView} from "framer-motion";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { HiMoon, HiSun } from "react-icons/hi";
import profile from "./assets/sipunu.jpeg";


/* ─────────────────────────────────────────────
   TYPEWRITER HOOK
───────────────────────────────────────────── */
function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const delay = deleting
      ? speed / 2
      : charIdx === current.length
        ? pause
        : speed;
    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      } else {
        setDeleting(false);
        setWordIdx((w) => (w + 1) % words.length);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

/* ─────────────────────────────────────────────
   SKILL BAR
───────────────────────────────────────────── */
const skills = [
  { name: "React.js", level: 88 },
  { name: "Node.js / Express", level: 82 },
  { name: "JavaScript (ES6+)", level: 90 },
  { name: "MySQL", level: 75 },
  { name: "REST APIs", level: 85 },
  { name: "Git & GitHub", level: 80 },
];

function SkillBar({ name, level, dark }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-1 text-sm font-medium">
        <span>{name}</span>
        <span style={{ color: "#4ade80" }}>{level}%</span>
      </div>
      <div
        className="w-full rounded-full h-2"
        style={{ background: dark ? "#1f2937" : "#e5e7eb" }}
      >
        <motion.div
          className="h-2 rounded-full"
          style={{
            background: "linear-gradient(90deg,#22c55e,#4ade80)",
            boxShadow: "0 0 8px #4ade8088",
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.1 }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────── */
const projects = [
  {
    emoji: "📍",
    title: "Tracking Web Application",
    desc: "Real-time tracking system with login, dashboard, and data management using the MERN stack.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    live: "#",
    github: "#",
  },
  {
    emoji: "⚙️",
    title: "Module-Based Application",
    desc: "Modular system with customer, orders, and quotes management using React + Node + MySQL.",
    tags: ["React", "Node.js", "MySQL"],
    live: "#",
    github: "#",
  },
  {
    emoji: "📊",
    title: "Customer Dashboard",
    desc: "Dashboard for managing customer balance, address, and API-based data integration.",
    tags: ["React", "REST API", "Charts"],
    live: "#",
    github: "#",
  },
];

function ProjectCard({ project, dark }) {
  return (
    <motion.div
      className="p-6 rounded-2xl shadow-lg flex flex-col gap-3 relative overflow-hidden"
      style={{
        background: dark ? "#111827" : "#f9fafb",
        border: dark ? "1px solid #1f2937" : "1px solid #e5e7eb",
      }}
      whileHover={{ y: -6, boxShadow: "0 0 32px #4ade8033" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Glow top-left corner */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 60,
          height: 60,
          background: "radial-gradient(circle, #4ade8022 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div className="text-4xl">{project.emoji}</div>
      <h3 className="text-lg font-bold">{project.title}</h3>
      <p style={{ color: dark ? "#9ca3af" : "#6b7280", fontSize: 14 }}>
        {project.desc}
      </p>
      <div className="flex flex-wrap gap-2 mt-1">
        {project.tags.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-1 rounded-full font-medium"
            style={{
              background: dark ? "#052e16" : "#dcfce7",
              color: "#16a34a",
              border: "1px solid #166534",
            }}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-4 mt-2 text-sm font-semibold">
        <a
          href={project.live}
          className="flex items-center gap-1 transition-all"
          style={{ color: "#4ade80" }}
        >
          ↗ Live
        </a>
        <a
          href={project.github}
          className="flex items-center gap-1 transition-all"
          style={{ color: "#60a5fa" }}
        >
          <FaGithub /> GitHub
        </a>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PORTFOLIO
───────────────────────────────────────────── */
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const typed = useTypewriter([
    "MERN Stack Developer",
    "React Enthusiast",
    "Full Stack Builder",
  ]);

  // Copy email
  const handleCopy = () => {
    navigator.clipboard.writeText("sipunu02@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Active nav on scroll
  useEffect(() => {
    const sections = ["about", "skills", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.5 },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const bg = dark ? "#0a0f1a" : "#f8fafc";
  const surface = dark ? "#0f172a" : "#ffffff";
  const text = dark ? "#f1f5f9" : "#0f172a";
  const muted = dark ? "#94a3b8" : "#64748b";
  const navBg = dark ? "rgba(10,15,26,0.92)" : "rgba(248,250,252,0.92)";

  return (
    <div
      style={{
        background: bg,
        color: text,
        minHeight: "100vh",
        fontFamily: "'DM Mono', 'Fira Code', monospace",
      }}
    >
      {/* Scanline overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: dark
            ? "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,100,0.015) 2px,rgba(0,255,100,0.015) 4px)"
            : "none",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />

      {/* Custom scrollbar style */}
      <style>{`
        ::-webkit-scrollbar{width:6px}
        ::-webkit-scrollbar-track{background:${dark ? "#0a0f1a" : "#f1f5f9"}}
        ::-webkit-scrollbar-thumb{background:#4ade80;border-radius:4px}
        html{scroll-behavior:smooth}
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@700;800&display=swap');
      `}</style>

      {/* NAVBAR */}
      <nav
        style={{
          background: navBg,
          backdropFilter: "blur(12px)",
          borderBottom: dark ? "1px solid #1e293b" : "1px solid #e2e8f0",
          position: "sticky",
          top: 0,
          zIndex: 100,
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: 18,
            color: "#4ade80",
          }}
        >
          {"<PB />"}
        </span>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["about", "skills", "projects", "contact"].map((s) => (
            <a
              key={s}
              href={`#${s}`}
              style={{
                fontSize: 13,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: activeSection === s ? "#4ade80" : muted,
                textDecoration: "none",
                transition: "color 0.2s",
                fontWeight: activeSection === s ? 600 : 400,
              }}
            >
              {activeSection === s && "▸ "}
              {s}
            </a>
          ))}

          {/* Dark/Light toggle */}
          <button
            onClick={() => setDark(!dark)}
            style={{
              background: dark ? "#1e293b" : "#e2e8f0",
              border: "none",
              borderRadius: 8,
              padding: "6px 10px",
              cursor: "pointer",
              color: dark ? "#4ade80" : "#0f172a",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
            }}
          >
            {dark ? <HiSun /> : <HiMoon />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          minHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "60px 24px",
          position: "relative",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #4ade8018 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            border: "3px solid #4ade80",
            boxShadow: "0 0 28px #4ade8055",
            overflow: "hidden",
            marginBottom: 28,
            background: "#1e293b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
          }}
        >
          {/* Replace with: <img src={profile} style={{width:"100%",height:"100%",objectFit:"cover"}} /> */}
          <img
            src={profile}
            alt="Pitamber Behera"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            color: "#4ade80",
            fontSize: 13,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          ● Available for work
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem,6vw,3.5rem)",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Hi, I'm{" "}
          <span style={{ color: "#4ade80", textShadow: "0 0 24px #4ade8066" }}>
            Pitamber Behera 👋
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ fontSize: 18, color: muted, marginBottom: 32, height: 28 }}
        >
          <span style={{ color: "#4ade80" }}>$ </span>
          {typed}
          <span
            style={{
              animation: "blink 1s step-end infinite",
              color: "#4ade80",
            }}
          >
            ▌
          </span>
          <style>{`@keyframes blink{50%{opacity:0}}`}</style>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{ display: "flex", gap: 20, fontSize: 24 }}
        >
          {[
            {
              icon: <FaGithub />,
              href: "https://github.com/Pitamber-Behera",
              label: "GitHub",
            },
            {
              icon: <FaLinkedin />,
              href: "https://www.linkedin.com/in/pitamberbehera/",
              label: "LinkedIn",
            },
            {
              icon: <FaCode />,
              href: "https://leetcode.com/u/Pitamber-behera123/",
              label: "LeetCode",
            },
          ].map(({ icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.25, color: "#4ade80" }}
              style={{ color: muted, transition: "color 0.2s" }}
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>

        <motion.a
          href="#projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px #4ade8066" }}
          style={{
            marginTop: 40,
            padding: "12px 32px",
            borderRadius: 8,
            background: "transparent",
            border: "1.5px solid #4ade80",
            color: "#4ade80",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: "0.08em",
            cursor: "pointer",
            display: "inline-block",
          }}
        >
          View My Work ↓
        </motion.a>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        style={{ padding: "80px 32px", maxWidth: 700, margin: "0 auto" }}
      >
        <SectionTitle title="About Me" dark={dark} />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ color: muted, lineHeight: 1.9, fontSize: 15, marginTop: 20 }}
        >
          I'm a passionate{" "}
          <span style={{ color: "#4ade80" }}>MERN Stack Developer</span> who
          loves building scalable and intuitive web applications. With hands-on
          experience in React, Node.js, Express, and MySQL, I enjoy transforming
          complex problems into elegant digital solutions. Always learning,
          always shipping.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginTop: 32,
          }}
        >
          {[
            { label: "Location", value: "India 🇮🇳" },
            { label: "Focus", value: "Full Stack Dev" },
            { label: "Stack", value: "MERN + MySQL" },
            { label: "Status", value: "Open to roles ✅" },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                padding: "14px 18px",
                borderRadius: 10,
                background: dark ? "#0f172a" : "#f1f5f9",
                border: dark ? "1px solid #1e293b" : "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "#4ade80",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: 4,
                }}
              >
                {label}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{value}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        style={{ padding: "80px 32px", maxWidth: 700, margin: "0 auto" }}
      >
        <SectionTitle title="Skills" dark={dark} />
        <div style={{ marginTop: 32 }}>
          {skills.map((s) => (
            <SkillBar key={s.name} {...s} dark={dark} />
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        style={{ padding: "80px 32px", maxWidth: 1000, margin: "0 auto" }}
      >
        <SectionTitle title="Projects" dark={dark} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: 24,
            marginTop: 32,
          }}
        >
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} dark={dark} />
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{
          padding: "80px 32px",
          maxWidth: 600,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <SectionTitle title="Contact" dark={dark} />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ color: muted, marginTop: 16, fontSize: 14, lineHeight: 1.8 }}
        >
          Have a project in mind or just want to connect? Feel free to reach
          out!
        </motion.p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            marginTop: 32,
          }}
        >
          {/* Email with copy */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 24px",
              borderRadius: 10,
              background: dark ? "#0f172a" : "#f1f5f9",
              border: dark ? "1px solid #1e293b" : "1px solid #e2e8f0",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: muted,
                fontSize: 14,
              }}
            >
              <MdEmail style={{ color: "#4ade80" }} /> sipunu02@gmail.com
            </span>
            <button
              onClick={handleCopy}
              style={{
                background: copied ? "#166534" : dark ? "#1e293b" : "#e2e8f0",
                border: "none",
                borderRadius: 6,
                padding: "5px 12px",
                cursor: "pointer",
                color: copied ? "#4ade80" : muted,
                fontSize: 12,
                fontWeight: 600,
                transition: "all 0.2s",
              }}
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </motion.div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 24px",
              borderRadius: 10,
              background: dark ? "#0f172a" : "#f1f5f9",
              border: dark ? "1px solid #1e293b" : "1px solid #e2e8f0",
              width: "100%",
            }}
          >
            <MdPhone style={{ color: "#4ade80" }} />
            <span style={{ color: muted, fontSize: 14 }}>+91-7978990077</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 24,
            marginTop: 36,
            fontSize: 22,
          }}
        >
          {[
            { icon: <FaGithub />, href: "https://github.com/Pitamber-Behera" },
            {
              icon: <FaLinkedin />,
              href: "https://www.linkedin.com/in/pitamberbehera/",
            },
          ].map(({ icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.3, color: "#4ade80" }}
              style={{ color: muted }}
            >
              {icon}
            </motion.a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          textAlign: "center",
          padding: "24px",
          borderTop: dark ? "1px solid #1e293b" : "1px solid #e2e8f0",
          color: muted,
          fontSize: 13,
        }}
      >
        <span style={{ color: "#4ade80" }}>{"<"}</span>
        {"  © 2026 Pitamber Behera  "}
        <span style={{ color: "#4ade80" }}>{"/>"}</span>
        <span
          style={{
            display: "block",
            marginTop: 4,
            fontSize: 11,
            color: dark ? "#334155" : "#cbd5e1",
          }}
        >
          Built with React + Framer Motion
        </span>
      </footer>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION TITLE
───────────────────────────────────────────── */
function SectionTitle({ title, dark }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{ color: "#4ade80", fontFamily: "monospace", fontSize: 13 }}
        >
          {"// "}
        </span>
        <h2
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: 26,
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>
      <div
        style={{
          height: 2,
          width: 48,
          background: "#4ade80",
          marginTop: 8,
          borderRadius: 2,
          boxShadow: "0 0 8px #4ade80",
        }}
      />
    </motion.div>
  );
}
