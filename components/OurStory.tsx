"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

interface StoryMoment {
  id: string;
  date: string;
  location: string;
  title: string;
  excerpt: string;
  fullStory: string;
  image: string;
  tag: string;
}

const moments: StoryMoment[] = [
  {
    id: "chapter-1",
    date: "The Beginning",
    location: "That First Dress",
    title: "When Our Paths Crossed",
    excerpt: "A simple conversation about what to wear and listen changed my whole life. Who knew Myntra & Spotify will be the start of our story.",
    fullStory: "From fighting and blocking each other on Chaterpillar to suggesting songs from my playlist to you at 3 in the morning to make you sleep. Even though you knew who you were talking to but still holding the expectation from me to tell you who am I is where it started for us.",
    image: "/her-12.jpeg",
    tag: "Chapter I",
  },
  {
    id: "chapter-2",
    date: "The Conference Days",
    location: "Hotel & Movie Hints",
    title: "Hours That Felt Like Centuries",
    excerpt: "When you showed me your hotel room and dresses for the conference. Phones were banned in sessions—the stupidest rule ever when all I wanted was to talk to my girl.",
    fullStory: "She went to a work conference, showing me her hotel and every dress she wore. Little did I know, I was falling for her—slowly, but steadily. The days felt like centuries when we couldn't talk, especially with phones banned during conference sessions (the stupidest rule ever; just give my girl her phone back!). From me returning home from a friend's place at 5 in the morning suggesting she watch 'Mai Wapas Aunga' with Anjali, to me laughing and asking who the fuck even watches 'Dhamaal 4'... what made me happiest was that she actually followed my suggestion and booked tickets for 'Mai Wapas Aunga'. Well, I really wished I could have watched it right there beside her.",
    image: "/her-1.jpeg",
    tag: "Chapter II",
  },
  {
    id: "chapter-3",
    date: "Her Classic Coffee",
    location: "Third Wave Cafe",
    title: "Our First Coffee",
    excerpt: "I laughed so hard when the waiter re-suggested that she should order another coffee right after she ordered classic... like, who even does that?",
    fullStory: "After you came to pick me up at the metro—which really made me happy (and sweaty from the fuckin humid weather!). After dropping all the luggage at your PG where boys (me) weren't allowed to enter—well, I wouldn't have done anything (except not now lol). We went to this cafe where she usually used to sit and work while sipping on her classic coffee. When she ordered a Mexican burger and coffee, little did I know about how low her appetite really is—she literally said 'I'm done' after eating half her burger, where I on the other side finished everything! From that young woman talking so loud on the microphone that the whole cafe could hear what she was actually doing, to you saying the woman beside me was dozing off (which she wasn't, of course!)... it was our perfect, unforgettable first date.",
    image: "/her-22.jpeg",
    tag: "Chapter III",
  },
  {
    id: "chapter-4",
    date: "The Odyssey",
    location: "Movie Hall & Mall",
    title: "Our First Movie Together",
    excerpt: "From telling me how Anjali made her buy makeup at the mall (which is still sitting untouched at her home!) to getting stopped at the airport carrying more makeup than allowed... lol!",
    fullStory: "After we reached the mall to watch my favorite Nolan's new Odyssey movie, we had time to kill so we roamed around. She was busy telling me how many outlets she handles—I really wanted to ask if we could just walk in and demand free food, but I killed that thought lol! When we entered a toy store, I really wanted to gift her one toy, which she denied telling me 'I'm not allowed to spend' (stupid her!). Once inside the movie hall, she suddenly realized she forgot to apply for leave on her job portal—she really forgets things I guess! We enjoyed the movie with popcorn and shared Pepsi. I could have kissed her if she asked, but hey, I'm a gentleman so I chose the indirect kiss lol, feeding her popcorn from my hand while she lazily opened her mouth just a tiny bit. The ending was definitely sad—I cried a little and stupid her was staring right at me... I thought I could hide it, but she found out somehow.",
    image: "/her-21.jpeg",
    tag: "Chapter IV",
  },
  {
    id: "chapter-5",
    date: "Time to Leave",
    location: "CP Escape Room & Bus Station",
    title: "The One I Want Forever",
    excerpt: "She really takes care of me like my mother. They say every man eventually looks for his mother in the woman he wants to spend his life with—maybe it was the sign that she's the one I'm gonna spend my whole life with.",
    fullStory: "After we reached the bus station from the escape room in CP (which was so fuckin hard to find—struggling for 15 minutes before finding it!). It was so much fun: the way she grabbed my hand when scared, saying she couldn't clear the room without me when separated! She looked so damn cute getting frustrated at stupid clues. Then it was time for me to leave, so we took a cab to her PG for my luggage, and she surprised me with tons of gifts—chocolates, my favorite cake, a diary, and a keychain... she definitely loves me ig! At the bus station, knowing I hadn't eaten, she brought me food—caring for me like a mother. I couldn't believe a girl like her exists, and stupid me found her. Before boarding, I hugged her—I didn't want that hug to end. From the bus window I clicked a few photos, already missing her... only for stupid her to text me asking if I could stay one more day! She could have said that before—I would have cancelled the bus in a heartbeat. But stupid her sometimes realizes things later on.",
    image: "/her-23.jpeg",
    tag: "Chapter V",
  },
];

export default function OurStory() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Track scroll position across the full height of the timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 90%"],
  });

  const acceleratedProgress = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  const smoothProgress = useSpring(acceleratedProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section id="story" className="py-24 px-6 bg-[#050505] relative border-t border-[#1a1a1a] overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-[#ff2b42] font-semibold block mb-3"
          >
            How We Got Here
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-5xl font-normal text-[#f5f5f5] mb-4"
          >
            Our Story & Milestones
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
            className="text-[#a3a3a3] text-xs sm:text-sm font-light leading-relaxed"
          >
            A curved crimson thread of memories. Click &ldquo;Read memory&rdquo; on any card to flip it over.
          </motion.p>
        </div>

        {/* Timeline Stack Container */}
        <div ref={containerRef} className="relative">
          {/* SVG Thread path curving elegantly between the story cards */}
          <div className="hidden md:block absolute left-0 right-0 top-0 bottom-0 pointer-events-none z-0">
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 1900"
              preserveAspectRatio="none"
            >
              <path
                d="M 500 0 C 350 240, 350 240, 500 475 C 650 710, 650 710, 500 950 C 350 1185, 350 1185, 500 1425 C 650 1660, 650 1660, 500 1900"
                fill="none"
                stroke="rgba(255, 43, 66, 0.2)"
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
              />

              <motion.path
                d="M 500 0 C 350 240, 350 240, 500 475 C 650 710, 650 710, 500 950 C 350 1185, 350 1185, 500 1425 C 650 1660, 650 1660, 500 1900"
                fill="none"
                stroke="#ff2b42"
                strokeWidth="5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                style={{
                  pathLength: smoothProgress,
                  filter: "drop-shadow(0px 0px 12px #ff2b42)",
                }}
              />
            </svg>
          </div>

          <div className="space-y-14 sm:space-y-20 relative z-10">
            {moments.map((moment, idx) => {
              const isEven = idx % 2 === 0;
              const isFlipped = !!flippedCards[moment.id];

              return (
                <motion.div
                  key={moment.id}
                  initial={{ opacity: 0, y: 50, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-40px" }}
                  className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* 3D Flip Card Container */}
                  <div className="w-full md:w-1/2 [perspective:1000px]">
                    <motion.div
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      className="relative w-full [transform-style:preserve-3d] h-[260px] sm:h-[290px]"
                    >
                      {/* FRONT OF CARD */}
                      <div className="absolute inset-0 w-full h-full bg-[#0d0d0d] p-6 sm:p-7 rounded-2xl border border-[#222] shadow-xl hover:border-[#ff2b42]/40 transition-colors flex flex-col justify-between [backface-visibility:hidden]">
                        <div className="overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#ff2b42]/40 scrollbar-track-transparent">
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#ff2b42] bg-[#ff2b42]/10 px-2.5 py-0.5 rounded-full border border-[#ff2b42]/20">
                              {moment.tag}
                            </span>
                            <span className="text-[11px] text-[#737373] font-mono">{moment.date}</span>
                          </div>

                          <h3 className="font-serif text-xl sm:text-2xl text-[#f5f5f5] mb-1 font-normal">
                            {moment.title}
                          </h3>

                          <p className="text-[11px] text-[#a3a3a3] italic mb-3 font-light">
                            {moment.location}
                          </p>

                          <p className="text-[#a3a3a3] text-xs sm:text-sm leading-relaxed font-light">
                            {moment.excerpt}
                          </p>
                        </div>

                        <div className="pt-3 shrink-0">
                          <button
                            onClick={() => toggleFlip(moment.id)}
                            className="inline-flex items-center gap-2 text-xs font-semibold text-[#ff2b42] hover:text-white transition-colors group/btn"
                          >
                            <span>Read memory</span>
                            <span className="transform transition-transform group-hover/btn:translate-x-1">→</span>
                          </button>
                        </div>
                      </div>

                      {/* BACK OF CARD (Flipped Journal View with Auto-Scroll) */}
                      <div className="absolute inset-0 w-full h-full bg-[#120809] p-6 sm:p-7 rounded-2xl border border-[#ff2b42]/50 shadow-[0_0_25px_rgba(255,43,66,0.15)] flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <div className="overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-[#ff2b42]/50 scrollbar-track-transparent">
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#ff2b42]">
                              Unfolded Memory
                            </span>
                            <span className="text-[11px] text-[#a3a3a3] font-mono">{moment.tag}</span>
                          </div>

                          <h3 className="font-serif text-lg sm:text-xl text-[#f5f5f5] mb-2 font-normal">
                            {moment.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-[#d4d4d4] font-light leading-relaxed italic border-l-2 border-[#ff2b42] pl-3 my-2">
                            &ldquo;{moment.fullStory}&rdquo;
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#ff2b42]/20 flex justify-between items-center shrink-0">
                          <span className="font-handwriting text-base text-[#ff2b42]">
                            Always & Forever
                          </span>

                          <button
                            onClick={() => toggleFlip(moment.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f5f5f5] hover:text-[#ff2b42] transition-colors"
                          >
                            <span>← Back</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Story Photo Frame */}
                  <div className="w-full md:w-1/2">
                    <div
                      onClick={() => toggleFlip(moment.id)}
                      className="group cursor-pointer relative bg-[#0d0d0d] p-2.5 rounded-2xl border border-[#222] shadow-xl transition-all duration-500 hover:border-[#ff2b42]/50 transform hover:-translate-y-1"
                    >
                      <div className="relative h-[240px] sm:h-[270px] w-full rounded-xl overflow-hidden bg-[#121212]">
                        <Image
                          src={moment.image}
                          alt={moment.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="pt-2 text-center">
                        <span className="font-handwriting text-lg text-[#f5f5f5]">
                          {moment.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
