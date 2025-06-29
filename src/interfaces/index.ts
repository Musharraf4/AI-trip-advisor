import { TourAction } from "@/reducers/TourReducer";
import { StaticImageData } from "next/image";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Range } from "react-date-range";

// * Types

export type TripType = { petsAllowed: boolean, type: TripEnum }
export type DestinationType = { city: string; image: StaticImageData | string; country: string; id: number }
export interface TourType { destination: DestinationType; dateRange: Range[]; trip: TripType; selectedInterests: string[] }
export type TourListingType = { editable: boolean; openRenameModal: boolean; itineraryTitle: string; threadList: ThreadListType[] };

export type ChatType = { message: string; loading: boolean; showChat: boolean; allMessages: { messages: Message[] } | null };
export interface ContentType {
  success: boolean
  message?: string
  city: string
  tripType: string
  approximateExpense: number
  days: number
  itinerary: Itinerary[]
}

export interface Itinerary {
  id: number
  heading: string
  plan: Plan[]
  isOpen?: boolean
}

export interface Plan {
  id: number
  time: string
  title: string
  description: string
  type: string
}

export interface Message {
  id: string
  role: string
  thread_id: string
  created_at: number
  run_id?: string
  content: ContentType | string
}

// local storage / indexedDB threadList type
export interface ThreadListType {
  threadId: string
  title: string
  savedAt: null | string
  createdAt: string
  planDetails: ContentType | string
}

export type ChildProps = {
  children: ReactNode;
}

// * Enums

export enum TripEnum {
  Solo = "solo",
  Partner = "partner",
  Friends = "friends",
  Family = "family",
}

export enum TripTypeEnum {
  Restaurant = "restaurant",
  Hotel = "hotel",
  Place = "place",
}

export enum RoleEnum {
  User = "user",
  Assistant = "assistant",
}

// * Prop Types

export interface TourContextProps {
  state: TourType
  dispatch: Dispatch<TourAction>
}
export interface DestinationProps {
  destination: DestinationType
  isActive: boolean;
  onClick: () => void
}

export interface ChatProps {
  setCurrentItinerary: Dispatch<SetStateAction<Itinerary[] | undefined>>
  threadId: string
}

export interface ChatMessagesProps {
  loading: boolean
  messages?: Message[]
  setCurrentItinerary: Dispatch<SetStateAction<Itinerary[] | undefined>>
}

export type TourListingProps = {
  title?: string
  approximateExpense?: number
  threadId: string
  currentItinerary: Itinerary[]
  initialItineraryState?: Itinerary[]
  setCurrentItinerary: Dispatch<SetStateAction<Itinerary[] | undefined>>
}


export type SaveItineraryModalProps = {
  handleClose: () => void;
  handleSave: (input: string) => void;
  heading: string
  subHeading: string
}

export type ChatHistoryProps = {
  threadId?: string
  disabled?: boolean
}