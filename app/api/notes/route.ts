import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Note from "@/models/Note";

export async function GET() {
  try {
    await connectToDatabase();
    const dbNotes = await Note.find({}).sort({ createdAt: -1 }).lean();

    const formattedNotes = dbNotes.map((n) => ({
      id: n._id.toString(),
      title: n.title,
      date: n.date,
      content: n.content,
      signature: n.signature,
      createdAt: n.createdAt,
    }));

    return NextResponse.json({ notes: formattedNotes }, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    console.error("GET /api/notes error:", error);
    return NextResponse.json({ notes: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, signature } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and Content are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newNote = await Note.create({
      title: title.trim(),
      content: content.trim(),
      signature: signature?.trim() || "Written with love",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    });

    const formatted = {
      id: newNote._id.toString(),
      title: newNote.title,
      date: newNote.date,
      content: newNote.content,
      signature: newNote.signature,
      createdAt: newNote.createdAt,
    };

    return NextResponse.json({ note: formatted }, { status: 201 });
  } catch (error) {
    console.error("POST /api/notes error:", error);
    return NextResponse.json(
      { error: "Failed to create note in database" },
      { status: 500 }
    );
  }
}
