import { SaveItineraryModal } from "@/components/common/modals/SaveItineraryModal";
import { allInterestsData } from "@/constants";
import { TourContext } from "@/contexts/TourContext";
import { PlusIcon } from "@/public/svgs";
import { TourActionType } from "@/reducers/TourReducer";
import { useContext, useState } from "react";

const Interests = () => {
  const { state, dispatch } = useContext(TourContext);
  const { selectedInterests } = state;
  const [allInterests, setAllInterests] = useState(allInterestsData);
  const [showInterestModal, setShowInterestModal] = useState(false);

  const handleSelectInterests = (interest: string) => {
    dispatch({
      type: TourActionType.SET_SELECTED_INTERESTS,
      selectedInterests: selectedInterests.includes(interest)
        ? selectedInterests.filter((i) => i !== interest)
        : [...selectedInterests, interest],
    });
  };

  const handleClose = () => setShowInterestModal(false);

  const handleAddInterest = (input: string) => {
    setAllInterests((prevInterests) => [...prevInterests, input]);
    setShowInterestModal(false);
  };

  return (
    <div className="flex items-center h-full">
      <div className="flex flex-wrap gap-4 items-center">
        {allInterests.map((interest) => (
          <p
            key={interest}
            className={`interests-tag border ${
              selectedInterests.includes(interest) ? "text-primary border-primary" : "border-black"
            }`}
            onClick={() => handleSelectInterests(interest)}
          >
            {interest}
          </p>
        ))}
        <p
          className="interests-tag flex items-center gap-1 border border-black cursor-pointer"
          onClick={() => setShowInterestModal(true)}
        >
          <PlusIcon />
          Add Interest
        </p>
      </div>
      {showInterestModal && (
        <SaveItineraryModal
          handleClose={handleClose}
          handleSave={handleAddInterest}
          heading="Add Interest"
          subHeading="Interest"
        />
      )}
    </div>
  );
};

export default Interests;
