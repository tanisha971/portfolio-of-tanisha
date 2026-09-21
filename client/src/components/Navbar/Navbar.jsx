import { useEffect, useState } from "react";
import { Download, Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { getResume } from "../../services/assetService";

// ----------------------------------------
// Navigation Links
// ----------------------------------------

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
  {
    name: "Coding Profiles",
    href: "/coding-profiles",
    anchor: "coding-profiles",
  },
  {
    name: "Content Creation",
    href: "/content-creation",
    anchor: "content-creation",
  },
  {
    name: "Contact",
    href: "/contact",
    anchor: "contact",
  },
];

// ----------------------------------------
// Google Drive Helpers
// ----------------------------------------

const getDriveFileId = (url) => {
  if (!url) return null;

  // Format:
  // https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = url.match(/\/file\/d\/([^/]+)/);

  if (fileMatch) {
    return fileMatch[1];
  }

  // Format:
  // https://drive.google.com/open?id=FILE_ID
  // or
  // https://drive.google.com/uc?id=FILE_ID
  const idMatch = url.match(/[?&]id=([^&]+)/);

  if (idMatch) {
    return idMatch[1];
  }

  return null;
};

const getDriveDownloadUrl = (url) => {
  const fileId = getDriveFileId(url);

  if (!fileId) {
    return url;
  }

  return `https://drive.google.com/uc?export=download&id=${fileId}`;
};

// ----------------------------------------
// Navbar
// ----------------------------------------

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const [resumeUrl, setResumeUrl] = useState("");

  // ----------------------------------------
  // Load Resume From Backend
  // ----------------------------------------

  useEffect(() => {
    const loadResume = async () => {
      try {
        const data = await getResume();

        if (data?.url) {
          setResumeUrl(data.url);
        }
      } catch (error) {
        console.error("Failed to load resume:", error);
      }
    };

    loadResume();
  }, []);

  // ----------------------------------------
  // Scroll Handling
  // ----------------------------------------

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ----------------------------------------
  // Mobile Menu
  // ----------------------------------------

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  // ----------------------------------------
  // Resume URL
  // ----------------------------------------

  const downloadResumeUrl = getDriveDownloadUrl(resumeUrl);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/10 bg-black/75 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}

        <a
          href="/home"
          className="text-2xl font-bold tracking-wide text-white transition hover:text-gray-300"
        >
          Tanisha Ali<span className="text-gray-400">.</span>
        </a>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 lg:flex">

          {/* Primary Links */}

          {primaryLinks.map((link) => {
            const isActive = activeSection === link.anchor;

            return (
              <Link
                key={link.name}
                to={link.href}
                className={`relative text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}

                <span
                  className={`absolute -bottom-2 left-0 h-[2px] bg-white transition-all duration-300 ${
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
              className="flex items-center gap-1 text-sm font-medium text-gray-400 transition hover:text-white"
            >
              More

              <ChevronDown
                size={16}
                className={`transition duration-300 ${
                  moreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {moreOpen && (
              <div className="absolute right-0 mt-4 w-64 overflow-hidden rounded-2xl border border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl">

                {moreLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMoreOpen(false)}
                    className="block px-5 py-3 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="mx-4 border-t border-white/10" />

                <Link
                  to="/login"
                  onClick={() => setMoreOpen(false)}
                  className="block px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
                >
                  Admin Login
                </Link>

              </div>
            )}
          </div>

          {/* Resume */}

          {resumeUrl && (
            <a
              href={downloadResumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-gray-200"
            >
              <Download size={18} />
              Download CV
            </a>
          )}
        </nav>

        {/* Mobile Menu Button */}

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}

      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          mobileOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="border-t border-white/10 bg-black/95 px-6 py-6 backdrop-blur-xl">

          <div className="flex flex-col gap-6">

            {/* Primary Links */}

            {primaryLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={closeMobileMenu}
                className="text-gray-300 transition hover:text-white"
              >
                {link.name}
              </Link>
            ))}

            {/* More */}

            <div className="border-t border-white/10 pt-4">

              <p className="mb-4 text-xs uppercase tracking-widest text-gray-500">
                More
              </p>

              {moreLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={closeMobileMenu}
                  className="block py-2 text-gray-300 transition hover:text-white"
                >
                  {link.name}
                </Link>
              ))}

              {/* Admin Login */}

              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="mt-3 block rounded-xl border border-white/20 px-5 py-3 text-center font-semibold text-white transition hover:bg-white hover:text-black"
              >
                Admin Login
              </Link>

            </div>

            {/* Mobile Resume */}

            {resumeUrl && (
              <a
                href={downloadResumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200"
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