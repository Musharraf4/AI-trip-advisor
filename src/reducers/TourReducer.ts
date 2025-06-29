import { nationalDestinations } from "@/constants";
import { TripEnum } from "@/interfaces";
import { DestinationType, TourType, TripType } from "@/interfaces";
import { addDays } from "date-fns";
import { Range } from "react-date-range";

export const tourInitialState: TourType = {
  destination: nationalDestinations[0],
  dateRange: [
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ],
  trip: { type: TripEnum.Solo, petsAllowed: false },
  selectedInterests: [],
};

export enum TourActionType {
  SET_DESTINATION = 'setDestination',
  SET_DATE_RANGE = 'setDateRange',
  SET_TRIP = 'setTrip',
  SET_SELECTED_INTERESTS = 'setSelectedInterests',
}

export type TourAction =
  | { type: TourActionType.SET_DESTINATION; destination: DestinationType }
  | { type: TourActionType.SET_DATE_RANGE; dateRange: Range[] }
  | { type: TourActionType.SET_TRIP; trip: TripType }
  | { type: TourActionType.SET_SELECTED_INTERESTS; selectedInterests: string[] }

export const tourReducer = (state: TourType, action: TourAction): TourType => {
  switch (action.type) {
    case TourActionType.SET_DESTINATION:
      return {
        ...state,
        destination: action.destination,
      };

    case TourActionType.SET_DATE_RANGE:
      return {
        ...state,
        dateRange: action.dateRange,
      };
    case TourActionType.SET_TRIP:
      return {
        ...state,
        trip: action.trip,
      };
    case TourActionType.SET_SELECTED_INTERESTS:
      return {
        ...state,
        selectedInterests: action.selectedInterests,
      };
  }
};
