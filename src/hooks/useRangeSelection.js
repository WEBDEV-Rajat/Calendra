import { useState, useEffect } from "react";
import { isAfter, isBefore, isSameDay } from "date-fns";

export default function useRangeSelection() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      return;
    }

    if (isSameDay(date, startDate)) {
      setEndDate(startDate);
      return;
    }

    if (isAfter(date, startDate)) {
      setEndDate(date);
    } else {
      setEndDate(startDate);
      setStartDate(date);
    }
  };

  const isInRange = (day) => {
    if (!startDate) return false;
    if (endDate) {
      return (
        (isAfter(day, startDate) || isSameDay(day, startDate)) &&
        (isBefore(day, endDate) || isSameDay(day, endDate))
      );
    }
    return false;
  };

  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return {
    startDate,
    endDate,
    handleClick,
    clearSelection,
    isInRange,
  };
}