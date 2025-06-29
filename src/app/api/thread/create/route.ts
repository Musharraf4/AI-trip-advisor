import OpenAI from "openai";
export async function POST() {
  const client = new OpenAI();

  try {
    const thread = await client.beta.threads.create();
    return Response.json({ thread: thread });
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
