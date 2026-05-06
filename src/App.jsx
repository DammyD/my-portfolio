

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import FallingPattern from './FallingPattern';
import {NAV_LINKS, EXPERIENCE, PROJECTS, ARTICLES} from './data';
import './App.css';


// ── ANIMATION VARIANTS ─────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.09, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -18 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const tagPop = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, delay: 0.15 + i * 0.05, ease: 'backOut' },
  }),
};

// ── SUB-COMPONENTS ─────────────────────────────────────────────────────────

function AnimatedSection({ children, id }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -25% 0px' });
  return (
    <section id={id} ref={ref} className="port-section">
      <AnimatePresence>
        {inView && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function SectionLabel({ children }) {
  return (
    <motion.div className="section-label" variants={fadeUp}>
      {children}
    </motion.div>
  );
}

function ExperienceItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px -20% 0px' });
  return (
    <motion.div
      ref={ref}
      className="exp-item"
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <span className="exp-date">{item.date}</span>
      <div>
        <div className="exp-title">
          {item.url ? (
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title} <span className="link-arrow">↗</span>
            </a>
          ) : (
            item.title
          )}
        </div>
        <div className="exp-company">{item.company}</div>
        <p className="exp-desc">{item.desc}</p>
        <div className="tags">
          {item.tags.map((tag, i) => (
            <motion.span
              key={tag}
              className={`tag ${item.tealTags.includes(tag) ? 'tag--teal' : ''}`}
              variants={tagPop}
              custom={i}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px -20% 0px' });
  return (
    <motion.div
      ref={ref}
      className="project-card"
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <div className="proj-title">
        {item.title}
        <span className="proj-arrow">↗</span>
      </div>
      <p className="proj-desc">{item.desc}</p>
      <div className="tags" style={{ marginBottom: '16px' }}>
        {item.tags.map((tag, i) => (
          <motion.span
            key={tag}
            className={`tag ${item.tealTags.includes(tag) ? 'tag--teal' : ''}`}
            variants={tagPop}
            custom={i}
          >
            {tag}
          </motion.span>
        ))}
      </div>
      <a href={item.url} className="proj-link">
        View project <span className="proj-link-arrow">↗</span>
      </a>
    </motion.div>
  );
}

function ArticleItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px -15% 0px' });
  return (
    <motion.a
      ref={ref}
      href={item.url}
      className="article-item"
      variants={fadeLeft}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ x: 4, transition: { duration: 0.18 } }}
    >
      <span className="article-date">{item.date}</span>
      <span className="article-title">{item.title} →</span>
    </motion.a>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
function App() {
  const [activeSection, setActiveSection] = useState('about');

  // Scrollspy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' }
    );
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* 21st.dev FallingPattern background */}
      <div className="falling-bg">
        <FallingPattern
          color="rgba(124,106,247,0.28)"
          backgroundColor="#09090f"
          duration={120}
          blurIntensity="1.5em"
          density={1.1}
        />
      </div>

      <div className="wrapper">
        {/* ── LEFT PANEL ── */}
        <aside className="left-panel">
          <div className="left-top">
            {/* Hero */}
            <motion.h1
              className="hero-name"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Blessing Dawodu
            </motion.h1>
            <motion.p
              className="hero-role"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Frontend Developer
            </motion.p>
            <motion.p
              className="hero-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              I build accessible, pixel-perfect digital experiences for the web.
            </motion.p>

            {/* Nav — vertical */}
            <nav className="nav" aria-label="Portfolio sections">
              {NAV_LINKS.map(({ id, label }, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  className={`nav-link ${activeSection === id ? 'nav-link--active' : ''}`}
                  onClick={(e) => handleNavClick(e, id)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}
                >
                  <span className="nav-line" />
                  {label}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div className="socials">
            {[
              {
                label: 'GitHub',
                href: '#',
                svg: (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                ),
              },
              {
                label: 'LinkedIn',
                href: '#',
                svg: (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                ),
              },
              {
                label: 'Portfolio',
                href: 'https://lastest-portfolio.netlify.app/',
                svg: (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                ),
              },
              {
                label: 'Medium',
                href: '',
                svg: (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M13.54 12a6.8 6.8 0 11-6.77-6.82A6.77 6.77 0 0113.54 12zM20.96 12c0 3.54-1.51 6.41-3.38 6.41s-3.38-2.87-3.38-6.41 1.51-6.41 3.38-6.41 3.38 2.87 3.38 6.41zM24 12c0 3.17-.53 5.75-1.19 5.75s-1.19-2.58-1.19-5.75.53-5.75 1.19-5.75S24 8.83 24 12z" />
  </svg>
                ),
              },
            ].map(({ label, href, svg }, i) => (
              <motion.a
                key={label}
                href={href}
                className="social-link"
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.75 + i * 0.06 }}
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
              >
                {svg}
              </motion.a>
            ))}
          </div>
        </aside>

        {/* ── RIGHT PANEL ── */}
        <main className="right-panel">

          {/* ABOUT */}
          <AnimatedSection id="about">
            <SectionLabel>About</SectionLabel>
            <motion.div className="about-text" variants={fadeUp}>
              <p>
                I'm a frontend developer with a specialty in building{' '}
                <strong>pixel-perfect, responsive interfaces</strong> — focused on clean code,
                great UX, and performance-first web applications.
              </p>
              <p>
                Currently working at <strong>KudiCore</strong>, where I translate Figma designs
                into production-ready interfaces using PHP, Laravel, and modern frontend stacks.
                I care deeply about the details — from animation timing to accessibility.
              </p>
              <p>
                Previously I've worked across early-stage startups and bootcamp environments,
                including <strong>Flypro.io</strong> and <strong>Trameter Inc.</strong>, where
                I built component systems, led frontend development, and mentored junior engineers.
              </p>
              <p>
                When I'm not pushing pixels, I'm exploring open-source tools, writing about web
                development, or experimenting with new CSS techniques. Based in{' '}
                <strong>Lagos, Nigeria</strong>.
              </p>
            </motion.div>
          </AnimatedSection>

          {/* EXPERIENCE */}
          <section id="experience" className="port-section">
            <div className="section-label">Experience</div>
            {EXPERIENCE.map((item, i) => (
              <ExperienceItem key={item.company + i} item={item} index={i} />
            ))}

            <div>View Full Resume</div>
          </section>

          {/* PROJECTS */}
          <section id="projects" className="port-section">
            <div className="section-label">Projects</div>
            {PROJECTS.map((item, i) => (
              <ProjectCard key={item.title} item={item} index={i} />
            ))}
          </section>

          {/* ARTICLES */}
          <section id="articles" className="port-section">
            <div className="section-label">Articles</div>
            {ARTICLES.map((item, i) => (
              <ArticleItem key={item.title} item={item} index={i} />
            ))}
          </section>

          {/* FOOTER */}
          <footer className="footer">
            <p>
              Designed in Figma, coded in React + Vite + CSS. Depolyed to Netlify{' '}
              <a href="https://lastest-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer">
                by Blessing Dawodu,
              </a>{' '}
              Lagos, Nigeria.
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}

export default App;
