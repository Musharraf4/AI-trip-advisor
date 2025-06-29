"use client";

import { SaveItineraryModalProps } from "@/interfaces";
import { FC, SetStateAction, useState } from "react";
import { Modal } from "./Main";

export const SaveItineraryModal: FC<SaveItineraryModalProps> = ({
  handleClose,
  handleSave,
  heading,
  subHeading,
}) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
    setInputValue(event.target.value);
  };

  return (
    <Modal>
      <div className="border-0 rounded-xl shadow-lg relative flex flex-col bg-white outline-none focus:outline-none w-[600px]">
        {/* Body */}
        <div className="p-4 flex flex-col gap-2">
          <h2 className="text-primary">{heading}</h2>
          <p>{subHeading}</p>
          <div className="my-2">
            <label htmlFor="save-itinerary">
              <h3>Name</h3>
            </label>
            <input
              className="border rounded-lg w-full py-2 px-3 focus:outline-none"
              id="save-itinerary"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-5 items-center justify-end p-6 rounded-b-xl bg-light-bg">
          <button className="info-btn sm-btn" type="button" onClick={handleClose}>
            Close
          </button>
          <button
            disabled={!inputValue?.trim()?.length || inputValue?.trim()?.length > 15}
            className="primary-btn sm-btn disabled:opacity-40"
            type="button"
            onClick={() => {
              handleSave(inputValue);
              setInputValue("");
            }}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};
