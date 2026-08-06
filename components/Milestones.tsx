"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Milestones() {
  const [daysTogether, setDaysTogether] = useState<number>(730);

  useEffect(() => {
    const startDate = new Date("2026-07-03");
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysTogether(diffDays);
  }, []);

  const stats = [
    {
      number: `${daysTogether}+`,
      label: "Days Together",
      subtext: "Every day feels like a blessing",
    },
    {
      number: "1000+",
      label: "Countless Loves You's",
      subtext: "Said by You",
    },
    {
      number: "∞",
      label: "Future Adventures",
      subtext: "Waiting to be written together",
    },
    {
      number: "1",
      label: "Upcoming Birthday",
      subtext: "August 8th — Her special day!",
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#050505] border-y border-[#1a1a1a]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0d0d0d] p-8 rounded-2xl border border-[#222] text-center shadow-lg hover:border-[#ff2b42]/40 transition-colors"
            >
              <div className="font-serif text-4xl sm:text-5xl text-[#ff2b42] font-semibold mb-2">
                {stat.number}
              </div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#f5f5f5] font-semibold mb-2">
                {stat.label}
              </div>
              <p className="text-xs text-[#737373] font-light">
                {stat.subtext}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
