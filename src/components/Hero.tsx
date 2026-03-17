"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero({ onOpenChat }: { onOpenChat: () => void }) {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden flex items-center bg-white"
    >
      {/* Vertical stripes background — soft rose tint for visual pop */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="w-full h-full flex">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="flex-1 flex">
              <div className="w-1/2 bg-[#dea99f]/28" />
              <div className="w-1/2" />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        {/* Left: Text */}
        <div className="flex-1 max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl font-medium text-neutral-800 tracking-wide mb-1"
          >
            {t.hero.greeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-7xl md:text-8xl lg:text-9xl font-bold text-neutral-900 tracking-[0.15em] leading-none mb-5"
          >
            {t.hero.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-[13px] md:text-sm font-medium text-neutral-800 tracking-wide mb-5"
          >
            {t.hero.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-[13px] md:text-sm text-neutral-600 leading-relaxed mb-8 max-w-lg"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex items-center gap-4"
          >
            <button
              onClick={onOpenChat}
              className="px-7 py-3 bg-neutral-400/60 text-white text-sm font-medium tracking-wider hover:bg-neutral-500/70 transition-colors"
            >
              {t.hero.chatCta}
            </button>
            <span className="text-sm text-neutral-500">
              {t.hero.orTo}
            </span>
            <button
              onClick={() =>
                document
                  .getElementById("intro")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-7 py-3 border border-neutral-400/60 text-neutral-700 text-sm font-medium tracking-wider hover:border-neutral-600 hover:text-neutral-900 transition-colors"
            >
              {t.hero.cta}
            </button>
          </motion.div>
        </div>

        {/* Right: Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: -4 }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          className="flex-shrink-0 w-72 md:w-80 lg:w-96"
        >
          <div className="relative">
            {/* Shadow offset layer */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-neutral-300/40" />
            {/* Photo */}
            <div className="relative overflow-hidden aspect-[3/4]">
              <Image
                src="/hero-photo.jpg"
                alt="Jiwen Wang"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
