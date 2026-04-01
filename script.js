const { useEffect, useMemo, useState } = React;

const CONTACT_EMAIL = "goldysha156@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/goldy-sharma-65362131a/";
const GITHUB_URL = "https://github.com/Goldy36";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const projectFilters = ["All", "Full Stack", "Machine Learning", "Frontend"];

const skillGroups = [
  {
    title: "Programming Languages",
    icon: "fa-solid fa-code",
    items: ["C++", "Java", "JavaScript"],
  },
  {
    title: "Technologies",
    icon: "fa-solid fa-laptop-code",
    items: ["MERN Stack", "MongoDB", "Node.js", "React"],
  },
  {
    title: "Core Subjects",
    icon: "fa-solid fa-book-open-reader",
    items: ["Data Structures & Algorithms", "Operating Systems", "DBMS"],
  },
];

const impactStats = [
  { value: "4+", label: "End-to-End Projects Delivered" },
  { value: "120+", label: "Users Served Across Student Platforms" },
  { value: "300+", label: "DSA Problems Practiced" },
];

// Point each project to a dedicated repository URL when available.
const projects = [
  {
    title: "Student Feedback Collection System",
    description:
      "Built a role-based MERN platform with JWT authentication, protected REST APIs, and MongoDB-backed feedback analytics that handled 120+ students and 18+ faculty users.",
    impact: "Reduced manual feedback compilation time by ~60% with centralized dashboards.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Chart.js"],
    category: "Full Stack",
    github: GITHUB_URL,
    demo: "",
  },
  {
    title: "Spam Mail Classifier",
    description:
      "Implemented an email classification pipeline using TF-IDF vectorization and supervised ML models to classify spam vs legitimate messages on 5,000+ labeled emails.",
    impact: "Achieved ~96% validation accuracy while cutting false-positive rate by ~20% after feature tuning.",
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    category: "Machine Learning",
    github: GITHUB_URL,
    demo: "",
  },
  {
    title: "Airbnb Clone",
    description:
      "Developed a responsive React-based booking interface with reusable UI components, advanced filtering, and REST API integration for dynamic listing and detail pages.",
    impact: "Improved mobile usability and reduced page interaction latency by ~35% through component-level optimization.",
    tech: ["React", "JavaScript", "REST API", "CSS", "Responsive UI"],
    category: "Frontend",
    github: GITHUB_URL,
    demo: "",
  },
  {
    title: "Sorting Visualizer",
    description:
      "Created an interactive visualization tool for Bubble, Merge, Quick, and Selection sort with adjustable dataset size, animation speed controls, and complexity overlays.",
    impact: "Helped peers understand algorithm trade-offs, reducing debugging/learning time by ~30% during practice sessions.",
    tech: ["JavaScript", "HTML5", "CSS3", "Data Structures", "Animations"],
    category: "Frontend",
    github: GITHUB_URL,
    demo: "",
  },
];

const achievements = [
  "Cleared Round 2 of Flipkart GRID 7.0.",
  "Recipient of a government scholarship for academic performance.",
  "Consistent DSA practice focused on optimization and scalable logic.",
  "Hands-on execution of full stack and machine learning projects.",
];

// Replace this with your real Formspree endpoint after creating a form.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xojplpbo";

const milestones = [
  {
    title: "Independent Project Development",
    detail:
      "Shipped full stack and ML projects end-to-end, from requirements and schema design to deployment-ready UI workflows.",
  },
  {
    title: "DSA and Problem Solving",
    detail:
      "Consistent interview-oriented practice across arrays, trees, graphs, and dynamic programming with a focus on optimized complexity.",
  },
  {
    title: "Engineering Fundamentals",
    detail:
      "Strengthening OS, DBMS, and backend fundamentals to write scalable, production-minded software engineering solutions.",
  },
];

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("All");
  const [formStatus, setFormStatus] = useState("");
  const [formStatusType, setFormStatusType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState("");
  const year = useMemo(() => new Date().getFullYear(), []);

  const filteredProjects = useMemo(() => {
    if (projectFilter === "All") {
      return projects;
    }
    return projects.filter((project) => project.category === projectFilter);
  }, [projectFilter]);

  // Persist preferred theme between visits.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Reveal sections once they enter the viewport.
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((element) => revealObserver.observe(element));

    return () => revealObserver.disconnect();
  }, []);

  // Keep nav highlight stable by mapping current scroll position to nearest section top.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    if (!sections.length) {
      return undefined;
    }

    const updateActiveSection = () => {
      const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 74;
      const offsetLine = window.scrollY + navbarHeight + 20;
      let current = sections[0].id;

      sections.forEach((section) => {
        if (offsetLine >= section.offsetTop) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  // Track page scroll progress and back-to-top visibility.
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 420);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const handleNavClick = (sectionId = "") => {
    if (sectionId) {
      setActiveSection(sectionId);
    }
    setMenuOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (FORMSPREE_ENDPOINT.includes("your_form_id")) {
      setFormStatusType("error");
      setFormStatus("Add your Formspree form ID in script.js to activate email delivery.");
      return;
    }

    setIsSubmitting(true);
    setFormStatus("");
    setFormStatusType("");

    const formData = new FormData(event.currentTarget);
    formData.append("_subject", "Portfolio Contact Form Submission");
    const isLocalPreview = window.location.protocol === "file:";

    try {
      if (isLocalPreview) {
        // In file:// preview, browsers may block cross-origin response access even when Formspree receives data.
        await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          body: formData,
        });
        event.currentTarget.reset();
        setFormStatusType("success");
        setFormStatus("Message submitted successfully.");
      } else {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        });

        if (response.ok) {
          event.currentTarget.reset();
          setFormStatusType("success");
          setFormStatus("Message sent successfully. Thank you for reaching out.");
        } else {
          let errorMessage = "Could not send your message right now. Please try again.";
          try {
            const errorData = await response.json();
            if (errorData?.errors?.length) {
              errorMessage = errorData.errors.map((item) => item.message).join(" ");
            }
          } catch {
            // Keep fallback message if Formspree response body is not JSON.
          }
          setFormStatusType("error");
          setFormStatus(errorMessage);
        }
      }
    } catch {
      if (isLocalPreview) {
        setFormStatusType("success");
        setFormStatus("Submitted from local preview. If needed, check your inbox for confirmation.");
      } else {
        setFormStatusType("error");
        setFormStatus("Network error. Please check your connection and try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(""), 1400);
    } catch {
      setFormStatusType("error");
      setFormStatus("Clipboard access blocked. Please copy the email manually.");
    }
  };

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ width: `${scrollProgress}%` }}></span>
      </div>

      <header className="navbar">
        <nav className="container nav-inner">
          <a href="#home" className="brand" onClick={() => handleNavClick("home")}>
            GS
          </a>

          <button
            className={`menu-toggle ${menuOpen ? "open" : ""}`}
            type="button"
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeSection === item.id ? "active" : ""}
                  aria-current={activeSection === item.id ? "page" : undefined}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="theme-btn"
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark and light mode"
          >
            <i className={theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
          </button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero container">
          <div className="hero-content reveal">
            <p className="section-tag">Portfolio</p>
            <p className="availability-badge">
              <span></span> Open to internship and SDE opportunities
            </p>
            <h1>Goldy Sharma</h1>
            <h2>Aspiring Software Engineer | MERN | DSA</h2>
            <p>
              B.E. Computer Science Engineering (2nd Year) at Chandigarh University.
              Building production-minded full stack and machine learning projects with
              strong focus on data structures, algorithms, and core CS fundamentals for
              high-impact software engineering roles.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                Explore Projects
              </a>
              <a href="#contact" className="btn btn-secondary">
                Hire / Contact
              </a>
              <a
                href="./assets/Goldy-Sharma-Resume.pdf"
                className="btn btn-secondary"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-solid fa-file-arrow-down"></i> Resume
              </a>
            </div>
            <div className="hero-metrics">
              <span>Government Scholarship Recipient</span>
            </div>

            <div className="hero-stats">
              {impactStats.map((stat) => (
                <article key={stat.label} className="stat-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="hero-photo reveal">
            <figure className="profile-frame">
              <img
                className="profile-photo"
                src="./assets/goldy-profile-original.jpg"
                alt="Goldy Sharma portrait"
                width="900"
                height="1200"
                fetchPriority="high"
                decoding="async"
              />
            </figure>
          </div>
        </section>

        <section id="about" className="section container reveal">
          <p className="section-tag">About Me</p>
          <h3>Driven by Growth, Built on Fundamentals</h3>
          <p className="about-text">
            I am Goldy Sharma, a Computer Science Engineering student focused on solving
            real problems with scalable software. I combine disciplined DSA practice,
            backend fundamentals, and hands-on product development to contribute as a
            reliable software engineer in high-growth teams.
          </p>
        </section>

        <section id="skills" className="section container reveal">
          <p className="section-tag">Skills</p>
          <h3>Technical Expertise</h3>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-card" key={group.title}>
                <h4>
                  <i className={group.icon}></i> {group.title}
                </h4>
                <ul className="skill-list">
                  {group.items.map((item) => (
                    <li key={item} className="skill-pill">
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section container reveal">
          <p className="section-tag">Projects</p>
          <h3>What I Have Built</h3>

          <div className="project-filter">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`filter-btn ${projectFilter === filter ? "active" : ""}`}
                onClick={() => setProjectFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {filteredProjects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-head">
                  <h4>{project.title}</h4>
                  <span className="project-type">{project.category}</span>
                </div>
                <p>{project.description}</p>
                <p className="project-impact">
                  <i className="fa-solid fa-chart-line"></i> {project.impact}
                </p>
                <div className="chip-wrap">
                  {project.tech.map((tool) => (
                    <span className="chip" key={`${project.title}-${tool}`}>
                      {tool}
                    </span>
                  ))}
                </div>
                <div className="project-actions">
                  <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-small">
                    <i className="fa-brands fa-github"></i> GitHub
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-small btn-secondary">
                      <i className="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section container reveal">
          <p className="section-tag">Experience & Achievements</p>
          <h3>Execution Mindset</h3>
          <div className="experience-grid">
            {milestones.map((item) => (
              <article className="experience-card" key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
          <ul className="achievement-list">
            {achievements.map((point) => (
              <li key={point}>
                <i className="fa-solid fa-circle-check"></i>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" className="section container reveal">
          <p className="section-tag">Contact</p>
          <h3>Let's Connect</h3>
          <div className="contact-grid">
            <article className="contact-card">
              <h4>Contact Details</h4>
              <p className="contact-item">
                <i className="fa-solid fa-envelope"></i>
                <a href={`mailto:${CONTACT_EMAIL}`} target="_blank" rel="noreferrer">
                  {CONTACT_EMAIL}
                </a>
                <button type="button" className="copy-btn" onClick={() => copyEmail(CONTACT_EMAIL)}>
                  Copy
                </button>
              </p>
              <p>
                <i className="fa-brands fa-linkedin"></i>
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                  linkedin.com/in/goldy-sharma-65362131a
                </a>
              </p>
              <p>
                <i className="fa-brands fa-github"></i>
                <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                  github.com/Goldy36
                </a>
              </p>
              {copiedEmail && <small className="form-status">Copied: {copiedEmail}</small>}
            </article>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Your Name" required />

              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="Your Email" required />

              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" type="text" placeholder="Opportunity / Collaboration" required />

              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder="Write your message..." required></textarea>

              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              {formStatus && (
                <small className={`form-status ${formStatusType || ""}`} aria-live="polite">
                  {formStatus}
                </small>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>Copyright (c) {year} Goldy Sharma. All rights reserved.</p>
        </div>
      </footer>

      <button
        type="button"
        className={`back-to-top ${showBackToTop ? "show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
