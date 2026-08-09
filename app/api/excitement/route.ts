import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "excitement.json");

// Default starting count for meetup excitement
const INITIAL_COUNT = 42;

function getCount(): number {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify({ count: INITIAL_COUNT }), "utf-8");
      return INITIAL_COUNT;
    }
    const fileData = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(fileData);
    return typeof parsed.count === "number" ? parsed.count : INITIAL_COUNT;
  } catch {
    return INITIAL_COUNT;
  }
}

function saveCount(count: number) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify({ count }), "utf-8");
  } catch (err) {
    console.error("Failed to persist excitement count:", err);
  }
}

export async function GET() {
  const count = getCount();
  return NextResponse.json({ count }, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const increment = typeof body.increment === "number" ? body.increment : 1;
    const currentCount = getCount();
    const newCount = currentCount + Math.max(1, increment);
    saveCount(newCount);
    return NextResponse.json({ count: newCount }, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch {
    const currentCount = getCount() + 1;
    saveCount(currentCount);
    return NextResponse.json({ count: currentCount });
  }
}
