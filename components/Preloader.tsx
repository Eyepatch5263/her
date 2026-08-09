"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "Hello",
  "Graceful",
  "Luminous",
  "Radiant",
  "Irresistible",
  "My Favorite",
  "Always Her",
];

const easeCurve: [number, number, number, number] = [0.87, 0, 0.13, 1];

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (index === words.length - 1) {
      const timeout = setTimeout(() => {
        setIsFinished(true);
        if (onComplete) onComplete();
      }, 500);
      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(
      () => {
        setIndex((prev) => prev + 1);
      },
      index === 0 ? 900 : 280
    );

    return () => clearTimeout(timer);
  }, [index, onComplete]);

  // Smooth Dennis Snellenberg style curved SVG path
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height
    } Q${dimension.width / 2} ${dimension.height + 400} 0 ${dimension.height
    } Z`;

  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2
    } 0 0 0 Z`;

  const curveVariants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.85, ease: easeCurve },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.85, ease: easeCurve, delay: 0.1 },
    },
  };

  const containerSlide = {
    initial: { top: 0, opacity: 1 },
    exit: {
      top: "-100vh",
      opacity: 0.9,
      transition: { duration: 0.9, ease: easeCurve, delay: 0.1 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {!isFinished && (
        <motion.div
          variants={containerSlide}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] text-[#f5f5f5] overflow-hidden"
        >
          {/* Glossy Red Ambient Pulsing Glow */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0.15 }}
            animate={{ scale: [0.8, 1.2, 1], opacity: [0.15, 0.35, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[500px] h-[500px] bg-[#ff2b42] rounded-full blur-[150px] pointer-events-none"
          />

          {/* Typography word reveal with blur, scale and fade */}
          {dimension.height > 0 && (
            <div className="relative z-10 flex items-center gap-3 px-6 text-center">
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="w-2.5 h-2.5 rounded-full bg-[#ff2b42] shadow-[0_0_12px_#ff2b42]"
              />
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 15, filter: "blur(8px)", scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, y: -15, filter: "blur(8px)", scale: 1.03 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#f5f5f5] tracking-wide"
                >
                  {words[index]}
                </motion.p>
              </AnimatePresence>
            </div>
          )}

          {/* Curved SVG exit curtain */}
          {dimension.height > 0 && (
            <svg className="absolute top-0 left-0 w-full h-[calc(100%+400px)] pointer-events-none fill-[#050505]">
              <motion.path
                variants={curveVariants}
                initial="initial"
                exit="exit"
              />
            </svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
