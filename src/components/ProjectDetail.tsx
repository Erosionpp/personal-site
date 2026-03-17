"use client";

import { useEffect, useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ProjectDetailData {
  title: string;
  description: string;
  tags: string[];
  images?: string[];
  detail: {
    background: string;
    methodology: string;
    outcomes: string;
  } | null;
}

export default function ProjectDetail({
  project,
  onClose,
}: {
  project: ProjectDetailData | null;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const labels = t.portfolio.detailLabels;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const media = project?.images?.filter(Boolean) ?? [];
  const hasImages = media.length > 0;
  const images = media;

  const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

  const goNext = useCallback(() => {
    if (images.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  }, [images.length]);

  const goPrev = useCallback(() => {
    if (images.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  }, [images.length]);

  // Reset index when project changes
  useEffect(() => {
    setCurrentIndex(0);
    setLightboxOpen(false);
  }, [project]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        e.stopPropagation();
        setLightboxOpen(false);
      } else {
        onClose();
      }
    };
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") handleEsc(e);
    });
    return () =>
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") handleEsc(e);
      });
  }, [onClose, lightboxOpen]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  const handleImageClick = () => {
    if (!isVideo(images[currentIndex])) {
      setLightboxOpen(true);
    }
  };

  return (
    <AnimatePresence>
      {project && project.detail && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25 }}
            className="relative bg-white w-full max-w-4xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Left: Image area */}
              <div className="md:w-1/2 bg-neutral-100 min-h-[240px] md:min-h-[480px] flex flex-col items-center justify-center relative shrink-0 overflow-hidden">
                {hasImages ? (
                  <>
                    {/* Image or Video with animation */}
                    <AnimatePresence mode="wait">
                      {isVideo(images[currentIndex]) ? (
                        <motion.video
                          key={currentIndex}
                          src={images[currentIndex]}
                          autoPlay
                          loop
                          muted
                          playsInline
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="w-full h-full object-contain absolute inset-0"
                          ref={(el) => {
                            if (el) el.playbackRate = 1.5;
                          }}
                        />
                      ) : (
                        <motion.img
                          key={currentIndex}
                          src={images[currentIndex]}
                          alt={`${project.title} - ${currentIndex + 1}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="w-full h-full object-contain absolute inset-0 cursor-zoom-in"
                          onClick={handleImageClick}
                        />
                      )}
                    </AnimatePresence>

                    {/* Zoom hint */}
                    {!isVideo(images[currentIndex]) && (
                      <button
                        onClick={handleImageClick}
                        className="absolute top-3 left-3 z-10 w-7 h-7 bg-white/70 backdrop-blur-sm border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-white transition-all"
                      >
                        <ZoomIn size={13} />
                      </button>
                    )}

                    {/* Carousel navigation */}
                    {images.length > 1 && (
                      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3 z-10">
                        <button
                          onClick={goPrev}
                          className="w-7 h-7 bg-white/80 backdrop-blur-sm border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-white transition-all"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <div className="flex gap-1.5">
                          {images.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentIndex(i)}
                              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                i === currentIndex
                                  ? "bg-neutral-900"
                                  : "bg-neutral-300 hover:bg-neutral-500"
                              }`}
                            />
                          ))}
                        </div>
                        <button
                          onClick={goNext}
                          className="w-7 h-7 bg-white/80 backdrop-blur-sm border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-white transition-all"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 border border-neutral-300 flex items-center justify-center">
                      <span className="text-xs text-neutral-400 font-mono">img</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-3">Image placeholder</p>
                  </>
                )}
              </div>

              {/* Right: Content */}
              <div className="md:w-1/2 p-6 md:p-8">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4 tracking-tight pr-8">
                  {project.title}
                </h3>

                <p className="text-xs text-neutral-500 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="space-y-5">
                  <div>
                    <h4 className="text-xs font-medium text-neutral-900 uppercase tracking-wider mb-2">
                      {labels.background}
                    </h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {project.detail.background}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-neutral-900 uppercase tracking-wider mb-2">
                      {labels.methodology}
                    </h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {project.detail.methodology}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-neutral-900 uppercase tracking-wider mb-2">
                      {labels.outcomes}
                    </h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {project.detail.outcomes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lightbox overlay */}
          <AnimatePresence>
            {lightboxOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 cursor-zoom-out"
                onClick={() => setLightboxOpen(false)}
              >
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                {/* Lightbox nav */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); goPrev(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); goNext(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                <motion.img
                  key={`lb-${currentIndex}`}
                  src={images[currentIndex]}
                  alt={`${project.title} - ${currentIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-[90vw] max-h-[90vh] object-contain"
                  onClick={(e) => e.stopPropagation()}
                />

                {/* Counter */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tabular-nums">
                  {currentIndex + 1} / {images.length}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
