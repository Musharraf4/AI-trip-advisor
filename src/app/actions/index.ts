"use server";
import { Message } from "@/interfaces";

export const fetchMessages = async (threadId: string, runId?: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/message/list?threadId=${threadId}${runId ? `&runId=${runId}` : ""}`, {
      method: "GET"
    });
    return response.json();
  }
  catch (error) {
    alert(error)
  }
};

export const createChat = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/thread/create`, { method: 'POST' });
    return response.json();
  } catch (error) {
    return Response.json({ error });
  }
}

export const postMessage = async (threadId: string, input: string): Promise<{ messages: Message[] } | null> => {
  try {
    console.log("---postMessage---started")
    const response = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/message/create`, {
      method: "POST",
      body: JSON.stringify({
        threadId: threadId,
        message: input,
      }),
    });

    let data = await response.json();
    const runId = data?.run?.id;
    const POLL_INTERVAL = 2000; // 2 seconds delay

    while (data?.run?.status !== 'completed') {
      data = await getStatus(threadId, runId);
      await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
    }
    const messages = await fetchMessages(threadId, runId) //run id to get only last message
    return messages;

  } catch (error) {
    return null;
  }
};

export const getStatus = async (threadId: string, runId: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/run/retrieve?threadId=${threadId}&runId=${runId}`);
    return response.json();

  } catch (error) {
    return Response.json({ error });
  }
}