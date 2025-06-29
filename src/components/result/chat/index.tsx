import { fetchMessages, postMessage } from "@/app/actions";
import { ButtonLoader } from "@/components/common/loaders/ButtonLoader";
import { ChatProps, ChatType, Message } from "@/interfaces";
import { AIIcon, SendIcon } from "@/public/svgs";
import { ChatAction, ChatActionType, chatInitialState, chatReducer } from "@/reducers/ChatReducer";
import {
  FC,
  FormEvent,
  Reducer,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import ChatMessages from "./Messages";

export const Chat: FC<ChatProps> = ({ threadId, setCurrentItinerary }) => {
  
  const [state, dispatch] = useReducer<Reducer<ChatType, ChatAction>>(
    chatReducer,
    chatInitialState
  );
  const [allMessages, setAllMessages] = useState<{ messages: Message[] } | null>(null);
  const { loading, message, showChat } = state;
  const { messages } = allMessages || {};

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleMessage = async (event: FormEvent) => {
    event.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    dispatch({
      type: ChatActionType.SET_LOADING,
      loading: true,
    });

    const newMessage = {
      content: trimmedMessage,
      id: Date.now().toString(),
      role: "user",
      thread_id: threadId,
      created_at: Date.now(),
    };

    setAllMessages((prevMessages) => ({
      messages: [...(prevMessages?.messages ?? []), newMessage],
    }));

    dispatch({
      type: ChatActionType.SET_MESSAGE,
      message: "",
    });

    try {
      const data = await postMessage(threadId, trimmedMessage);
      if (data?.messages?.length) {
        setAllMessages((prevMessages) => ({
          messages: [...(prevMessages?.messages || []), data.messages[0]],
        }));
      }
    } catch {
      alert("Oops! Something went wrong. Please try again later.");
    } finally {
      dispatch({
        type: ChatActionType.SET_LOADING,
        loading: false,
      });
    }
  };

  const getMessages = useCallback(async () => {
    dispatch({
      type: ChatActionType.SET_LOADING,
      loading: true,
    });
    const data = await fetchMessages(threadId);
    if (!data?.error?.error?.message) {
      setAllMessages(data);
      dispatch({
        type: ChatActionType.SET_LOADING,
        loading: false,
      });
    }
  }, [threadId]);

  useEffect(() => {
    getMessages();
  }, [threadId, getMessages]);

  useEffect(() => {
    dispatch({
      type: ChatActionType.SET_SHOW_CHAT,
      showChat: !!messages?.slice(2)?.length,
    });
  }, [messages]);

  return (
    <>
      {showChat ? (
        <div className="bg-light-bg p-6 w-1/2">
          <div className="flex flex-col justify-between h-full" ref={chatContainerRef}>
            {/* Chat messages */}
            <div className="overflow-y-auto max-h-[calc(100vh-230px)] px-1 flex-1 ">
              <ChatMessages
                loading={loading}
                messages={messages}
                setCurrentItinerary={setCurrentItinerary}
              />
            </div>

            {/* Chat Input */}
            <div className="w-full">
              <div className="bg-white border rounded-3xl shadow-lg">
                <form onSubmit={handleMessage}>
                  <div className="py-4 px-6">
                    <div className="w-full">
                      <textarea
                        style={{ resize: "none" }}
                        value={message}
                        placeholder="Say something..."
                        className="bg-transparent focus-visible:outline-none w-full"
                        onChange={(event) =>
                          dispatch({
                            type: ChatActionType.SET_MESSAGE,
                            message: event.target.value,
                          })
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault();
                            handleMessage(event);
                          }
                        }}
                      />
                    </div>
                    <div className="mt-2 flex justify-end">
                      <button
                        type="submit"
                        onSubmit={handleMessage}
                        className="bg-primary px-4 py-[10px] rounded-3xl text-white font-bold flex gap-2 disabled:opacity-40"
                        disabled={!threadId || !message?.trim()?.length || loading}
                      >
                        Send
                        <SendIcon />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-primary w-1/2 flex items-center justify-center">
          <div className="flex flex-col gap-4">
            <h3 className="text-white">Need more assistance in customizing your trip?</h3>
            <div className="flex justify-center">
              <button
                className="secondary-btn md-btn flex gap-2 disabled:opacity-40"
                onClick={() =>
                  dispatch({
                    type: ChatActionType.SET_SHOW_CHAT,
                    showChat: true,
                  })
                }
                disabled={loading}
              >
                Let&apos;s Chat! {loading ? <ButtonLoader /> : <AIIcon />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
