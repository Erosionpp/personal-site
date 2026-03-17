"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { playlist } from "@/lib/music";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

export default function MusicPlayer() {
  const { t } = useLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const track = playlist[currentIndex];
  const hasAudio = track?.src !== "";

  const play = useCallback(async () => {
    if (!audioRef.current || !hasAudio) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [hasAudio]);

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) pause();
    else play();
  };

  const [pendingPlay, setPendingPlay] = useState(false);

  const skipNext = () => {
    const next = (currentIndex + 1) % playlist.length;
    setCurrentIndex(next);
    setProgress(0);
    setDuration(0);
    if (isPlaying) setPendingPlay(true);
  };

  const skipPrev = () => {
    const prev = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentIndex(prev);
    setProgress(0);
    setDuration(0);
    if (isPlaying) setPendingPlay(true);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !pendingPlay) return;
    audio.load();
    const handleCanPlay = () => {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      setPendingPlay(false);
      audio.removeEventListener("canplay", handleCanPlay);
    };
    audio.addEventListener("canplay", handleCanPlay);
    return () => audio.removeEventListener("canplay", handleCanPlay);
  }, [currentIndex, pendingPlay]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !hasAudio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = ratio * duration;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => skipNext();

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  });

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="mt-14"
    >
      <p className="text-neutral-400 text-xs mb-4 tracking-wide">
        {t.music.prompt}
      </p>

      <div className="max-w-sm mx-auto border border-neutral-200 p-4">
        {hasAudio && <audio ref={audioRef} src={track.src} preload="metadata" />}

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-0.5 shrink-0">
            <button
              onClick={skipPrev}
              className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <SkipBack size={14} />
            </button>
            <button
              onClick={togglePlay}
              className="w-9 h-9 flex items-center justify-center bg-neutral-900 text-white hover:bg-neutral-700 transition-colors"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </button>
            <button
              onClick={skipNext}
              className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <SkipForward size={14} />
            </button>
          </div>

          <div className="flex-1 min-w-0 text-left">
            <p className="text-xs font-medium text-neutral-900 truncate">
              {track.title}
            </p>
            <p className="text-[10px] text-neutral-400 mb-2 truncate">{track.artist}</p>

            <div
              onClick={handleSeek}
              className="h-[3px] bg-neutral-200 cursor-pointer group relative"
            >
              <div
                className="h-full bg-neutral-900 transition-all duration-150 relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-neutral-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="flex justify-between mt-1">
              {hasAudio ? (
                <span className="text-[10px] text-neutral-400 tabular-nums">
                  {formatTime(progress)}{duration > 0 ? ` / ${formatTime(duration)}` : ""}
                </span>
              ) : (
                <p className="text-[10px] text-neutral-300">{t.music.noAudio}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
