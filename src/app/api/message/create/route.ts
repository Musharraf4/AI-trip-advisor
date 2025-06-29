import { NextRequest } from "next/server";
import OpenAI from "openai";
import { ASSISTANT_ID } from "../../shared/constants";

export async function POST(req: NextRequest) {
  const { message, threadId } = await req.json();

  if (!threadId || !message)
    return Response.json({ error: "Invalid message" }, { status: 400 });

  const openai = new OpenAI();

  try {
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    });

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: ASSISTANT_ID,
    });

    return Response.json({ run: run });
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
