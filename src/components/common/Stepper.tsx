import { tripStepper } from "@/constants";
import React from "react";

const Stepper = ({ stepperValue }: { stepperValue: number }) => (
  <div className="flex">
  <div className="w-full">
    <h6 className="text-base font-bold text-primary mb-2 mr-4 md:block hidden">Destination</h6>
    <div className="flex items-center w-full">
      <div
        className="w-8 h-8 shrink-0 mx-[-1px] border-2 border-primary p-1.5 flex items-center justify-center rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-primary" viewBox="0 0 24 24">
          <path
            d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
            data-original="#000000" />
        </svg>
      </div>
      <div className="w-full h-1 bg-primary"></div>
    </div>
  </div>
  <div className="w-full">
    <h6 className="text-base font-bold primary mb-2 mr-4 md:block hidden">Dates</h6>
    <div className="flex items-center w-full">
      <div
        className="w-8 h-8 shrink-0 mx-[-1px] border-2 border-primary p-1.5 flex items-center justify-center rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-primary" viewBox="0 0 24 24">
          <path
            d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
            data-original="#000000" />
        </svg>
      </div>
      <div className="w-full h-1 bg-primary"></div>
    </div>
  </div>
  <div className="w-full">
    <h6 className="text-base font-bold primary mb-2 mr-4 md:block hidden">Trip Type</h6>
    <div className="flex items-center w-full">
      <div
        className="w-8 h-8 shrink-0 mx-[-1px] border-2 border-primary p-1.5 flex items-center justify-center rounded-full">
        <span className="w-3 h-3 bg-primary rounded-full"></span>
      </div>
      <div className="w-full h-1 bg-primary-bg"></div>
    </div>
  </div>
  <div>
    <h6 className="text-base font-bold text-primary-bg w-max mb-2 md:block hidden">Interests</h6>
    <div className="flex items-center">
      <div className="w-8 h-8 shrink-0 mx-[-1px] border-2 p-1.5 flex items-center justify-center rounded-full">
        <span className="text-base text-primary-bg font-bold">4</span>
      </div>
    </div>
  </div>
</div>
);

export default Stepper;
