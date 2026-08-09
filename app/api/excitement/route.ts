import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Excitement from "@/models/Excitement";

const COUNTER_NAME = "meetup_counter";
const DEFAULT_INITIAL_COUNT = 42;

export async function GET() {
  try {
    await connectToDatabase();

    let doc = await Excitement.findOne({ name: COUNTER_NAME });
    if (!doc) {
      doc = await Excitement.create({
        name: COUNTER_NAME,
        count: DEFAULT_INITIAL_COUNT,
      });
    }

    return NextResponse.json(
      { count: doc.count },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("GET /api/excitement MongoDB error:", error);
    return NextResponse.json({ count: DEFAULT_INITIAL_COUNT }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const amount = typeof body.amount === "number" && body.amount > 0 ? body.amount : 1;

    await connectToDatabase();

    // Atomic increment in MongoDB Atlas
    const doc = await Excitement.findOneAndUpdate(
      { name: COUNTER_NAME },
      { $inc: { count: amount } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json(
      { count: doc.count },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("POST /api/excitement MongoDB error:", error);
    return NextResponse.json({ error: "Failed to update excitement count" }, { status: 500 });
  }
}
