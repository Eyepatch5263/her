"use client";

import { useState, useEffect, useRef } from "react";

interface NavbarProps {
  onSendHeart: () => void;
}

export default function Navbar({ onSendHeart }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Initialize audio element with /her.mpeg and seamless infinite looping
    const audio = new Audio("/her.mpeg");
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    const startAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            // Remove listeners once audio starts playing successfully
            window.removeEventListener("click", startAudio);
            window.removeEventListener("scroll", startAudio);
            window.removeEventListener("keydown", startAudio);
            window.removeEventListener("touchstart", startAudio);
          })
          .catch(() => {
            // Browser autoplay restrictions handled by user interaction listeners below
          });
      }
    };

    // Attempt automatic start
    startAudio();

    // Listen for any user interaction to start background audio smoothly
    window.addEventListener("click", startAudio);
    window.addEventListener("scroll", startAudio, { passive: true });
    window.addEventListener("keydown", startAudio);
    window.addEventListener("touchstart", startAudio, { passive: true });

    return () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("scroll", startAudio);
      window.removeEventListener("keydown", startAudio);
      window.removeEventListener("touchstart", startAudio);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050505]/90 backdrop-blur-md border-b border-[#1a1a1a] py-4 shadow-xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          className="flex items-center gap-2 font-serif text-xl tracking-wide text-[#f5f5f5] hover:opacity-80 transition-opacity"
        >
          <span className="font-handwriting text-2xl text-[#ff2b42]">for</span>
          <span className="font-serif italic font-semibold">her</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff2b42] animate-pulse"></span>
        </a>

        {/* Clean nav without clutter icons */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#a3a3a3]">
          <a href="#story" className="hover:text-[#ff2b42] transition-colors">
            Our Story
          </a>
          <a href="#birthday" className="hover:text-[#ff2b42] text-[#ff2b42] transition-colors">
            Aug 8 Birthday
          </a>
          <a href="#gallery" className="hover:text-[#ff2b42] transition-colors">
            Gallery
          </a>
          <a href="#little-things" className="hover:text-[#ff2b42] transition-colors">
            Little Things
          </a>
          <a href="#letters" className="hover:text-[#ff2b42] transition-colors">
            Letters
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onSendHeart}
            className="px-4 py-2 rounded-full bg-[#ff2b42] hover:bg-[#d62828] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-[0_0_15px_rgba(255,43,66,0.3)] active:scale-95"
          >
            Send Love
          </button>
        </div>
      </div>
    </header>
  );
}
