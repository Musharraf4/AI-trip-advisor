"use client";
import SelectPlan from "@/components/selectPlan";
import { TourContextProvider } from "@/contexts/TourContext";

const SelectPlanPage = () => (
  <main>
    <TourContextProvider>
      <SelectPlan />
    </TourContextProvider>
  </main>
);

export default SelectPlanPage;
