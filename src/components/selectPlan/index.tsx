import { createChat, postMessage } from "@/app/actions";
import Stepper from "@/components/common/Stepper";
import { RESULT_ROUTE, SELECT_PLAN_ROUTE } from "@/constants";
import { TourContext } from "@/contexts/TourContext";
import { TripEnum } from "@/interfaces";
import { getHeading, getText } from "@/lib/helper";
import { addThread } from "@/lib/idb";
import { BackIcon, NextArrow, TickIcon } from "@/public/svgs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import milesAILogo from "../../public/miles-ai.svg";
import { ChatHistory } from "../common/ChatHistory";
import { ButtonLoader } from "../common/loaders/ButtonLoader";
import { Destination } from "./destination";
import Interests from "./interests";
import { SelectDates } from "./selectDates";
import TripType from "./tripType";

const SelectPlan = () => {
  const [stepperValue, setStepperValue] = useState(0);
  const { push } = useRouter();
  const { state } = useContext(TourContext);
  const { destination, dateRange, trip, selectedInterests } = state;
  const { petsAllowed } = trip;

  const stepperHandler = async () => {
    setStepperValue(stepperValue + 1);
    if (stepperValue === 3) {
      const message = `I am traveling to ${destination.city}, ${
        destination.country
      } from ${dateRange[0].startDate?.toLocaleDateString(
        "en-GB"
      )} to ${dateRange[0].endDate?.toLocaleDateString("en-GB")} and I will be going ${
        trip.type !== TripEnum.Solo ? "with" : ""
      } ${trip.type} ${petsAllowed ? "along with the pets" : ""} ${
        selectedInterests.length > 0 ? `where my interests are ${selectedInterests.join()}` : ""
      }`;
      const chatCreated = await createChat();
      if (chatCreated) {
        // * post message along with generated thread ID
        const generatedThreadId = chatCreated.thread.id;
        const postItineraryPreference = await postMessage(generatedThreadId, message);
        if (postItineraryPreference?.messages) {
          const planDetails = postItineraryPreference?.messages[0]?.content;

          // * create thread list
          const newThread = {
            threadId: generatedThreadId,
            title: `${destination.city} Plan`,
            savedAt: null,
            createdAt: new Date().toISOString(),
            planDetails,
          };

          // * create thread in indexed db
          await addThread(newThread);

          // * push to result page if successfully got result
          push(`${RESULT_ROUTE}/${generatedThreadId}`);
        }
      }
    }
  };

  return (
    <section className="min-h-screen grid grid-cols-12 gap-4 w-full">
      <div className="w-full col-span-6 lg:col-span-4 xl:col-span-3 md:col-span-5 md:block hidden">
        <div className="bg-primary p-10 flex flex-col h-full">
          <div className="flex justify-between">
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
            <div className="flex justify-center items-center h-full">
              <div className="flex flex-col gap-4">
                {stepperValue >= 1 && <h3 className="text-white">{destination.city} trip</h3>}
                <h1 className="text-white">{getHeading(stepperValue)}</h1>
                <p className="text-white font-light">{getText(stepperValue)}</p>
              </div>
            </div>
          </div>
          <ChatHistory disabled={stepperValue > 3} />
        </div>
      </div>

      <div className="lg:col-span-8 xl:col-span-9 md:col-span-7 col-span-12 max-w-screen-lg mx-auto px-6">
        <div className="flex justify-between flex-col h-full pt-10 pb-20 gap-10">
          <Stepper stepperValue={stepperValue} />
          <div className="h-full w-full">
            {stepperValue === 0 && <Destination />}
            {stepperValue === 1 && <SelectDates />}
            {stepperValue === 2 && <TripType />}
            {stepperValue > 2 && <Interests />}
          </div>
          <div className="flex justify-between">
            {stepperValue > 0 ? (
              <button
                className="info-btn md-btn flex gap-2 items-center disabled:opacity-40"
                onClick={() => setStepperValue((prevValue) => prevValue - 1)}
                disabled={stepperValue > 3}
              >
                <BackIcon /> Back
              </button>
            ) : (
              <div />
            )}
            <button
              className="primary-btn md-btn flex gap-2 items-center"
              onClick={stepperHandler}
              disabled={stepperValue > 3}
            >
              {stepperValue > 2 ? (
                <>Submit {stepperValue > 3 ? <ButtonLoader /> : <TickIcon />}</>
              ) : (
                <>
                  Next <NextArrow />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectPlan;
