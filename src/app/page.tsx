"use client";

import { useState } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/About";
import { PortfolioProfessional, PortfolioPhotography } from "@/components/Portfolio";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Hobbies from "@/components/Hobbies";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero onOpenChat={() => setChatOpen(true)} />
        <Intro />
        <PortfolioProfessional />
        <Education />
        <Experience />
        <Skills />
        <Hobbies />
        <PortfolioPhotography />
      </main>
      <ChatWidget isOpen={chatOpen} onToggle={() => setChatOpen(!chatOpen)} />

      <footer className="py-10 text-center text-xs text-neutral-400 border-t border-neutral-100 space-y-2">
        <div className="flex items-center justify-center gap-4">
          <a
            href="mailto:jiwen.wang2000@gmail.com"
            className="hover:text-neutral-700 transition-colors"
          >
            Email
          </a>
          <span className="text-neutral-200">·</span>
          <a
            href="https://github.com/Erosionpp"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-700 transition-colors"
          >
            GitHub
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Jiwen Wang</p>
      </footer>
    </LanguageProvider>
  );
}
