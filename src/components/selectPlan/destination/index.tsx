import { internationalDestinations, nationalDestinations } from "@/constants";
import { TourContext } from "@/contexts/TourContext";
import { TourActionType } from "@/reducers/TourReducer";
import { useContext, useState } from "react";
import DestinationCard from "./DestinationCard";

export const Destination = () => {
  const { dispatch, state } = useContext(TourContext);
  const { destination } = state;
  const [allDestinations, setAllDestinations] = useState(nationalDestinations);
  const [showNational, setShowNational] = useState(true);

  const handleSelect = (destinationId: number) => {
    const destinationSelectFrom = showNational ? nationalDestinations : internationalDestinations;
    const selectedDestination = destinationSelectFrom.find(({ id }) => destinationId === id);
    selectedDestination &&
      dispatch({
        type: TourActionType.SET_DESTINATION,
        destination: selectedDestination,
      });
  };

  const handleDestinationNationalOrInternational = (isNational: boolean) => {
    // Toggle between national and international destinations
    if (isNational) {
      setAllDestinations(nationalDestinations); // Set national destinations
      setShowNational(true); // Update the state to reflect national selection
      dispatch({
        type: TourActionType.SET_DESTINATION,
        destination: nationalDestinations[0],
      });
    } else {
      setAllDestinations(internationalDestinations); // Set international destinations
      setShowNational(false); // Update the state to reflect international selection
      dispatch({
        type: TourActionType.SET_DESTINATION,
        destination: internationalDestinations[0],
      });
    }
  };

  return (
    <section className="flex justify-around flex-col h-full gap-10">
      <div className="flex items-center justify-center">
        <button
          className={`p-2 rounded-l-xl w-56 ${showNational ? "bg-primary text-white" : "border"} `}
          onClick={() => handleDestinationNationalOrInternational(true)}
          disabled={showNational}
        >
          Domestic
        </button>
        <button
          className={`p-2 rounded-r-xl  w-56 ${
            !showNational ? "bg-primary text-white" : "border"
          } `}
          onClick={() => handleDestinationNationalOrInternational(false)}
          disabled={!showNational}
        >
          International
        </button>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {allDestinations.map((item) => (
          <div key={item.id} className="col-span-12 lg:col-span-3 sm:col-span-6">
            <DestinationCard
              destination={item}
              isActive={destination && destination.id === item.id}
              onClick={() => handleSelect(item.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
