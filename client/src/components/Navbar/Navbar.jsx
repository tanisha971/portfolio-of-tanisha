
import { useEffect, useState } from "react";
import {
  Download,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getResume } from "../../services/assetService";

import "../../styles/portfolio-theme.css";

const primaryLinks = [
  { name: "Home", href: "/home", anchor: "home" },
  { name: "About", href: "/about", anchor: "about" },
  { name: "Skills", href: "/skills", anchor: "skills" },
  { name: "Experience", href: "/experience", anchor: "experience" },
  { name: "Projects", href: "/projects", anchor: "projects" },
  { name: "Achievements", href: "/achievements", anchor: "achievements" },
  { name: "Certificates", href: "/certificates", anchor: "certificates" },
];

const moreLinks = [
  { name: "Coding Profiles", href: "/coding-profiles", anchor: "coding-profiles" },
  { name: "Content Creation", href: "/content", anchor: "content" },
  { name: "Contact", href: "/contact", anchor: "contact" },
];

const getDriveFileId = (url) => {
  if (!url) return null;

  const fileMatch = url.match(/\/file\/d\/([^/]+)/);
  if (fileMatch) return fileMatch[1];

  const idMatch = url.match(/[?&]id=([^&]+)/);
  if (idMatch) return idMatch[1];

  return null;
};

const getDriveDownloadUrl = (url) => {
  const fileId = getDriveFileId(url);
  if (!fileId) return url;

  return `https://drive.google.com/uc?export=download&id=${fileId}`;
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");

  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return window.localStorage.getItem("portfolio-theme") || "dark";
  });

  useEffect(() => {
    const loadResume = async () => {
      try {
        const data = await getResume();
        if (data?.url) setResumeUrl(data.url);
      } catch (error) {
        console.error("Failed to load resume:", error);
      }
    };

    loadResume();
  }, []);

  // Apply the selected theme.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = [...primaryLinks, ...moreLinks]
        .map((item) => document.getElementById(item.anchor))
        .filter(Boolean);

      let current = "home";

      sections.forEach((section) => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;

        if (
          window.scrollY >= top &&
          window.scrollY < top + height
        ) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileOpen(false);
  const downloadResumeUrl = getDriveDownloadUrl(resumeUrl);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  const ThemeToggle = () => (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "navbar-scrolled" : "navbar-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link to="/home" className="navbar-logo text-2xl font-bold tracking-wide">
          Tanisha Ali<span className="navbar-accent">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {primaryLinks.map((link) => {
            const isActive = activeSection === link.anchor;

            return (
              <Link
                key={link.name}
                to={link.href}
                className={`navbar-link relative text-sm font-medium ${
                  isActive ? "active" : ""
                }`}
              >
                {link.name}
                <span
                  className={`navbar-link-underline absolute -bottom-2 left-0 h-[2px] transition-all duration-200 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}

          {/* More Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((prev) => !prev)}
              className="navbar-link flex items-center gap-1 text-sm font-medium"
              aria-expanded={moreOpen}
            >
              More
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  moreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {moreOpen && (
              <div className="navbar-dropdown absolute right-0 mt-4 w-64 overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl">
                {moreLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMoreOpen(false)}
                    className="navbar-dropdown-link block px-5 py-3 text-sm"
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="mx-4 border-t navbar-divider" />

                <Link
                  to="/login"
                  onClick={() => setMoreOpen(false)}
                  className="navbar-admin-link block px-5 py-3 text-sm font-semibold"
                >
                  Admin Login
                </Link>
              </div>
            )}
          </div>

          <ThemeToggle />

          {/* Resume */}
          {resumeUrl && (
            <a
              href={downloadResumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button-glow flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              <Download size={18} />
              Download CV
            </a>
          )}
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="navbar-menu-button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          mobileOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="navbar-mobile-menu border-t px-6 py-6 backdrop-blur-xl">
          <div className="flex flex-col gap-5">
            {primaryLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={closeMobileMenu}
                className={`navbar-link ${
                  activeSection === link.anchor ? "active" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="navbar-mobile-more border-t pt-4">
              <p className="navbar-muted mb-3 text-xs uppercase tracking-widest">
                More
              </p>

              {moreLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={closeMobileMenu}
                  className="navbar-link block py-2"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="navbar-admin-link mt-3 block rounded-xl border px-5 py-3 text-center font-semibold"
              >
                Admin Login
              </Link>
            </div>

            {resumeUrl && (
              <a
                href={downloadResumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="button-glow mt-2 flex items-center justify-center gap-2 rounded-full px-5 py-3 text-center font-semibold"
              >
                <Download size={18} />
                Download CV
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
