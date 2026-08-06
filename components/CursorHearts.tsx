"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export interface HeartItem {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const colors = ["#c87d72", "#b8685c", "#d4a373", "#e8d5c8", "#8c534c"];

interface CursorHeartsProps {
  hearts: HeartItem[];
}

export default function CursorHearts({ hearts }: CursorHeartsProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute animate-heart-float"
          style={{
            left: `${h.x}px`,
            top: `${h.y}px`,
          }}
        >
          <Heart
            style={{
              width: `${h.size}px`,
              height: `${h.size}px`,
              fill: h.color,
              color: h.color,
            }}
          />
        </div>
      ))}
    </div>
  );
}
