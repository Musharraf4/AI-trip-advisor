import { ContentType, Message, TripEnum, TripTypeEnum } from "@/interfaces";
import { FamilyIcon, FriendsIcon, HeartIcon, SoloIcon } from "@/public/svgs";
import hotelImg from "../public/tripType/hotel.jpg";
import placeImg from "../public/tripType/place.jpg";
import restaurantImg from "../public/tripType/restaurant.jpg";

export const getHeading = (stepperValue: number) => {
  switch (stepperValue) {
    case 0:
      return "Where do you want to go?";
    case 1:
      return "When are you going?";
    case 2:
      return "What kind of trip are you planning?";
    default:
      return "Tell us what you’re interested in";
  }
};

export const getText = (stepperValue: number) => {
  switch (stepperValue) {
    case 0:
      return "Search or get inspired by popular destinations.";
    case 1:
      return "Choose a date range, up to 7 days.";
    case 2:
      return "Select one.";
    default:
      return "Select all that apply.";
  }
};

export const getTripIcon = (tripType: TripEnum, isActive: boolean) => {
  const activeColor = isActive ? "var(--primary)" : "#000";
  switch (tripType) {
    case TripEnum.Solo:
      return <SoloIcon color={activeColor} />;
    case TripEnum.Partner:
      return <HeartIcon color={activeColor} />;
    case TripEnum.Family:
      return <FriendsIcon color={activeColor} />;
    case TripEnum.Friends:
      return <FamilyIcon color={activeColor} />;
    default:
      break;
  }
};

export const capitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getTourListing = (messages: Message[]): ContentType | null => {
  for (let i = messages.length - 1; i >= 0; i--) {
    const { content } = messages[i];
    if (typeof content === "object" && content?.success) {
      return content;
    }
  }
  return null;
};

export const getPlanImage = (type: string) => {
  switch (type) {
    case TripTypeEnum.Place:
      return placeImg;
    case TripTypeEnum.Hotel:
      return hotelImg;
    case TripTypeEnum.Restaurant:
      return restaurantImg;
    default:
      break;
  }
};
