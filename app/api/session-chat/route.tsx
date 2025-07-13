import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';    

export async function POST(req:NextRequest) {
    const {notes, selectedDoctor} = await req.json();
    const user = await currentUser()
    try {
        const sessionId = uuidv4(); 
        const result = await db.insert(SessionChatTable).values({
            sessionId: sessionId,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            notes: notes,
            selectedDoctor: selectedDoctor,
            createdOn: (new Date()).toString(),
            //@ts-ignore
        }).returning({SessionChatTable})

        return NextResponse.json(result[0]?.SessionChatTable)
    } catch (error) {
      return  NextResponse.json(error)
    }
}


// export async function GET(req: NextRequest) {
//     const { searchParams } = new URL(req.url);
//     const sessionId = searchParams.get("sessionId");
//     const user = await currentUser();

//     const result = await db.select().from(SessionChatTable)
//     //@ts-ignore
//     .where(eq(SessionChatTable.sessionId, sessionId))
//     return NextResponse.json(result[0])
// }

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    console.log("API called with sessionId:", sessionId); // 👈 check if this logs a real ID

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db
      .select()
      .from(SessionChatTable)
      
      .where(eq(SessionChatTable.sessionId, sessionId));

    if (!result.length) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("GET /api/session-chat error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
