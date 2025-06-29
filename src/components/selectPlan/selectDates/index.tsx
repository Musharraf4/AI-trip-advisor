import { LimitDaysModal } from "@/components/common/modals/LimitDaysModal";
import { TourContext } from "@/contexts/TourContext";
import { TourActionType } from "@/reducers/TourReducer";
import { useContext, useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./dateRangeStyle.css";

export const SelectDates = () => {
  const { state, dispatch } = useContext(TourContext);
  const { dateRange } = state;
  // State to handle modal visibility
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (item: RangeKeyDict) => {
    const { startDate, endDate } = item.selection;
    if (endDate && startDate) {
      // Calculate the difference in time and convert it to days
      const timeDiff = endDate.getTime() - startDate.getTime();
      const daysSelected = timeDiff / (1000 * 3600 * 24); // Convert time difference from milliseconds to days

      // Restrict the selection to a maximum of 7 days
      if (daysSelected <= 7) {
        dispatch({ type: TourActionType.SET_DATE_RANGE, dateRange: [item.selection] });
      } else {
        setIsOpen(true);
      }
    }
  };

  const closeModal = () => setIsOpen(false);

  return (
    <div className="w-full text-center my-28">
      <div className="mb-16">
        <DateRangePicker
          onChange={handleDateChange}
          moveRangeOnFirstSelection={false}
          showMonthAndYearPickers={false}
          showMonthArrow={true}
          showDateDisplay={false}
          months={2}
          ranges={dateRange}
          direction="horizontal"
          staticRanges={[]}
          rangeColors={["var(--primary)"]}
          inputRanges={[]}
          minDate={new Date()}
        />
      </div>
     {isOpen && <LimitDaysModal onClose={closeModal} />}
    </div>
  );
};
