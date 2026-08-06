"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import LightboxModal, { GalleryItem } from "./LightboxModal";

const allPhotos: GalleryItem[] = [
  { id: "g1", src: "/her-1.jpeg", title: "Warm Starlight", caption: "The quiet look in your eyes.", category: "Portraits" },
  { id: "g2", src: "/her-2.jpeg", title: "Unfiltered Laugh", caption: "Pure joy captured in a frame.", category: "Candids" },
  { id: "g3", src: "/her-3.jpeg", title: "Starlit Afternoon", caption: "Calm moments we share.", category: "Moments" },
  { id: "g4", src: "/her-4.jpeg", title: "Grace & Elegance", caption: "Effortless beauty.", category: "Portraits" },
  { id: "g5", src: "/her-5.jpeg", title: "City Dusk", caption: "Walking side by side.", category: "Moments" },
  { id: "g6", src: "/her-6.jpeg", title: "Soft Glance", caption: "A smile meant just for me.", category: "Candids" },
  { id: "g7", src: "/her-7.jpeg", title: "Crimson Hour", caption: "Glowing in dark amber light.", category: "Portraits" },
  { id: "g8", src: "/her-8.jpeg", title: "Coffee & Talks", caption: "Endless conversations.", category: "Moments" },
  { id: "g9", src: "/her-9.jpeg", title: "Shy Smile", caption: "That sweet little laugh.", category: "Candids" },
  { id: "g10", src: "/her-10.jpeg", title: "Radiant Light", caption: "Bringing warmth into my world.", category: "Portraits" },
  { id: "g11", src: "/her-11.jpeg", title: "Midnight Breeze", caption: "Contentment in quiet times.", category: "Moments" },
  { id: "g12", src: "/her-12.jpeg", title: "Cozy Evening", caption: "Home wherever you are.", category: "Portraits" },
  { id: "g13", src: "/her-13.jpeg", title: "Unscripted Moment", caption: "Real and true.", category: "Candids" },
  { id: "g14", src: "/her-14.jpeg", title: "Looking Forward", caption: "Dreaming of tomorrow.", category: "Portraits" },
  { id: "g15", src: "/her-15.jpeg", title: "Dusk Serenade", caption: "Deep sky soft contrast.", category: "Moments" },
  { id: "g16", src: "/her-16.jpeg", title: "Curious Spark", caption: "Noticing beauty in everything.", category: "Candids" },
  { id: "g17", src: "/her-17.jpeg", title: "Pure Delight", caption: "A memory frozen in time.", category: "Candids" },
  { id: "g18", src: "/her-18.jpeg", title: "Shadow & Light", caption: "Intimate and quiet.", category: "Portraits" },
  { id: "g19", src: "/her-19.jpeg", title: "Endless Page", caption: "Chapters of happiness.", category: "Moments" },
  { id: "g20", src: "/her-20.jpeg", title: "Always Her", caption: "My favorite person in existence.", category: "Portraits" },
];

export default function Gallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 1.5]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 2.8]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.1]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 2.4]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      lenis.destroy();
    };
  }, []);

  const col1 = [allPhotos[0], allPhotos[1], allPhotos[2], allPhotos[3], allPhotos[4]];
  const col2 = [allPhotos[5], allPhotos[6], allPhotos[7], allPhotos[8], allPhotos[9]];
  const col3 = [allPhotos[10], allPhotos[11], allPhotos[12], allPhotos[13], allPhotos[14]];
  const col4 = [allPhotos[15], allPhotos[16], allPhotos[17], allPhotos[18], allPhotos[19]];

  return (
    <section id="gallery" className="relative w-full bg-[#050505] text-[#f5f5f5] border-t border-[#1a1a1a]">
      {/* Header section separator */}
      <div className="py-20 px-6 text-center max-w-3xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-[#ff2b42] font-semibold block mb-3"
        >
          Always Her
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="font-serif text-4xl sm:text-6xl font-normal text-[#f5f5f5] mb-4"
        >
          My Gallery of Hers
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
          className="text-[#a3a3a3] text-sm sm:text-base font-light"
        >
          My weakness. My strength. My favorite person in existence. She is the only dream I wanna live forever.
        </motion.p>
      </div>

      {/* Skiper30 Multi-Column Parallax Gallery Container */}
      <div
        ref={galleryRef}
        className="relative box-border flex h-[200vh] sm:h-[220vh] gap-[2vw] overflow-hidden bg-[#050505] p-[2vw] border-y border-[#1a1a1a]"
      >
        <Column items={col1} y={y} onSelect={(item) => setLightboxIndex(allPhotos.findIndex((p) => p.id === item.id))} />
        <Column items={col2} y={y2} onSelect={(item) => setLightboxIndex(allPhotos.findIndex((p) => p.id === item.id))} />
        <Column items={col3} y={y3} onSelect={(item) => setLightboxIndex(allPhotos.findIndex((p) => p.id === item.id))} />
        <Column items={col4} y={y4} onSelect={(item) => setLightboxIndex(allPhotos.findIndex((p) => p.id === item.id))} />
      </div>

      {/* Lightbox Modal viewer */}
      <LightboxModal
        items={allPhotos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </section>
  );
}

type ColumnProps = {
  items: GalleryItem[];
  y: MotionValue<number>;
  onSelect: (item: GalleryItem) => void;
};

const Column = ({ items, y, onSelect }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[35%] flex h-full w-1/4 min-w-[200px] sm:min-w-[250px] flex-col gap-[2vw] first:top-[-35%] [&:nth-child(2)]:top-[-75%] [&:nth-child(3)]:top-[-40%] [&:nth-child(4)]:top-[-65%]"
      style={{ y }}
    >
      {items.map((item, i) => (
        <motion.div
          key={item.id + i}
          onClick={() => onSelect(item)}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4 }}
          className="group cursor-pointer relative h-[300px] sm:h-[420px] w-full overflow-hidden rounded-2xl bg-[#0d0d0d] border border-[#222222] shadow-xl hover:border-[#ff2b42]/60 hover:shadow-[0_0_30px_rgba(255,43,66,0.25)]"
        >
          <Image
            src={item.src}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <span className="font-serif text-lg text-white font-normal mb-0.5">
              {item.title}
            </span>
            <span className="font-handwriting text-base text-[#ff2b42]">
              {item.caption}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
