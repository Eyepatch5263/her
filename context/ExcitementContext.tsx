"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface ExcitementContextType {
  excitementCount: number;
  incrementExcitement: () => Promise<void>;
  isLoading: boolean;
}

const ExcitementContext = createContext<ExcitementContextType>({
  excitementCount: 42,
  incrementExcitement: async () => {},
  isLoading: true,
});

export const ExcitementProvider = ({ children }: { children: React.ReactNode }) => {
  const [excitementCount, setExcitementCount] = useState<number>(42);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch global count from backend API route
  const fetchCount = useCallback(async () => {
    try {
      const res = await fetch("/api/excitement", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (typeof data.count === "number") {
          setExcitementCount(data.count);
        }
      }
    } catch (err) {
      console.error("Failed to fetch global excitement count:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCount();
    // Poll every 3 seconds for live real-time synchronization across all visitors
    const interval = setInterval(fetchCount, 3000);
    return () => clearInterval(interval);
  }, [fetchCount]);

  const incrementExcitement = useCallback(async () => {
    // Optimistic UI update for instantaneous responsiveness
    setExcitementCount((prev) => prev + 1);

    try {
      const res = await fetch("/api/excitement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ increment: 1 }),
      });
      if (res.ok) {
        const data = await res.json();
        if (typeof data.count === "number") {
          setExcitementCount(data.count);
        }
      }
    } catch (err) {
      console.error("Failed to increment global excitement count:", err);
    }
  }, []);

  return (
    <ExcitementContext.Provider value={{ excitementCount, incrementExcitement, isLoading }}>
      {children}
    </ExcitementContext.Provider>
  );
};

export const useExcitement = () => useContext(ExcitementContext);
