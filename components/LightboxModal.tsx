"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: string;
}

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export default function LightboxModal({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  if (currentIndex === null || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        const prev = (currentIndex - 1 + items.length) % items.length;
        onNavigate(prev);
      }
      if (e.key === "ArrowRight") {
        const next = (currentIndex + 1) % items.length;
        onNavigate(next);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, items.length, onClose, onNavigate]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prev = (currentIndex - 1 + items.length) % items.length;
    onNavigate(prev);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = (currentIndex + 1) % items.length;
    onNavigate(next);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 text-[#a3a3a3] hover:text-[#ff2b42] p-2.5 rounded-full bg-[#121212] border border-[#222] transition-colors text-xs font-mono uppercase tracking-widest"
        >
          ✕ Close
        </button>

        {/* Counter Tag */}
        <div className="absolute top-6 left-6 text-xs text-[#ff2b42] font-mono tracking-widest bg-[#121212] border border-[#ff2b42]/30 px-3.5 py-1.5 rounded-full">
          {currentIndex + 1} / {items.length}
        </div>

        {/* Previous Navigation Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-[#ff2b42] p-4 rounded-full bg-[#121212]/80 border border-[#262626] transition-all hover:scale-110 text-xl font-bold"
        >
          ‹
        </button>

        {/* Next Navigation Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-[#ff2b42] p-4 rounded-full bg-[#121212]/80 border border-[#262626] transition-all hover:scale-110 text-xl font-bold"
        >
          ›
        </button>

        {/* Main Image View */}
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-4xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-[65vh] sm:h-[75vh] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,43,66,0.2)] border border-[#222]">
            <Image
              src={currentItem.src}
              alt={currentItem.title}
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="mt-4 text-center">
            <h4 className="font-serif text-2xl font-normal text-[#f5f5f5] mb-1">
              {currentItem.title}
            </h4>
            <p className="font-handwriting text-xl text-[#ff2b42]">
              {currentItem.caption}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
