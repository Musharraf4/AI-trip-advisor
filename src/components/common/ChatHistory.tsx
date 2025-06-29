import { RESULT_ROUTE } from "@/constants";
import { ChatHistoryProps, ThreadListType } from "@/interfaces";
import { HistoryIcon } from "@/public/svgs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import { ButtonLoader } from "./loaders/ButtonLoader";
import { getThreadList } from "@/lib/idb";

export const ChatHistory: FC<ChatHistoryProps> = ({ threadId, disabled }) => {
  const [threadList, setThreadList] = useState<ThreadListType[]>([]);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const [openChatHistory, setOpenChatHistory] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpenChatHistory(!openChatHistory);
  };

  const handleSelectChat = (selectedThreadId: string) => {
    setLoading(true);
    push(`${RESULT_ROUTE}/${selectedThreadId}`);
    setOpenChatHistory(false);
  };

  useEffect(() => {
    if (!openChatHistory) return;
  
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenChatHistory(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openChatHistory]);

  useEffect(() => {
    const fetchThreads = async () => {
      const storedThreads = await getThreadList();
      setThreadList(storedThreads);
    };
    fetchThreads();
  }, [setThreadList]);

  const showMenu = {
    enter: {
      opacity: 1,
      y: 0,
      display: "block",
    },
    exit: {
      y: -5,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <>
      <motion.div className="menu-item" ref={containerRef}>
        <motion.button
          onClick={handleOpen}
          disabled={loading || disabled}
          className="outlined-btn md-btn w-full flex gap-2 justify-center"
        >
          {loading ? <ButtonLoader /> : <HistoryIcon />} Chat history
        </motion.button>
        <motion.div
          className="relative"
          initial="exit"
          animate={openChatHistory ? "enter" : "exit"}
          variants={showMenu}
        >
          <div className="w-72 bg-white absolute mt-1 p-2 bottom-14 left-32 rounded-xl z-20 border shadow-md overflow-auto max-h-80">
            {!!threadList?.length ? (
              threadList?.map(({ threadId: currentThreadId, title }) => (
                <div key={currentThreadId}>
                  <motion.button
                    disabled={currentThreadId === threadId}
                    className={`rounded-lg w-full p-3 text-sm text-left hover:bg-primary-bg disabled:bg-primary my-[2px] ${
                      currentThreadId === threadId ? "bg-primary text-white" : "cursor-pointer"
                    }`}
                    onClick={() => handleSelectChat(currentThreadId)}
                  >
                    {title}
                  </motion.button>
                </div>
              ))
            ) : (
              <div className="text-center">
                <h3>No Chat history found!</h3>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
