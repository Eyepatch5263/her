"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

interface ExcitementContextType {
  excitementCount: number;
  incrementExcitement: () => void;
  isLoading: boolean;
}

const ExcitementContext = createContext<ExcitementContextType>({
  excitementCount: 42,
  incrementExcitement: () => {},
  isLoading: true,
});

export const ExcitementProvider = ({ children }: { children: React.ReactNode }) => {
  const [excitementCount, setExcitementCount] = useState<number>(42);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pendingClicksRef = useRef<number>(0);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Query total count from MongoDB
  const fetchCount = useCallback(async () => {
    // Skip polling update if user is actively clicking and has unsynced clicks
    if (pendingClicksRef.current > 0) return;

    try {
      const res = await fetch("/api/excitement", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (typeof data.count === "number") {
          setExcitementCount(data.count);
        }
      }
    } catch (err) {
      console.error("Failed to query excitement count from MongoDB:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCount();
    // Poll MongoDB every 2.5 seconds for live real-time sync across all active visitors
    const interval = setInterval(fetchCount, 2500);
    return () => clearInterval(interval);
  }, [fetchCount]);

  // Flush accumulated clicks to MongoDB in a single atomic request
  const syncClicksToDb = useCallback(async () => {
    const amountToSync = pendingClicksRef.current;
    if (amountToSync <= 0) return;

    pendingClicksRef.current = 0;

    try {
      const res = await fetch("/api/excitement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountToSync }),
      });

      if (res.ok) {
        const data = await res.json();
        if (typeof data.count === "number") {
          setExcitementCount(data.count);
        }
      }
    } catch (err) {
      console.error("Failed to push excitement count to MongoDB:", err);
      // Re-add unsynced clicks back to buffer in case of network error
      pendingClicksRef.current += amountToSync;
    }
  }, []);

  const incrementExcitement = useCallback(() => {
    // 1. Instant optimistic UI counter increment
    setExcitementCount((prev) => prev + 1);

    // 2. Accumulate pending click count
    pendingClicksRef.current += 1;

    // 3. Debounce network sync by 400ms so rapid clicks are batched into one atomic MongoDB update
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }

    syncTimeoutRef.current = setTimeout(() => {
      syncClicksToDb();
    }, 400);
  }, [syncClicksToDb]);

  return (
    <ExcitementContext.Provider value={{ excitementCount, incrementExcitement, isLoading }}>
      {children}
    </ExcitementContext.Provider>
  );
};

export const useExcitement = () => useContext(ExcitementContext);
