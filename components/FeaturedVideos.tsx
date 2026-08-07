"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface VideoItem {
  id: string;
  src: string;
  title: string;
  subtitle: string;
}

const videos: VideoItem[] = [
  {
    id: "v1",
    src: "/her-video-1.mp4",
    title: "Her Unfiltered Smile",
    subtitle: "The Day you graduated and waited 3 years for us to meet!",
  },
  {
    id: "v2",
    src: "/her-video-2.mp4",
    title: "Pure Magic in Motion",
    subtitle: "A moment in time that I could watch on loop forever!",
  },
  {
    id: "v3",
    src: "/her-video-3.mp4",
    title: "A Million Memories",
    subtitle: "The day you left Maharastra and all your loved ones!",
  },
];

export default function FeaturedVideos() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  return (
    <section id="videos" className="py-28 px-6 bg-[#050505] relative border-t border-[#1a1a1a] overflow-hidden">
      {/* Background ambient red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#ff2b42] rounded-full blur-[180px] opacity-15 pointer-events-none z-0" />

      {/* Vivid Static Background SVG Artwork */}
      <div className="absolute inset-0 pointer-events-none opacity-65 z-0 overflow-hidden flex items-center justify-center">
        <svg
          className="w-full h-full min-w-[1200px] min-h-[600px]"
          viewBox="0 0 1400 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="crimsonLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff2b42" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#ff2b42" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8b0000" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Concentric Ambient Orbits */}
          <circle cx="700" cy="400" r="350" stroke="url(#crimsonLineGrad)" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.8" />
          <circle cx="700" cy="400" r="500" stroke="url(#crimsonLineGrad)" strokeWidth="2" opacity="0.75" />
          <circle cx="700" cy="400" r="650" stroke="url(#crimsonLineGrad)" strokeWidth="1.2" strokeDasharray="12 12" opacity="0.6" />

          {/* Sweeping Elegant Waves */}
          <path
            d="M -100 250 C 300 100, 500 650, 900 200 C 1200 -50, 1400 450, 1600 300"
            stroke="url(#crimsonLineGrad)"
            strokeWidth="2.5"
            fill="none"
            filter="url(#glow)"
          />
          <path
            d="M -100 550 C 200 750, 600 200, 1000 600 C 1300 850, 1500 350, 1600 500"
            stroke="url(#crimsonLineGrad)"
            strokeWidth="2"
            fill="none"
            opacity="0.85"
          />

          {/* Constellation Lines & Connecting Nodes */}
          <path d="M 350 220 L 520 310 L 700 240 L 900 200 L 1050 340 L 1200 280" stroke="#ff2b42" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.7" />
          <path d="M 200 620 L 380 540 L 620 640 L 850 510 L 1050 580 L 1250 490" stroke="#ff2b42" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.7" />

          {/* Glowing Constellation Nodes */}
          <g filter="url(#glow)">
            <circle cx="350" cy="220" r="6" fill="#ff2b42" />
            <circle cx="520" cy="310" r="4.5" fill="#ffffff" />
            <circle cx="700" cy="240" r="5" fill="#ff2b42" />
            <circle cx="900" cy="200" r="7" fill="#ff2b42" />
            <circle cx="1050" cy="340" r="5" fill="#ffffff" />
            <circle cx="1200" cy="280" r="6" fill="#ff2b42" />

            <circle cx="200" cy="620" r="6" fill="#ff2b42" />
            <circle cx="380" cy="540" r="5" fill="#ffffff" />
            <circle cx="620" cy="640" r="5.5" fill="#ff2b42" />
            <circle cx="850" cy="510" r="6" fill="#ff2b42" />
            <circle cx="1050" cy="580" r="7" fill="#ff2b42" />
            <circle cx="1250" cy="490" r="5" fill="#ffffff" />
          </g>

          {/* Geometric Crosshairs */}
          <line x1="700" y1="50" x2="700" y2="750" stroke="#ff2b42" strokeWidth="1" opacity="0.3" strokeDasharray="6 6" />
          <line x1="100" y1="400" x2="1300" y2="400" stroke="#ff2b42" strokeWidth="1" opacity="0.3" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-[#ff2b42] font-semibold block mb-3"
          >
            Living Motion Reels
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-serif text-4xl sm:text-6xl font-normal text-[#f5f5f5] mb-4"
          >
            Moments in Motion
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-16 h-[2px] bg-[#ff2b42] mx-auto mb-5"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-[#a3a3a3] text-sm sm:text-base font-light leading-relaxed"
          >
            Still photos capture a second, but seeing your smile in motion brings every memory back to life.
          </motion.p>
        </div>

        {/* 3 Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {videos.map((vid, idx) => {
            return (
              <motion.div
                key={vid.id}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl bg-[#0d0d0d] border border-[#222] overflow-hidden shadow-2xl hover:border-[#ff2b42]/60 hover:shadow-[0_0_35px_rgba(255,43,66,0.2)] transition-all duration-500 flex flex-col justify-between"
              >
                {/* Video Player */}
                <div className="relative w-full h-[380px] sm:h-[440px] bg-[#121212] overflow-hidden">
                  <video
                    ref={(el) => {
                      videoRefs.current[vid.id] = el;
                    }}
                    src={vid.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-[#050505]/30 pointer-events-none" />
                </div>

                {/* Title & Caption Block */}
                <div className="p-6 border-t border-[#1a1a1a] bg-[#0d0d0d] relative z-10 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#f5f5f5] font-normal mb-2 group-hover:text-[#ff2b42] transition-colors">
                      {vid.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#a3a3a3] font-light leading-relaxed">
                      {vid.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#1a1a1a] flex items-center justify-between">
                    <span className="font-handwriting text-base text-[#ff2b42]">
                      Forever on Loop
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
