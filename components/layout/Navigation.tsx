"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Experience", href: "#experience" },
  { label: "Research", href: "#research" },
  { label: "Awards", href: "#awards" },
  { label: "Courses", href: "#courses" },
  { label: "Personal", href: "#personal" },
];

export default function Navigation() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);

      const sections = navItems.map((item) => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop Nav */}
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex
              items-center gap-1 px-2 py-2
              bg-[rgba(255,255,255,0.04)] backdrop-blur-[20px] backdrop-saturate-[180%]
              border border-[rgba(255,255,255,0.08)]
              shadow-[0_8px_32px_rgba(0,0,0,0.25)]
              rounded-full"
          >
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full"
                style={{
                  color:
                    activeSection === item.href.slice(1)
                      ? "#e8e8ed"
                      : "#8b8b9e",
                }}
              >
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[rgba(255,255,255,0.08)] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile hamburger */}
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="fixed top-4 right-4 z-50 md:hidden p-3
              bg-[rgba(255,255,255,0.06)] backdrop-blur-[20px]
              border border-[rgba(255,255,255,0.1)] rounded-full"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <X size={20} color="#e8e8ed" />
            ) : (
              <Menu size={20} color="#e8e8ed" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center
              bg-[rgba(10,10,15,0.9)] backdrop-blur-[40px]"
          >
            <nav className="flex flex-col items-center gap-6">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item.href)}
                  className="text-2xl font-medium text-[#e8e8ed] hover:text-[#6e8efb] transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
