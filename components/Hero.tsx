"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import LiquidBackground from "./LiquidBackground";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-start pt-36 sm:pt-44 pb-24 px-6 overflow-hidden bg-[#050505]"
    >
      {/* Subtle Background Image (her-5.jpeg) covering full section */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/her-5.jpeg"
          alt="Her background memory"
          fill
          priority
          className="object-cover object-center opacity-[0.52] filter contrast-125 saturate-50 mix-blend-luminosity scale-105"
        />
        {/* Soft dark vignette gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/90" />
      </div>

      {/* Vercel-style Interactive Liquid Flow & Ripple Canvas Background */}
      <LiquidBackground />

      {/* Deep Red Ambient Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff2b42] rounded-full blur-[140px] opacity-15 pointer-events-none animate-red-pulse z-0" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#8b0000] rounded-full blur-[120px] opacity-20 pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-[#f5f5f5] mb-6 leading-[1.05]"
        >
          To My Dearest <br />
          <span className="font-serif italic text-[#ff2b42] font-normal">
            Everything
          </span>
        </motion.h1>

        {/* Heartfelt Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="max-w-xl text-base sm:text-lg text-[#a3a3a3] font-light leading-relaxed mb-12"
        >
          A quiet space dedicated to your smile, the moments we share, and all the reasons you make the world feel just a little better for me.
        </motion.p>

        {/* Hero Polaroid Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: -1 }}
          transition={{ duration: 1, delay: 0.5 }}
          whileHover={{ scale: 1.02, rotate: 0 }}
          className="relative mb-14 group cursor-pointer"
        >
          <div className="absolute inset-0 bg-[#8b0000] rounded-2xl transform rotate-3 scale-105 transition-transform duration-500 group-hover:rotate-4 opacity-40 blur-sm"></div>

          <div className="relative bg-[#0d0d0d] p-4 sm:p-5 rounded-2xl border border-[#222] shadow-[0_10px_40px_rgba(0,0,0,0.8)] group-hover:border-[#ff2b42]/50 transition-all duration-500">
            <div className="relative w-[280px] sm:w-[340px] md:w-[380px] h-[360px] sm:h-[430px] md:h-[460px] rounded-xl overflow-hidden bg-[#121212]">
              <Image
                src="/her-10.jpeg"
                alt="Her portrait"
                fill
                priority
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent"></div>
            </div>

            <div className="pt-4 pb-2 text-center">
              <span className="font-handwriting text-2xl sm:text-3xl text-[#ff2b42]">
                You, in all your grace
              </span>
            </div>
          </div>
        </motion.div>

        {/* Minimal Scroll Indicator */}
        <motion.a
          href="#story"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="inline-flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#737373] hover:text-[#ff2b42] transition-colors"
        >
          <span>Scroll down to turn page</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-[#ff2b42]"
          />
        </motion.a>
      </div>
    </section>
  );
}