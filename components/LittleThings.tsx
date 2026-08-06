"use client";

import { motion } from "framer-motion";

interface LittleThing {
  number: string;
  title: string;
  description: string;
  handwritingNote: string;
}

const littleThings: LittleThing[] = [
  {
    number: "01",
    title: "Your Unfiltered Laugh",
    description: "The genuine, uninhibited laugh that starts in your eyes and instantly brightens up the darkest day.",
    handwritingNote: "My favorite sound in the world",
  },
  {
    number: "02",
    title: "My Baby, My baccha, My Dee",
    description: "You're the most special person in my life, and I can't imagine a world without you. You're my everything, and I'll always love you no matter what.",
    handwritingNote: "So quiet and cozy",
  },
  {
    number: "03",
    title: "Your Innate Kindness",
    description: "The gentle, unspoken way you care for me and people around you and notice small details others overlook.",
    handwritingNote: "A heart made of gold",
  },
  {
    number: "04",
    title: "The Eyes-Crinkle Smile",
    description: "That tiny crinkle near your eyes whenever you hear a silly joke or feel happy deep inside.",
    handwritingNote: "Irresistible every single time",
  },
  {
    number: "05",
    title: "I love You Infinite Loop",
    description: "The way you don't get tired constantly saying I love you, no matter what. Like, for real, who does that? Only you, I guess.",
    handwritingNote: "Always on my mind",
  },
  {
    number: "06",
    title: "Deep Late Night Conversations",
    description: "Your random 1 AM thoughts about life, dreams, universe, and everything in between.",
    handwritingNote: "I could listen for hours",
  },
];

export default function LittleThings() {
  return (
    <section id="little-things" className="py-28 px-6 bg-[#050505] relative border-t border-[#1a1a1a]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-[#ff2b42] font-semibold block mb-3"
          >
            Reasons Why You're Special
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-serif text-4xl sm:text-6xl font-normal text-[#f5f5f5] mb-4"
          >
            Little Things I Love About You
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
            It's not just the big milestones, but the quiet, endearing details that make you uniquely you.
          </motion.p>
        </div>

        {/* Card Grid without clutter icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {littleThings.map((thing, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="group bg-[#0d0d0d] p-8 rounded-2xl border border-[#222] shadow-xl hover:border-[#ff2b42]/50 hover:shadow-[0_0_30px_rgba(255,43,66,0.15)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono tracking-widest text-[#ff2b42] mb-4">
                  / {thing.number}
                </div>

                <h3 className="font-serif text-2xl font-normal text-[#f5f5f5] mb-3">
                  {thing.title}
                </h3>

                <p className="text-[#a3a3a3] text-sm leading-relaxed mb-6 font-light">
                  {thing.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1a1a1a]">
                <span className="font-handwriting text-xl text-[#ff2b42] block">
                  ~ {thing.handwritingNote}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
