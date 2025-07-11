import { openai } from "@/config/OpenAiModel";
import { AIDoctorsAgent } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { notes } = await req.json();
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-preview-05-20",
      messages: [
        {
          role: "system",
          content: JSON.stringify(AIDoctorsAgent),
        },
        {
          role: "user",
          content:
            "User Notes/Symptoms:" +
            notes +
            ", Depends on user notes and symptoms, Please suggest list of doctors , Return Object in JSON only",
        },
      ],
      max_tokens: 1000,
    });
    const rawResponse = completion.choices[0].message;
    //@ts-ignore
    const Response = rawResponse.content
      .trim()
      .replace("```json", "")
      .replace("```", "");
    const JSONResp = JSON.parse(Response);
    return NextResponse.json(JSONResp);
  } catch (error) {
    return NextResponse.json(error);
  }
}
