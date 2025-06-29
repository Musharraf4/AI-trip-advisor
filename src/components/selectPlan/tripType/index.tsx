import { TourContext } from "@/contexts/TourContext";
import { TripEnum } from "@/interfaces";
import { capitalizeString, getTripIcon } from "@/lib/helper";
import { TourActionType } from "@/reducers/TourReducer";
import { useContext } from "react";

const TripType = () => {
  const { state, dispatch } = useContext(TourContext);
  const { trip } = state;
  const { type, petsAllowed } = trip;

  const handleTrip = (tripType: TripEnum) => {
    dispatch({ type: TourActionType.SET_TRIP, trip: { ...trip, type: tripType } });
  };
  const handlePetsAllowed = (allowed: boolean) => {
    dispatch({
      type: TourActionType.SET_TRIP,
      trip: { ...trip, petsAllowed: allowed },
    });
  };

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-4 my-20">
        {Object.values(TripEnum).map((tripType) => (
          <div
            key={tripType}
            onClick={() => handleTrip(tripType)}
            className={`rounded-lg border-2 flex flex-col gap-2 items-center py-9 cursor-pointer ${
              type === tripType ? "border-primary" : "border-black"
            }`}
          >
            {getTripIcon(tripType, type === tripType)}
            <h3 className={` ${type === tripType ? "text-primary" : ""}`}>
              {capitalizeString(tripType)} Trip
            </h3>
          </div>
        ))}
      </div>
      <div className="flex items-center flex-col gap-2">
        <h3 className=" ">Are you travelling with pets?</h3>
        <div className="flex gap-10">
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              className="accent-primary cursor-pointer"
              name="travel-with-pets"
              id="yes"
              defaultChecked
              checked={petsAllowed}
              onChange={() => handlePetsAllowed(true)}
            />
            <label htmlFor="yes" className="cursor-pointer">
              Yes
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              className="accent-primary cursor-pointer"
              name="travel-with-pets"
              id="no"
              checked={!petsAllowed}
              onChange={() => handlePetsAllowed(false)}
            />
            <label htmlFor="no" className="cursor-pointer">
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripType;
