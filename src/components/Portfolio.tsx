"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import ProjectDetail from "./ProjectDetail";

interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  bgColor?: string;
  images?: string[];
  detail: {
    background: string;
    methodology: string;
    outcomes: string;
  } | null;
}

function ProjectCard({
  title,
  description,
  image,
  bgColor,
  hasDetail,
  onClick,
}: {
  title: string;
  description: string;
  image?: string;
  bgColor?: string;
  hasDetail: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={hasDetail ? onClick : undefined}
      className={`border border-neutral-200 overflow-hidden transition-all duration-300 group ${
        hasDetail
          ? "cursor-pointer hover:shadow-[0_0_24px_rgba(0,0,0,0.08)] hover:border-neutral-300"
          : ""
      }`}
    >
      <div className="h-40 flex items-center justify-center overflow-hidden relative" style={{ backgroundColor: bgColor || "#f5f5f5" }}>
        {image ? (
          <>
            <img src={image} alt={title} className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${bgColor ? "object-contain" : "object-cover"}`} onContextMenu={(e) => e.preventDefault()} draggable={false} />
            <span className="absolute bottom-1 right-1 text-white/40 text-[8px] font-light pointer-events-none select-none">
              © Jiwen Wang
            </span>
          </>
        ) : (
          <div className="w-10 h-10 border border-neutral-300 flex items-center justify-center">
            <span className="text-xs text-neutral-400 font-mono">img</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h4 className="text-sm font-medium text-neutral-900 mb-2">{title}</h4>
        <p className="text-xs text-neutral-500 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export function PortfolioProfessional() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const tabs = t.portfolio.professional.tabs;
  const items: ProjectItem[] =
    activeTab === 0
      ? t.portfolio.professional.dataItems
      : t.portfolio.professional.designItems;

  return (
    <section id="portfolio-professional" className="py-28 px-6 bg-[#f7f5f2]">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold text-neutral-900 mb-10 text-center tracking-tight"
        >
          {t.portfolio.professional.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-1 mb-10"
        >
          {tabs.map((tab: string, i: number) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-1.5 text-xs tracking-wide transition-all ${
                activeTab === i
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-500 hover:text-neutral-900 border border-neutral-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {items.map((item) => (
            <ProjectCard
              key={item.title}
              title={item.title}
              description={item.description}
              image={item.image}
              bgColor={item.bgColor}
              hasDetail={item.detail !== null}
              onClick={() => setSelectedProject(item)}
            />
          ))}
        </motion.div>
      </div>

      <ProjectDetail
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

export function PortfolioPhotography() {
  const { t } = useLanguage();
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });
  const photos = t.portfolio.photography.items as { src: string; alt: string; span?: string }[];

  return (
    <section id="portfolio-photography" className="py-28 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-semibold text-neutral-900 mb-2 tracking-tight">
            {t.portfolio.photography.title}
          </h2>
          <p className="text-sm text-neutral-400">{t.portfolio.photography.subtitle}</p>
        </motion.div>

        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {photos.map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="break-inside-avoid cursor-pointer group overflow-hidden"
              onClick={() => setLightbox({ open: true, index: i })}
            >
              <div className="relative">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
                />
                <span className="absolute bottom-2 right-2 text-white/40 text-[10px] font-light pointer-events-none select-none">
                  © Jiwen Wang
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Photo Lightbox */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 cursor-zoom-out"
            onClick={() => setLightbox({ ...lightbox, open: false })}
          >
            <button
              onClick={() => setLightbox({ ...lightbox, open: false })}
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <span className="text-2xl">×</span>
            </button>

            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setLightbox({ open: true, index: (lightbox.index - 1 + photos.length) % photos.length }); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setLightbox({ open: true, index: (lightbox.index + 1) % photos.length }); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
                >
                  ›
                </button>
              </>
            )}

            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <img
                src={photos[lightbox.index].src}
                alt={photos[lightbox.index].alt}
                className="max-w-[90vw] max-h-[90vh] object-contain"
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
              />
              <span className="absolute bottom-4 right-4 text-white/30 text-sm font-light pointer-events-none select-none">
                © Jiwen Wang
              </span>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tabular-nums">
              {lightbox.index + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
