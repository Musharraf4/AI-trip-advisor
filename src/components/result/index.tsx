"use client";
import { SELECT_PLAN_ROUTE } from "@/constants";
import { TripEnum, ContentType } from "@/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import milesAILogo from "../../public/miles-ai.svg";
import { ChatHistory } from "../common/ChatHistory";
import { TourSkeleton } from "../common/skeletons/TourSkeleton";
import { TourListing } from "./TourListing";
import { Chat } from "./chat";
import { getThreadList } from "@/lib/idb";

const Result = ({ threadId }: { threadId: string }) => {
  const { push } = useRouter();
  const [plan, setPlan] = useState<{ planDetails: ContentType; title: string } | null>(null);
  const { planDetails, title } = plan || {};
  const { city, days, tripType, itinerary, approximateExpense } = planDetails || {};
  const [currentItinerary, setCurrentItinerary] = useState(itinerary);
  const initialItineraryState = useMemo(() => {
    return itinerary
      ? itinerary.map((item, index) => ({
          ...item,
          isOpen: index === 0, // open first accordion by default
        }))
      : [];
  }, [itinerary]);
  

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const threadList = await getThreadList();
        const foundPlan = threadList.find((thread: { threadId: string }) => thread.threadId === threadId);

        if (foundPlan) {
          setPlan(foundPlan);
        }
      } catch (error) {
        console.error("Error retrieving data from IndexedDB:", error);
      }
    };

    fetchPlan();
  }, [threadId]);

  useEffect(() => {
    if (itinerary) setCurrentItinerary(initialItineraryState);
  }, [itinerary, initialItineraryState]);

  return (
    <section className="h-screen flex">
      <section className="bg-primary p-10 flex flex-col w-1/6">
        <div className="flex justify-between gap-1">
          <Image
            src={milesAILogo}
            height={200}
            width={200}
            alt="milesAI logo"
            className="cursor-pointer"
            onClick={() => push(SELECT_PLAN_ROUTE)}
          />
        </div>
        <div className="flex-1">
          {!!plan ? (
            <div className="flex justify-center items-center h-full">
              <div className="flex flex-col gap-4">
                <h2 className="text-white">{city}</h2>
                <p className="text-white font-light">
                  Going {TripEnum.Solo !== tripType && "with"} {tripType} • {days} days
                </p>
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <ChatHistory threadId={threadId} />
          <button onClick={() => push(SELECT_PLAN_ROUTE)} className="secondary-btn md-btn w-full">
            Go back
          </button>
        </div>
      </section>
      <section className="w-5/6 flex">
        <div className={`w-1/2 p-6 border-r-2`}>
          {!!currentItinerary?.length ? (
            <TourListing
              currentItinerary={currentItinerary}
              setCurrentItinerary={setCurrentItinerary}
              approximateExpense={approximateExpense}
              title={title}
              threadId={threadId}
              initialItineraryState={initialItineraryState}
            />
          ) : (
            <TourSkeleton />
          )}
        </div>

        <Chat threadId={threadId} setCurrentItinerary={setCurrentItinerary} />
      </section>
    </section>
  );
};

export default Result;
