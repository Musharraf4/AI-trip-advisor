import { ThreadListType, TourListingType } from "@/interfaces";

export enum TourListingActionType {
  SET_EDITABLE = 'setEditable',
  SET_OPEN_RENAME_MODAL = 'setOpenRenameModal',
  SET_ITINERARY_TITLE = 'setItineraryTitle',
  SET_THREAD_LIST = 'setThreadList',
}
export type TourListingAction =
  | { type: TourListingActionType.SET_EDITABLE; editable: boolean }
  | { type: TourListingActionType.SET_OPEN_RENAME_MODAL; openRenameModal: boolean }
  | { type: TourListingActionType.SET_ITINERARY_TITLE; itineraryTitle: string }
  | { type: TourListingActionType.SET_THREAD_LIST; threadList: ThreadListType[] }

export const tourListingInitialState: TourListingType = {
  editable: false,
  openRenameModal: false,
  itineraryTitle: "",
  threadList: []
};

export const tourListingReducer = (state: TourListingType, action: TourListingAction): TourListingType => {
  switch (action.type) {
    case TourListingActionType.SET_EDITABLE:
      return {
        ...state,
        editable: action.editable,
      };

    case TourListingActionType.SET_OPEN_RENAME_MODAL:
      return {
        ...state,
        openRenameModal: action.openRenameModal,
      };
    case TourListingActionType.SET_ITINERARY_TITLE:
      return {
        ...state,
        itineraryTitle: action.itineraryTitle,
      };
    case TourListingActionType.SET_THREAD_LIST:
      return {
        ...state,
        threadList: action.threadList,
      };
  }
};
