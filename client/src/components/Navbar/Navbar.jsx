import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
// import resume from "../../assets/resume/Tanisha_Ali_Resume.pdf";

const navLinks = [
  { name: "Home", href: "/home", anchor: "home" },
  { name: "About", href: "/about", anchor: "about" },
  { name: "Skills", href: "/skills", anchor: "skills" },
  { name: "Experience", href: "/experience", anchor: "experience" },
  { name: "Projects", href: "/projects", anchor: "projects" },
  { name: "Achievements", href: "/achievements", anchor: "achievements" },
  { name: "Certificates", href: "/certificates", anchor: "certificates" },  
  { name: "Coding Profiles", href: "/coding-profiles", anchor: "coding-profiles" },
  { name: "Contact", href: "/contact", anchor: "contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = navLinks
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

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

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
          Tanisha<span className="text-gray-400">.</span>
        </a>

        {/* Desktop */}

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
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
                    isActive
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}

          {/* Resume */}

          <a
            // href={resume}
            // download
            href="#"
            className="flex items-center gap-2 rounded-xl border border-white bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-gray-200"
          >
            <Download size={18} />
            Download CV
          </a>

          <Link
            to="/login"
            className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Button */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white lg:hidden"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}

      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          mobileOpen ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="border-t border-white/10 bg-black/95 px-6 py-6 backdrop-blur-xl">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={closeMobileMenu}
                className="text-gray-300 transition hover:text-white"
              >
                {link.name}
              </Link>
            ))}

            <a
              // href={resume}
              // download
              href="#"
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200"
            >
              <Download size={18} />
              Download CV
            </a>

            <Link
              to="/login"
              onClick={closeMobileMenu}
              className="rounded-xl border border-white/20 px-5 py-3 text-center font-semibold text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}