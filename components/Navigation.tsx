"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const links = [
  { label: "Experience", href: "/experience" },
  { label: "Research", href: "/research" },
  { label: "Awards", href: "/awards" },
  { label: "Courses", href: "/courses" },
  { label: "Personal", href: "/personal" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [centerY, setCenterY] = useState(300);
  const { scrollY, scrollYProgress } = useScroll();

  useEffect(() => {
    const calc = () => {
      const navHeight = links.length * 20 + (links.length - 1) * 24;
      setCenterY((window.innerHeight - navHeight) / 2);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Vertical nav interpolations: extended when at top, collapsed on scroll
  const navTop = useTransform(scrollY, [0, 400], [centerY, 90]);
  const navGap = useTransform(scrollY, [0, 400], [24, 10]);

  return (
    <>
      {/* Top bar — logo + scroll progress */}
      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <Link href="/" className="nav-logo">
          Abhi Wadhwa
        </Link>

        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>

        {/* Horizontal scroll progress */}
        <motion.div
          className="scroll-progress"
          style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        />
      </nav>

      {/* Vertical nav — right side, scroll-driven */}
      <motion.nav
        className="nav-vertical"
        style={{ top: navTop, gap: navGap }}
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`nav-vertical-link ${pathname === l.href ? "active" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </motion.nav>

      {mobileOpen && (
        <div className="nav-mobile-overlay">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
