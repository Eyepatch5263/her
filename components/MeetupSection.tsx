"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Calendar, Clock, MapPin, Heart, Sparkles, Compass, Moon, Smile } from "lucide-react";
import { useExcitement } from "@/context/ExcitementContext";

export default function MeetupSection() {
  const { excitementCount, incrementExcitement } = useExcitement();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isMeetupTime: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isMeetupTime: false,
  });

  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);

  useEffect(() => {
    // Target date: August 20, 2026 00:00:00
    const targetDate = new Date("2026-08-21T00:00:00");

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isMeetupTime: true,
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
          isMeetupTime: false,
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerMeetupHearts = () => {
    // Increment global context count synced real-time across all visitors
    incrementExcitement();

    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#ff2b42", "#e63946", "#ffb703", "#ffffff", "#d62828"],
      shapes: ["circle"],
      scalar: 1.2,
    });
  };

  const daysPlan = [
    {
      day: "Day 1",
      date: "August 21",
      title: "The Warmest Reunion",
      tagline: "The Moment We Meet Again",
      description: "The long countdown comes to an end. Stepping into the same space, running into each other's arms, and holding tight like time stood still.",
      icon: Heart,
      color: "from-[#ff2b42]/20 to-[#e63946]/5",
      highlights: ["Long warm embrace", "Morning Walks", "Late-night travel time"],
    },
    {
      day: "Day 2",
      date: "August 21",
      title: "Airbnb",
      tagline: "Chilling & Vibing",
      description: "Staying in the Airbnb, playing games, watching movies, and just enjoying each other's company.",
      icon: Compass,
      color: "from-[#e63946]/20 to-[#d62828]/5",
      highlights: ["Playing games", "Watching movies", "Long talks & cuddles"],
    },
    {
      day: "Day 3",
      date: "August 22",
      title: "Airbnb",
      tagline: "Chilling & Exploring",
      description: "Staying in the Airbnb, doing whatever we feel like doing, and just exploring each other.",
      icon: Moon,
      color: "from-[#ff2b42]/20 to-[#8b0000]/10",
      highlights: ["Late night Conversation", "Exploring each other", "Creating inner jokes"],
    },
    {
      day: "Day 4",
      date: "August 23–24",
      title: "Exploring Delhi",
      tagline: "Savoring Every Last Second",
      description: "Making the final hours count. Swapping keepsake gifts, promising our next meetup, and holding on to memories that will keep our hearts full till we meet again.",
      icon: Smile,
      color: "from-[#d62828]/20 to-[#ff2b42]/5",
      highlights: ["Going to movies", "Visiting Book Cafe", "Exploring the city"],
    },
  ];

  return (
    <section id="meetup" className="py-28 px-6 bg-[#050505] relative overflow-hidden border-t border-[#1a1a1a]">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#ff2b42] rounded-full blur-[160px] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#8b0000] rounded-full blur-[140px] opacity-15 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff2b42]/10 border border-[#ff2b42]/30 text-[#ff2b42] text-xs font-semibold uppercase tracking-[0.2em] mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next Big Milestone • 4 Magical Days</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-serif text-4xl sm:text-6xl text-[#f5f5f5] font-normal mb-4"
          >
            Our Upcoming Meetup
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-20 h-[2px] bg-[#ff2b42] mx-auto mb-6"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-[#a3a3a3] text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto"
          >
            Mark your calendar! On <span className="text-[#ff2b42] font-medium">August 20th, 2026</span>, we meet again for <span className="text-[#f5f5f5] font-medium">4 unforgettable days</span> (August 20–24). Every second bringing us closer!
          </motion.p>
        </div>

        {/* Real-time Countdown Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-[#0d0d0d] p-8 sm:p-10 rounded-3xl border border-[#222] shadow-[0_0_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-[#1f1f1f] pb-6">
              <div className="flex items-center gap-3 text-left">
                <div className="p-3 rounded-2xl bg-[#ff2b42]/10 border border-[#ff2b42]/20 text-[#ff2b42]">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#f5f5f5] font-medium">
                    August 21 – 24, 2026
                  </h3>
                  <p className="text-xs text-[#737373] tracking-wide">
                    4 Days Reunion • Counting down to Day 1
                  </p>
                </div>
              </div>
            </div>

            {/* Grid Timer Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#121212] p-6 rounded-2xl border border-[#222] text-center hover:border-[#ff2b42]/50 transition-all shadow-inner group"
                >
                  <div className="font-serif text-4xl sm:text-6xl text-[#ff2b42] font-semibold mb-1 group-hover:drop-shadow-[0_0_12px_rgba(255,43,66,0.5)] transition-all">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-[#8e8e8e] font-semibold">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Countdown Action & Global Excitement Counter */}
            <div className="mt-8 pt-6 border-t border-[#1f1f1f] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#a3a3a3] font-light text-center sm:text-left">
                Cannot wait? Tap the button to send live excitement sparks for Aug 21!
              </p>

              <button
                onClick={triggerMeetupHearts}
                className="px-6 py-3 rounded-full bg-[#ff2b42] hover:bg-[#d62828] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-[0_0_20px_rgba(255,43,66,0.35)] active:scale-95 flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-current animate-bounce" />
                <span>Can&apos;t Wait! {excitementCount > 0 && `(${excitementCount})`}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* 4-Day Reunion Itinerary / Highlights */}
        <div>
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f5f5] mb-2 font-normal">
              What Awaits Us Across the 4 Days
            </h3>
            <p className="text-xs sm:text-sm text-[#8a8a8a] font-light">
              August 20th through August 24th — A mini roadmap of our together time
            </p>
          </div>

          {/* Interactive Day Tabs / Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {daysPlan.map((plan, idx) => {
              const IconComp = plan.icon;
              const isActive = activeDayIndex === idx;
              return (
                <motion.div
                  key={idx}
                  onClick={() => setActiveDayIndex(idx)}
                  whileHover={{ y: -4 }}
                  className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                    isActive
                      ? "bg-[#141414] border-[#ff2b42] shadow-[0_0_25px_rgba(255,43,66,0.2)]"
                      : "bg-[#0d0d0d] border-[#222] hover:border-[#404040]"
                  }`}
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${plan.color} rounded-bl-full pointer-events-none`} />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#ff2b42] font-semibold">
                        {plan.day} • {plan.date}
                      </span>
                      <IconComp className={`w-5 h-5 ${isActive ? "text-[#ff2b42]" : "text-[#737373]"}`} />
                    </div>
                    <h4 className="font-serif text-lg text-[#f5f5f5] font-normal mb-1">
                      {plan.title}
                    </h4>
                    <p className="text-xs text-[#a3a3a3] font-light mb-4">
                      {plan.tagline}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1f1f1f] text-[11px] text-[#737373] flex items-center justify-between font-mono">
                    <span>Aug {20 + idx}</span>
                    <span className={isActive ? "text-[#ff2b42] font-semibold" : ""}>
                      {isActive ? "Selected" : "View"} →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Expanded Selected Day Detail Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDayIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0d0d0d] rounded-3xl border border-[#222] p-6 sm:p-8 relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#1f1f1f]">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-[#ff2b42] font-semibold mb-1">
                    {daysPlan[activeDayIndex].day} Spotlight ({daysPlan[activeDayIndex].date})
                  </div>
                  <h4 className="font-serif text-2xl text-[#f5f5f5]">
                    {daysPlan[activeDayIndex].title}
                  </h4>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181818] border border-[#2a2a2a] text-xs text-[#a3a3a3]">
                  <MapPin className="w-3.5 h-3.5 text-[#ff2b42]" />
                  <span>Together Side by Side</span>
                </div>
              </div>

              <p className="text-[#b3b3b3] text-sm sm:text-base font-light leading-relaxed mb-6">
                {daysPlan[activeDayIndex].description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {daysPlan[activeDayIndex].highlights.map((item, hIdx) => (
                  <div
                    key={hIdx}
                    className="bg-[#141414] px-4 py-3 rounded-xl border border-[#222] text-xs text-[#e5e5e5] flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b42]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
