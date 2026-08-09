"use client";

import { motion } from "framer-motion";

interface FooterProps {
  onSendHeart: () => void;
}

export default function Footer({ onSendHeart }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-28 px-6 bg-[#050505] relative overflow-hidden text-center border-t border-[#1a1a1a]">
      {/* Deep Red Ambient Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ff2b42] rounded-full blur-[140px] opacity-15 pointer-events-none"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-serif text-4xl sm:text-6xl font-normal text-[#f5f5f5] mb-6"
        >
          Thank You for Being You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-[#a3a3a3] text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto font-light"
        >
          This page is just a small gesture to remind you how deeply loved and appreciated you are today, on August 8th, and every single day after.
        </motion.p>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-handwriting text-4xl sm:text-5xl text-[#ff2b42] block mb-2">
            Forever & Always, Yours
          </span>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#737373]">
            With endless love
          </span>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={onSendHeart}
            className="px-8 py-3.5 rounded-full bg-[#ff2b42] hover:bg-[#d62828] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-[0_0_25px_rgba(255,43,66,0.4)] active:scale-95"
          >
            Send Floating Heart
          </button>

          <button
            onClick={scrollToTop}
            className="px-6 py-3.5 rounded-full bg-[#121212] hover:bg-[#1a1a1a] text-[#a3a3a3] hover:text-white text-xs uppercase tracking-widest font-semibold border border-[#222] transition-colors"
          >
            Back to Top
          </button>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-[#1a1a1a] text-xs text-[#525252] font-mono">
          My Mommy & Baby • Dedicated to Her
        </div>
      </div>
    </footer>
  );
}
