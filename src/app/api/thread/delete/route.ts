import { THREAD_ID } from "@/constants";
import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const threadId = searchParams.get(THREAD_ID);

  if (!threadId)
    return Response.json({ error: "No id provided" }, { status: 400 });

  const client = new OpenAI();

  try {
    const thread = await client.beta.threads.del(threadId);
    return Response.json({ thread: thread });
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
