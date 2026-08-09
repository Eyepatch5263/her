"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ChevronLeft, ChevronRight, Cake, Sparkles, Heart, CheckCircle2, Flame } from "lucide-react";

export default function BirthdaySection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isBlown, setIsBlown] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 1,
      badge: "Completed Event • August 8th",
      title: "Her Birthday Celebration",
      subtitle: "A day forever written in our hearts",
      description:
        "August 8th was a magical day dedicated entirely to celebrating you, your radiant smile, your endless kindness, and the irreplaceable warmth you bring to my life.",
      quote: "Celebrating the birth of my favorite human in the entire universe.",
      highlight: "Completed Celebration",
      type: "candle",
    },
    {
      id: 2,
      badge: "Completed Event • Wishes & Blessings",
      title: "My Endless Wish for You",
      subtitle: "May your new age bloom with magic",
      description:
        "May this new chapter bring you limitless laughter, peace of mind, unshakeable courage, and every single dream your heart holds dear.",
      quote: "You deserve every ounce of beauty this world has to offer.",
      highlight: "Warmest Wishes Sent",
      type: "wish",
    },
    {
      id: 3,
      badge: "Completed Event • Cherished Memories",
      title: "Moments of Pure Joy",
      subtitle: "Memories that stay forever young",
      description:
        "Looking back at August 8th with immense gratitude. Every candle blown, every laugh shared, and every message whispered created a memory we'll treasure forever.",
      quote: "Another year more radiant, more beautiful, and more loved.",
      highlight: "Timeless Keepsake",
      type: "memory",
    },
    {
      id: 4,
      badge: "Completed Event • Forever & Always",
      title: "To Many More August 8ths",
      subtitle: "Our journey continues with every passing year",
      description:
        "Though August 8th has passed for this year, my love and celebration of you never ends. Today, tomorrow, and every day to come.",
      quote: "You are my favorite reason to celebrate life.",
      highlight: "Infinite Love",
      type: "future",
    },
  ];

  // Auto-advance slide every 5 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const triggerConfetti = () => {
    setIsBlown(true);
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#ff2b42", "#ffffff", "#8b0000", "#e63946", "#f5f5f5", "#ffd166"],
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="birthday" className="py-28 px-6 bg-[#050505] relative overflow-hidden border-t border-[#1a1a1a]">
      {/* Deep Red Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#ff2b42] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181818] border border-[#2a2a2a] text-[#a3a3a3] text-xs font-semibold uppercase tracking-[0.2em] mb-4"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#ff2b42]" />
            <span>Completed Event • August 8th Birthday</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-serif text-4xl sm:text-6xl text-[#f5f5f5] font-normal mb-4"
          >
            Birthday Celebration Memories
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-16 h-[2px] bg-[#ff2b42] mx-auto mb-6"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-[#a3a3a3] text-sm sm:text-base font-light leading-relaxed"
          >
            August 8th has successfully passed and was celebrated with all our love! Explore the memory carousel of her special day below.
          </motion.p>
        </div>

        {/* Interactive Birthday Carousel Container */}
        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="bg-[#0d0d0d] rounded-3xl border border-[#222] p-8 sm:p-12 min-h-[380px] sm:min-h-[420px] flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
            {/* Ambient inner glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ff2b42]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Slide Content with AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="flex flex-col h-full justify-between z-10"
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#ff2b42] font-semibold bg-[#ff2b42]/10 px-3 py-1 rounded-full border border-[#ff2b42]/20">
                      {slides[currentSlide].badge}
                    </span>
                    <span className="text-xs text-[#737373] font-mono">
                      0{currentSlide + 1} / 0{slides.length}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#f5f5f5] mb-2 font-normal">
                    {slides[currentSlide].title}
                  </h3>
                  <p className="font-handwriting text-xl sm:text-2xl text-[#ff2b42] mb-6">
                    {slides[currentSlide].subtitle}
                  </p>

                  {/* Body description */}
                  <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed mb-6 font-light">
                    {slides[currentSlide].description}
                  </p>

                  {/* Quote block */}
                  <div className="border-l-2 border-[#ff2b42] pl-4 py-1 italic text-xs sm:text-sm text-[#d4d4d4] font-serif bg-[#141414]/50 rounded-r-lg mb-6">
                    &ldquo;{slides[currentSlide].quote}&rdquo;
                  </div>
                </div>

                {/* Bottom Interactive Trigger per slide */}
                <div className="pt-4 border-t border-[#1f1f1f] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-[#a3a3a3]">
                    <Sparkles className="w-4 h-4 text-[#ff2b42]" />
                    <span className="font-medium text-[#e5e5e5]">
                      {slides[currentSlide].highlight}
                    </span>
                  </div>

                  {slides[currentSlide].type === "candle" ? (
                    <button
                      onClick={triggerConfetti}
                      className="px-6 py-2.5 rounded-full bg-[#ff2b42] hover:bg-[#d62828] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-[0_0_20px_rgba(255,43,66,0.4)] active:scale-95 flex items-center gap-2"
                    >
                      <Flame className={`w-4 h-4 ${isBlown ? "text-yellow-300" : "animate-pulse text-yellow-400"}`} />
                      <span>{isBlown ? "Candle Blown! Celebrate Again" : "Blow Candle & Celebrate"}</span>
                    </button>
                  ) : (
                    <button
                      onClick={triggerConfetti}
                      className="px-5 py-2.5 rounded-full bg-[#181818] hover:bg-[#242424] text-[#e5e5e5] hover:text-white border border-[#2a2a2a] text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2"
                    >
                      <Cake className="w-4 h-4 text-[#ff2b42]" />
                      <span>Shower Confetti</span>
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#141414]/80 hover:bg-[#ff2b42] text-[#a3a3a3] hover:text-white border border-[#262626] transition-all backdrop-blur-sm shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#141414]/80 hover:bg-[#ff2b42] text-[#a3a3a3] hover:text-white border border-[#262626] transition-all backdrop-blur-sm shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2.5 mt-6">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx
                    ? "w-8 bg-[#ff2b42] shadow-[0_0_10px_rgba(255,43,66,0.6)]"
                    : "w-2 bg-[#262626] hover:bg-[#525252]"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
