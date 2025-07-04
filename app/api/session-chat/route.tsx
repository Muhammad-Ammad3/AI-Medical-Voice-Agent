import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';    

export async function POST(req:NextRequest) {
    const [notes, selectedDoctor] = await req.json();
    const user = currentUser()
    try {
        const sessionId = uuidv4(); 
        const result = await db.insert(SessionChatTable).values({
            sessionId: sessionId,
            //@ts-ignore
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