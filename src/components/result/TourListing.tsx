import { Plan, TourListingProps, TourListingType } from "@/interfaces";
import { getPlanImage } from "@/lib/helper";
import { getThreadList, updateThread } from "@/lib/idb";
import { DownIcon, DragIcon, EditIcon, MinusIcon } from "@/public/svgs";
import {
  TourListingAction,
  TourListingActionType,
  tourListingInitialState,
  tourListingReducer,
} from "@/reducers/TourListingReducer";
import { motion, Reorder } from "framer-motion";
import Image from "next/image";
import { FC, Reducer, useEffect, useReducer } from "react";
import { SaveItineraryModal } from "../common/modals/SaveItineraryModal";

export const TourListing: FC<TourListingProps> = ({
  approximateExpense,
  title,
  threadId,
  setCurrentItinerary,
  currentItinerary,
  initialItineraryState,
}) => {
  const [state, dispatch] = useReducer<Reducer<TourListingType, TourListingAction>>(
    tourListingReducer,
    { ...tourListingInitialState, itineraryTitle: title || "" }
  );
  const { editable, itineraryTitle, openRenameModal, threadList } = state;

  const fetchThreads = async () => {
    const storedThreads = await getThreadList();
    dispatch({
      type: TourListingActionType.SET_THREAD_LIST,
      threadList: storedThreads,
    });
  };
  
  useEffect(() => {
    fetchThreads();
  }, []);
  const handleRenamePlan = (input: string) => {
    const findObject = threadList.find(
      (thread: { threadId: string }) => thread.threadId === threadId
    );
    if (findObject) {
      // * rename plan name
      const renameThread = {
        ...findObject,
        savedAt: new Date().toISOString(),
        title: input,
      };
      updateThread(threadId, renameThread);
      dispatch({
        type: TourListingActionType.SET_ITINERARY_TITLE,
        itineraryTitle: input,
      });
    }
    dispatch({
      type: TourListingActionType.SET_OPEN_RENAME_MODAL,
      openRenameModal: false,
    });
    dispatch({
      type: TourListingActionType.SET_EDITABLE,
      editable: false,
    });
  };

  // open/close single day plan
  const toggleAccordion = (accordionId: number) => {
    const updatedAccordions = currentItinerary?.map((accordion) =>
      accordion.id === accordionId
        ? { ...accordion, isOpen: !accordion.isOpen }
        : { ...accordion, isOpen: false }
    );
    setCurrentItinerary(updatedAccordions);
  };

  // * re order plan in single day
  const handleReorder = (newPlan: Plan[], accordionId: number) => {
    const updatedData = currentItinerary?.map((accordion) =>
      accordion.id === accordionId ? { ...accordion, plan: newPlan } : accordion
    );
    setCurrentItinerary(updatedData);
  };

  // * to delete any single item from plan
  const handleDelete = (accordionId: number, itemId: number) => {
    const updatedData = currentItinerary?.map((accordion) => {
      if (accordion.id === accordionId) {
        // * Update the plan for the matched accordion
        const updatedPlan = accordion.plan.filter((item) => item.id !== itemId);
        return { ...accordion, plan: updatedPlan };
      }
      return accordion;
    });

    setCurrentItinerary(updatedData);
  };

  const handleClose = () =>
    dispatch({
      type: TourListingActionType.SET_OPEN_RENAME_MODAL,
      openRenameModal: false,
    });

  const handleUpdatePlan = async () => {
    dispatch({
      type: TourListingActionType.SET_EDITABLE,
      editable: !editable,
    });
    if (editable) {
      const findObject = threadList.find(
        (thread: { threadId: string }) => thread.threadId === threadId
      );
      if (findObject && typeof findObject.planDetails === "object") {
        // * update plan
        findObject.savedAt = new Date().toISOString();
        const updatePlan = {
          ...findObject,
          planDetails: { ...findObject.planDetails, itinerary: currentItinerary },
        };
        await updateThread(threadId, updatePlan);
      }
    }
  };

  const handleCancelPlan = () => {
    setCurrentItinerary(initialItineraryState);
    dispatch({
      type: TourListingActionType.SET_EDITABLE,
      editable: false,
    });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div
            className="flex gap-1 items-center cursor-pointer"
            onClick={() =>
              dispatch({
                type: TourListingActionType.SET_OPEN_RENAME_MODAL,
                openRenameModal: true,
              })
            }
          >
            <h2 className="text-primary">{itineraryTitle}</h2>
            <EditIcon />
          </div>
          <p>- Approximate expense: ${approximateExpense}</p>
        </div>
        <div className="flex gap-2">
          {editable && (
            <button onClick={handleCancelPlan} className="info-btn sm-btn flex gap-2 items-center">
              Cancel
            </button>
          )}
          <button
            onClick={handleUpdatePlan}
            className={`${editable ? "primary-btn" : "info-btn"} flex gap-2 items-center sm-btn`}
          >
            {editable ? "Update" : "Edit"}
          </button>
        </div>
      </div>
      <div className="my-5 overflow-auto max-h-[calc(100%-70px)] h-full">
        <div>
          {!!currentItinerary?.length &&
            currentItinerary?.map(({ heading, id, plan, isOpen }) => (
              <div key={id}>
                <div
                  className={`w-full ${isOpen ? "" : "cursor-pointer"} p-4`}
                  onClick={() => {
                    if (!isOpen) {
                      toggleAccordion(id);
                    }
                  }}
                >
                  <div className="flex justify-between items-center">
                    <h3>{heading}</h3>
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <DownIcon />
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  layout
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  {isOpen && (
                    <Reorder.Group
                      axis="y"
                      values={plan}
                      className="p-4"
                      onReorder={(newPlan) => handleReorder(newPlan, id)}
                    >
                      {!!plan?.length &&
                        plan.map((item) => {
                          return (
                            <Reorder.Item
                              key={item.id}
                              value={item}
                              className={`mb-5`}
                              dragListener={editable}
                            >
                              <div className="flex gap-3 items-center">
                                {editable && (
                                  <div
                                    className="block cursor-pointer"
                                    onClick={() => handleDelete(id, item.id)}
                                  >
                                    <MinusIcon />
                                  </div>
                                )}
                                <div
                                  className={`flex gap-2 flex-1 ${
                                    editable ? "cursor-pointer" : ""
                                  }`}
                                >
                                  <Image
                                    src={getPlanImage(item?.type) || ""}
                                    alt={item?.title}
                                    className="rounded-lg"
                                    height={110}
                                    width={110}
                                  />
                                  <div className="flex flex-col gap-1">
                                    <p className="text-caption text-primary">{item?.time}</p>
                                    <b>{item?.title}</b>
                                    <p>{item?.description}</p>
                                  </div>
                                </div>
                                {editable && (
                                  <div className="block cursor-pointer">
                                    <DragIcon />
                                  </div>
                                )}
                              </div>
                            </Reorder.Item>
                          );
                        })}
                    </Reorder.Group>
                  )}
                </motion.div>
                <hr />
              </div>
            ))}
        </div>
      </div>
      {openRenameModal && (
        <SaveItineraryModal
          handleClose={handleClose}
          handleSave={handleRenamePlan}
          heading="Rename Itinerary"
          subHeading="Name your trip"
        />
      )}
    </>
  );
};
