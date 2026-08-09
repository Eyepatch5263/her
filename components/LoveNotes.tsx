"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Plus, ChevronDown, ChevronUp } from "lucide-react";

interface Note {
  id: string;
  title: string;
  date: string;
  content: string;
  signature: string;
}

const defaultNotes: Note[] = [
  {
    id: "default-1",
    title: "On Quiet Days",
    date: "A Gentle Reminder",
    content:
      "If nobody told you today: you are appreciated more than words can say. Your presence alone makes difficult days manageable and good days unforgettable.",
    signature: "Always in your corner",
  },
  {
    id: "default-2",
    title: "Why You Are My Safe Harbor",
    date: "From the Heart",
    content:
      "Life moves fast and gets loud, but whenever I talk to you, everything slows down into peace. Thank you for being the calm place where I can just be myself.",
    signature: "Forever grateful",
  },
  {
    id: "default-3",
    title: "A Promise for Tomorrow",
    date: "Looking Forward",
    content:
      "No matter where the road leads, I promise to stand by your side, celebrate your victories, cheer for your dreams, and make sure you never feel alone.",
    signature: "Hand in hand, always",
  },
];

export default function LoveNotes() {
  const [notes, setNotes] = useState<Note[]>(defaultNotes);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [activeNoteId, setActiveNoteId] = useState<string | null>("default-1");

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newSignature, setNewSignature] = useState("");
  const [newDate, setNewDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch notes from MongoDB via /api/notes
  const fetchNotes = useCallback(async () => {
    try {
      const res = await fetch("/api/notes");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.notes) && data.notes.length > 0) {
          setNotes(data.notes);
          if (!activeNoteId) {
            setActiveNoteId(data.notes[0].id);
          }
        }
      }
    } catch (err) {
      console.error("Error fetching notes from MongoDB:", err);
    } finally {
      setIsLoading(false);
    }
  }, [activeNoteId]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle.trim(),
          content: newContent.trim(),
          signature: newSignature.trim() || "Written with love",
          date: newDate.trim() || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.note) {
          setNotes((prev) => [data.note, ...prev]);
          setActiveNoteId(data.note.id);
        }
        setNewTitle("");
        setNewContent("");
        setNewSignature("");
        setNewDate("");
        setIsAdding(false);
      }
    } catch (err) {
      console.error("Error posting new note to MongoDB:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Max 6 notes displayed initially unless showAll is toggled
  const displayedNotes = showAll ? notes : notes.slice(0, 6);
  const hasMoreThanSix = notes.length > 6;

  return (
    <section id="letters" className="py-28 px-6 bg-[#050505] relative border-t border-[#1a1a1a] overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-[#ff2b42] rounded-full blur-[160px] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#8b0000] rounded-full blur-[140px] opacity-15 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full  text-[#ff2b42] text-xs font-semibold uppercase tracking-[0.2em] "
          >
            <span>Handwritten & Typed</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-serif text-4xl sm:text-6xl font-normal text-[#f5f5f5] mb-4"
          >
            Letters & Personal Notes
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
            Intimate messages saved securely for you to open whenever you need a little warmth.
          </motion.p>
        </div>

        {/* Action Header: Write New Note Button */}
        <div className="flex justify-end items-center mb-5">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide bg-[#ff2b42] hover:bg-[#d62828] text-white shadow-[0_0_20px_rgba(255,43,66,0.35)] transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{isAdding ? "Close Form" : "Write Note"}</span>
          </button>
        </div>

        {/* Write Note Form Drawer */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-[#0d0d0d] p-8 sm:p-10 rounded-3xl border border-[#222] shadow-2xl max-w-3xl mx-auto">
                <h3 className="font-serif text-2xl text-[#f5f5f5] mb-2 font-normal">
                  Write a Personal Note
                </h3>
                <p className="text-xs text-[#737373] mb-6">
                  Your note will be saved securely and preserved across sessions.
                </p>

                <form onSubmit={handleAddNote} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#8a8a8a] font-mono mb-2">
                      Note Title
                    </label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g., A Thought for Today"
                      className="w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#ff2b42] transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#8a8a8a] font-mono mb-2">
                      Date / Occasion
                    </label>
                    <input
                      type="text"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      placeholder="e.g., Special Day"
                      className="w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#ff2b42] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#8a8a8a] font-mono mb-2">
                      Message Content
                    </label>
                    <textarea
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      rows={4}
                      placeholder="Write your heartfelt note here..."
                      className="w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#ff2b42] transition-colors"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#8a8a8a] font-mono mb-2">
                      Signature / Sign-off (Optional)
                    </label>
                    <input
                      type="text"
                      value={newSignature}
                      onChange={(e) => setNewSignature(e.target.value)}
                      placeholder="e.g., Always yours"
                      className="w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#ff2b42] transition-colors"
                    />
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
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-full bg-[#ff2b42] hover:bg-[#d62828] text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? "Saving Note..." : "Save Note"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {isLoading && notes.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#0d0d0d] h-64 rounded-3xl border border-[#222] animate-pulse" />
            ))}
          </div>
        ) : (
          /* Notes Grid: 3 cards per row on large screens (lg:grid-cols-3) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedNotes.map((note, idx) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="relative bg-[#0d0d0d] p-7 rounded-3xl border border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:border-[#ff2b42]/50 hover:shadow-[0_0_30px_rgba(255,43,66,0.2)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Red Wax Seal Accent */}
                  <div className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#ff2b42] flex items-center justify-center text-[#050505] shadow-[0_0_15px_rgba(255,43,66,0.6)]">
                    <Heart className="w-4 h-4 fill-current text-[#050505]" />
                  </div>

                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#ff2b42] font-semibold mb-3">
                    {note.date}
                  </div>

                  <h3 className="font-serif text-2xl text-[#f5f5f5] font-normal mb-4 leading-snug pr-8">
                    {note.title}
                  </h3>

                  <div className="w-12 h-[1px] bg-[#222] mb-4"></div>

                  <p className="text-[#a3a3a3] text-sm leading-relaxed mb-6 font-light whitespace-pre-line line-clamp-6">
                    &ldquo;{note.content}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1a1a1a]">
                  <span className="font-handwriting text-xl text-[#ff2b42] block">
                    ~ {note.signature}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Notes Toggle Button (Rendered if notes count exceeds 6) */}
        {hasMoreThanSix && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#121212] hover:bg-[#1a1a1a] text-[#ff2b42] hover:text-white border border-[#ff2b42]/40 hover:border-[#ff2b42] text-xs uppercase tracking-widest font-semibold transition-all shadow-[0_0_20px_rgba(255,43,66,0.15)] active:scale-95"
            >
              <span>{showAll ? "Show Top 6 Notes" : `View All Notes (${notes.length})`}</span>
              {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
