import { ChatLoader } from "@/components/common/loaders/ChatLoader";
import { Itinerary, ChatMessagesProps, RoleEnum } from "@/interfaces";
import { BotIcon, CustomizeIcon, UserIcon } from "@/public/svgs";
import { FC, memo } from "react";

const ChatMessages: FC<ChatMessagesProps> = ({ loading, messages, setCurrentItinerary }) => {
  const handleLoadPlan = (currentItinerary: Itinerary[]) => {
    setCurrentItinerary([]);
    // * After 1 seconds, update the state with the new itinerary
    setTimeout(() => {
      setCurrentItinerary(
        currentItinerary
          ? currentItinerary.map((item, index) => ({
              ...item,
              isOpen: index === 0,
            }))
          : []
      );
    }, 1000);
  };

  return (
    <div className="flex gap-4 flex-col justify-end h-full">
      <div className="overflow-auto px-2 flex gap-4 text-sm flex-col">
        {/* slice to hide first 2 messages in chat */}
        {messages?.slice(2)?.map(({ content, id, role }) => {
          const messageContent = typeof content === "string" ? content : content?.message;
          return (
            <div key={id} className={`w-max max-w-lg ${role === RoleEnum.User ? "ml-auto" : ""}`}>
              {role === RoleEnum.User && (
                <div className="flex gap-2">
                  <p className=" text-white bg-primary p-3 rounded-2xl">{messageContent}</p>
                  <div>
                    <div className="bg-chat-bg p-1 rounded-full">
                      <UserIcon />
                    </div>
                  </div>
                </div>
              )}
              {role === RoleEnum.Assistant && (
                <div className="flex gap-2">
                  <div>
                    <div className="bg-chat-bg p-1 rounded-full">
                      <BotIcon />
                    </div>
                  </div>
                  {/* show plan if success is true and  content type is object */}
                  <div>
                    {typeof content === "object" && content?.success ? (
                      <>
                        <div className="bg-white p-3 rounded-2xl border">
                          {content?.itinerary?.map(({ plan, id: contentId }, index) => (
                            <div key={contentId} className="mb-2">
                              <b>Day {index + 1}</b>
                              {plan?.map(({ title, id, time }) => (
                                <p key={id}>
                                  {title} <span className="text-primary">({time})</span>
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>
                        <button
                          className="text-white bg-primary flex gap-2 py-2 px-4 rounded-3xl font-bold mt-2"
                          onClick={() => {
                            handleLoadPlan(content?.itinerary);
                          }}
                        >
                          Customize Trip
                          <CustomizeIcon />
                        </button>
                      </>
                    ) : (
                      <p className="bg-white p-3 rounded-2xl border">{messageContent}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {!messages?.slice(2)?.length && !loading && (
          <div className="text-center">
            <h3>Start your Chat!</h3>
          </div>
        )}

        {loading && (
          <div className="flex justify-center my-3">
            <ChatLoader />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ChatMessages);
