"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function BirthdaySection() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isBirthday: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isBirthday: false,
  });

  const [wishText, setWishText] = useState("");
  
  useEffect(() => {
    // Target date: August 8, 2026 00:00:00
    const targetDate = new Date("2026-08-08T00:00:00");

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isBirthday: true,
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isBirthday: false,
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff2b42", "#ffffff", "#8b0000", "#e63946", "#f5f5f5"],
    });
  };


  return (
    <section id="birthday" className="py-28 px-6 bg-[#050505] relative overflow-hidden border-t border-[#1a1a1a]">
      {/* Deep Red Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff2b42] rounded-full blur-[140px] opacity-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
      

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-4xl sm:text-6xl text-[#f5f5f5] font-normal mb-4">
            Counting Down to Her Birthday
          </h2>
          <div className="w-16 h-[2px] bg-[#ff2b42] mx-auto mb-6"></div>
          <p className="text-[#a3a3a3] text-sm sm:text-base font-light leading-relaxed">
            August 8th is almost here—a day dedicated entirely to celebrating you, your kindness, and the joy you bring into every single day.
          </p>
        </div>

        {/* Real-time Countdown Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-16">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0d0d0d] p-6 rounded-2xl border border-[#222] text-center hover:border-[#ff2b42]/50 transition-colors shadow-lg"
            >
              <div className="font-serif text-4xl sm:text-5xl text-[#ff2b42] font-semibold mb-1">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#737373] font-medium">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Birthday Wish & Candle Blow Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-[#0d0d0d] rounded-3xl border border-[#222] p-8 sm:p-12 text-center max-w-3xl mx-auto relative overflow-hidden mb-16 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          <h3 className="font-serif text-3xl sm:text-4xl text-[#f5f5f5] mb-4 font-normal">
            Blow the Birthday Candle
          </h3>

          <p className="text-[#a3a3a3] text-sm sm:text-base mb-8 max-w-lg mx-auto font-light leading-relaxed">
            Click below to blow out the virtual birthday candle and celebrate August 8th with a shower of crimson celebration confetti!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <button
              onClick={triggerConfetti}
              className="px-8 py-3.5 rounded-full bg-[#ff2b42] hover:bg-[#d62828] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-[0_0_25px_rgba(255,43,66,0.4)] active:scale-95"
            >
              Blow Candle & Celebrate 
            </button>
          </div>        
        </motion.div>        
      </div>
    </section>
  );
}
