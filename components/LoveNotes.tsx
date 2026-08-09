"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Note {
  id: string;
  title: string;
  date: string;
  content: string;
  signature: string;
  isCustom?: boolean;
}

const defaultNotes: Note[] = [
  {
    id: "note-1",
    title: "On Quiet Days",
    date: "A Gentle Reminder",
    content:
      "If nobody told you today: you are appreciated more than words can say. Your presence alone makes difficult days manageable and good days unforgettable.",
    signature: "Always in your corner",
  },
  {
    id: "note-2",
    title: "Why You Are My Safe Harbor",
    date: "From the Heart",
    content:
      "Life moves fast and gets loud, but whenever I talk to you, everything slows down into peace. Thank you for being the calm place where I can just be myself.",
    signature: "Forever grateful",
  },
  {
    id: "note-3",
    title: "A Promise for Tomorrow",
    date: "Looking Forward",
    content:
      "No matter where the road leads, I promise to stand by your side, celebrate your victories, cheer for your dreams, and make sure you never feel alone.",
    signature: "Hand in hand, always",
  },
];

export default function LoveNotes() {
  const [notes, setNotes] = useState<Note[]>(defaultNotes);
  const [activeNoteId, setActiveNoteId] = useState<string>("note-1");
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("her_love_notes");
      if (saved) {
        setNotes([...defaultNotes, ...JSON.parse(saved)]);
      }
    } catch { }
  }, []);

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const custom: Note = {
      id: "custom-" + Date.now(),
      title: newTitle.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      content: newContent.trim(),
      signature: "Written with love",
      isCustom: true,
    };

    const updated = [custom, ...notes];
    setNotes(updated);
    setActiveNoteId(custom.id);
    setNewTitle("");
    setNewContent("");
    setIsAdding(false);

    try {
      const customOnly = updated.filter((n) => n.isCustom);
      localStorage.setItem("her_love_notes", JSON.stringify(customOnly));
    } catch { }
  };

  return (
    <section id="letters" className="py-28 px-6 bg-[#050505] relative border-t border-[#1a1a1a]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-[#ff2b42] font-semibold block mb-3"
          >
            Typed & Handwritten Messages
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-serif text-4xl sm:text-6xl font-normal text-[#f5f5f5] mb-4"
          >
            Letters & Notes
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
            Intimate messages written for you to open whenever you need a little warmth.
          </motion.p>
        </div>

        {/* Note Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {notes.map((note) => (
            <button
              key={note.id}
              onClick={() => {
                setActiveNoteId(note.id);
                setIsAdding(false);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${activeNoteId === note.id && !isAdding
                  ? "bg-[#ff2b42] text-white shadow-[0_0_20px_rgba(255,43,66,0.4)]"
                  : "bg-[#121212] text-[#a3a3a3] hover:bg-[#1a1a1a] hover:text-white border border-[#222]"
                }`}
            >
              {note.title}
            </button>
          ))}

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide bg-[#121212] text-[#ff2b42] hover:bg-[#1a1a1a] border border-[#ff2b42]/40 transition-colors"
          >
            + Write Note
          </button>
        </div>

        {/* Add Custom Note Drawer */}
        <AnimatePresence mode="wait">
          {isAdding ? (
            <motion.div
              key="add-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#0d0d0d] p-8 sm:p-10 rounded-3xl border border-[#222] shadow-2xl mb-10 max-w-2xl mx-auto"
            >
              <h3 className="font-serif text-2xl text-[#f5f5f5] mb-6 font-normal">
                Write a New Personal Note
              </h3>
              <form onSubmit={handleAddNote} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#737373] font-mono mb-2">
                    Note Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., A Thought for Today"
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#ff2b42]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#737373] font-mono mb-2">
                    Message
                  </label>
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    rows={4}
                    placeholder="Write your heartfelt note here..."
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#ff2b42]"
                    required
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-5 py-2.5 rounded-full text-xs text-[#a3a3a3] hover:bg-[#1a1a1a]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#ff2b42] hover:bg-[#d62828] text-white text-xs font-semibold shadow-sm"
                  >
                    Save Note
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            /* Dark Typed Letter Card */
            <motion.div
              key={activeNote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative bg-[#0d0d0d] p-8 sm:p-14 rounded-3xl border border-[#222] shadow-[0_10px_40px_rgba(0,0,0,0.8)] max-w-2xl mx-auto"
            >
              {/* Crimson Wax Seal Accent */}
              <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-[#ff2b42] flex items-center justify-center text-[#050505] font-serif font-bold text-sm shadow-[0_0_20px_#ff2b42]">
                ♥
              </div>

              <div className="text-xs uppercase tracking-[0.2em] text-[#ff2b42] font-semibold mb-2">
                {activeNote.date}
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#f5f5f5] font-normal mb-8 leading-snug">
                {activeNote.title}
              </h3>

              <div className="w-16 h-[1px] bg-[#222] mb-8"></div>

              <p className="text-[#a3a3a3] text-base sm:text-lg leading-relaxed mb-10 font-light whitespace-pre-line">
                "{activeNote.content}"
              </p>

              <div className="pt-6 border-t border-[#1a1a1a] flex items-center justify-between">
                <span className="font-handwriting text-2xl text-[#ff2b42]">
                  ~ {activeNote.signature}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
