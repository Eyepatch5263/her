"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import Gallery from "@/components/Gallery";
import FeaturedVideos from "@/components/FeaturedVideos";
import LittleThings from "@/components/LittleThings";
import LoveNotes from "@/components/LoveNotes";
import BirthdaySection from "@/components/BirthdaySection";
import Milestones from "@/components/Milestones";
import Footer from "@/components/Footer";
import CursorHearts, { HeartItem } from "@/components/CursorHearts";
import Preloader from "@/components/Preloader";

export default function Home() {
  const [hearts, setHearts] = useState<HeartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable automatic browser scroll restoration on refresh/load
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "unset";
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  const handleSendHeart = useCallback(() => {
    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 800;
    const windowHeight = typeof window !== "undefined" ? window.innerHeight : 600;

    const newHearts: HeartItem[] = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: Math.random() * (windowWidth - 80) + 40,
      y: windowHeight - 100 - Math.random() * 50,
      size: Math.floor(Math.random() * 16) + 16,
      color: ["#ff2b42", "#e63946", "#8b0000", "#d62828"][Math.floor(Math.random() * 4)],
    }));

    setHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)));
    }, 2600);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-[#ff2b42]/30 selection:text-[#ff2b42]">
      {/* Typography Preloader with Curved Exit */}
      <Preloader onComplete={() => setIsLoading(false)} />

      {/* Floating Hearts Overlay */}
      <CursorHearts hearts={hearts} />

      {/* Header Navigation */}
      <Navbar onSendHeart={handleSendHeart} />

      {/* Smooth Content Fade-In Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
        animate={{
          opacity: isLoading ? 0 : 1,
          scale: isLoading ? 0.98 : 1,
          filter: isLoading ? "blur(4px)" : "blur(0px)",
        }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
      >
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Our Story Section */}
        <OurStory />

        {/* 3. August 8th Birthday Countdown & Celebration Section */}
        <BirthdaySection />

        {/* 4. Photo Gallery Parallax Section */}
        <Gallery />

        {/* 5. Featured Motion Reels & Video Section */}
        <FeaturedVideos />

        {/* 6. Little Things I Love Section */}
        <LittleThings />

        {/* 7. Love Notes Section */}
        <LoveNotes />

        {/* 8. Milestones & Days Counter */}
        <Milestones />

        {/* 9. Closing Section & Signature */}
        <Footer onSendHeart={handleSendHeart} />
      </motion.div>
    </main>
  );
}
