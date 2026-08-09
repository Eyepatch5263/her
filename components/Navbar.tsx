"use client";

import { useState, useEffect, useRef } from "react";

interface NavbarProps {
  onSendHeart: () => void;
}

// Global audio singleton for immediate preloading across mounts
let globalAudio: HTMLAudioElement | null = null;

export default function Navbar({ onSendHeart }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Singleton pattern to start preloading /her.mpeg instantly
    if (!globalAudio) {
      globalAudio = new Audio("/her.mpeg");
      globalAudio.preload = "auto";
      globalAudio.loop = true;
      globalAudio.volume = 0.55;
      globalAudio.load();
    }
    audioRef.current = globalAudio;

    // Check playing state
    if (!globalAudio.paused) {
      setIsPlaying(true);
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    globalAudio.addEventListener("play", handlePlay);
    globalAudio.addEventListener("pause", handlePause);

    const tryPlayAudio = () => {
      if (globalAudio && globalAudio.paused) {
        globalAudio
          .play()
          .then(() => {
            setIsPlaying(true);
            removeInteractionListeners();
          })
          .catch(() => {
            // Autoplay restricted until user interaction
          });
      }
    };

    const removeInteractionListeners = () => {
      window.removeEventListener("click", tryPlayAudio);
      window.removeEventListener("touchstart", tryPlayAudio);
      window.removeEventListener("pointerdown", tryPlayAudio);
      window.removeEventListener("scroll", tryPlayAudio);
      window.removeEventListener("keydown", tryPlayAudio);
      window.removeEventListener("mousemove", tryPlayAudio);
    };

    // Immediate play attempt
    tryPlayAudio();

    // Listen for micro user interaction (click, tap, scroll, hover)
    window.addEventListener("click", tryPlayAudio, { once: false });
    window.addEventListener("touchstart", tryPlayAudio, { passive: true });
    window.addEventListener("pointerdown", tryPlayAudio, { passive: true });
    window.addEventListener("scroll", tryPlayAudio, { passive: true });
    window.addEventListener("keydown", tryPlayAudio);
    window.addEventListener("mousemove", tryPlayAudio, { passive: true });

    return () => {
      removeInteractionListeners();
      if (globalAudio) {
        globalAudio.removeEventListener("play", handlePlay);
        globalAudio.removeEventListener("pause", handlePause);
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!globalAudio) return;

    if (isPlaying) {
      globalAudio.pause();
      setIsPlaying(false);
    } else {
      globalAudio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Audio playback error:", err);
        });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050505]/90 backdrop-blur-md border-b border-[#1a1a1a] py-4 shadow-xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Website Logo & Brand */}
        <a
          href="#hero"
          className="flex items-center gap-3 font-serif text-xl tracking-wide text-[#f5f5f5] hover:opacity-90 transition-opacity group"
        >
          <img
            src="/logo.jpeg"
            alt="Website Logo"
            className="w-9 h-9 rounded-full object-cover border-2 border-[#ff2b42]/60 shadow-[0_0_12px_rgba(255,43,66,0.5)] group-hover:scale-105 transition-transform"
          />
          <div className="flex items-center gap-1.5">
            <span className="font-handwriting text-2xl text-[#ff2b42]">for</span>
            <span className="font-serif italic font-semibold">Dee</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff2b42] animate-pulse"></span>
          </div>
        </a>

        {/* Clean nav */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#a3a3a3]">
          <a href="#story" className="hover:text-[#ff2b42] transition-colors">
            Our Story
          </a>
          <a href="#meetup" className="hover:text-[#ff2b42] text-[#ff2b42] font-semibold transition-colors">
            Aug 21 Meetup
          </a>
          <a href="#gallery" className="hover:text-[#ff2b42] transition-colors">
            Gallery
          </a>
          <a href="#videos" className="hover:text-[#ff2b42] transition-colors">
            Videos
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
          {/* Audio Music Toggle Button with Equalizer animation */}
          <button
            onClick={toggleMusic}
            aria-label={isPlaying ? "Mute Music" : "Play Music"}
            title={isPlaying ? "Mute Music" : "Play Music"}
            className={`p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center gap-1.5 ${
              isPlaying
                ? "bg-[#ff2b42]/15 border-[#ff2b42] text-[#ff2b42] shadow-[0_0_12px_rgba(255,43,66,0.3)]"
                : "bg-[#121212] border-[#262626] text-[#737373] hover:text-[#f5f5f5] hover:border-[#404040]"
            }`}
          >
            {isPlaying ? (
              // Animated Equalizer Bars when music is playing
              <div className="flex items-end gap-[2px] h-3.5 w-3.5 justify-center">
                <span className="w-[2px] bg-[#ff2b42] rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
                <span className="w-[2px] bg-[#ff2b42] rounded-full animate-[bounce_1s_infinite_300ms] h-2/3" />
                <span className="w-[2px] bg-[#ff2b42] rounded-full animate-[bounce_1s_infinite_200ms] h-4/5" />
              </div>
            ) : (
              // Muted Music Note Icon when paused/muted
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 opacity-70"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
                <line x1="2" y1="2" x2="22" y2="22" stroke="#ff2b42" strokeWidth="2.5" />
              </svg>
            )}
          </button>

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
