"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import MusicPlayer from "./MusicPlayer";

export default function Intro() {
  const { t } = useLanguage();

  return (
    <section id="intro" className="py-28 px-6 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold text-neutral-900 mb-6 tracking-tight"
        >
          {t.intro.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-neutral-500 leading-relaxed"
        >
          {t.intro.description}
        </motion.p>

        <MusicPlayer />
      </div>
    </section>
  );
}
