import { NextRequest } from "next/server";
import OpenAI from "openai";
import { SYSTEM_PROMPT } from "../../shared/prompts";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const assistantId = searchParams.get("assistantId");

  if (!assistantId)
    return Response.json(
      { error: "No assistant id provided" },
      { status: 400 },
    );
  const client = new OpenAI();

  try {
    const updatedAssistant = await client.beta.assistants.update(assistantId, {
      instructions: SYSTEM_PROMPT,
    });
    
    return Response.json({ assistant: updatedAssistant });
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
