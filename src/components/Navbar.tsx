"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setProjectsOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProjectsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navItems = [
    { id: "intro", label: t.nav.about },
    { id: "education", label: t.nav.education },
    { id: "experience", label: t.nav.experience },
    { id: "skills", label: t.nav.skills },
  ];

  const projectSubItems = [
    { id: "portfolio-professional", label: t.nav.projectsProfessional },
    { id: "portfolio-photography", label: t.nav.projectsPhotography },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-neutral-100"
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="text-sm font-medium text-neutral-900 tracking-wide"
        >
          {t.hero.name} {t.hero.lastName}
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollTo("intro")}
            className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors tracking-wide uppercase"
          >
            {t.nav.about}
          </button>

          {/* Projects dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setProjectsOpen(!projectsOpen)}
              className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors tracking-wide uppercase flex items-center gap-1"
            >
              {t.nav.projects}
              <ChevronDown
                size={10}
                className={`transition-transform ${projectsOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {projectsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.12 }}
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white border border-neutral-100 py-1.5 min-w-[140px] shadow-sm"
                >
                  {projectSubItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className="w-full text-left px-4 py-1.5 text-xs text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navItems.slice(1).map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors tracking-wide uppercase"
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
            className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition-colors px-2.5 py-1 border border-neutral-200 hover:border-neutral-400"
          >
            <Globe size={12} />
            {locale === "zh" ? "EN" : "中文"}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
            className="flex items-center gap-1 text-xs text-neutral-500 px-2 py-1 border border-neutral-200"
          >
            <Globe size={12} />
            {locale === "zh" ? "EN" : "中文"}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-neutral-700">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-neutral-100 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2.5">
              <button
                onClick={() => scrollTo("intro")}
                className="text-xs text-neutral-500 hover:text-neutral-900 text-left py-1 uppercase tracking-wide"
              >
                {t.nav.about}
              </button>

              <div className="text-xs text-neutral-400 text-left py-1 uppercase tracking-wide">
                {t.nav.projects}
              </div>
              {projectSubItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-xs text-neutral-500 hover:text-neutral-900 text-left py-1 pl-4"
                >
                  {item.label}
                </button>
              ))}

              {navItems.slice(1).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-xs text-neutral-500 hover:text-neutral-900 text-left py-1 uppercase tracking-wide"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
