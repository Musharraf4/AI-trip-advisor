import { THREAD_ID } from "@/constants";
import { NextRequest } from "next/server";
import OpenAI from "openai";


const client = new OpenAI();
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const threadId = searchParams.get(THREAD_ID);
  const runId = searchParams.get("runId");

  if (!threadId)
    return Response.json({ error: "No thread id provided" }, { status: 400 });
  if (!runId)
    return Response.json({ error: "No run id provided" }, { status: 400 });

  try {
    const run = await client.beta.threads.runs.retrieve(threadId, runId);

    return Response.json({ run: run });
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}