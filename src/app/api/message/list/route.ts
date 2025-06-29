import { THREAD_ID } from "@/constants";
import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const threadId = searchParams.get(THREAD_ID);
  const runId = searchParams.get("runId");

  if (!threadId)
    return Response.json({ error: "No id provided" }, { status: 400 });

  const openai = new OpenAI();

  try {
    const response = await openai.beta.threads.messages.list(threadId, {
      order: "asc",
      limit: 100,
      ...(runId && { run_id: runId }),
    });

    const messages = response?.data.map((item: any) => {
      return {
        id: item.id,
        role: item.role,
        thread_id: item.thread_id,
        created_at: item.created_at,
        run_id: item.run_id,
        content:
          item.role === "user"
            ? item.content[0]?.text?.value
            : JSON.parse(item.content[0]?.text?.value),
      };
    });

    return Response.json({ messages: messages });
  } catch (error: any) {
    console.log(error);
    return Response.json({ error }, { status: error.status });
  }
}
