import { useState, useEffect } from "react";
import { isAfter, isBefore, isSameDay } from "date-fns";

export default function useRangeSelection() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (date) => {
    setStartDate(date);
    setEndDate(null);
    setHoverDate(date);
    setIsDragging(true);
  };

  const handleMouseEnter = (date) => {
    if (isDragging) {
      setHoverDate(date);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    if (hoverDate && startDate) {
      if (isSameDay(hoverDate, startDate)) {
        setEndDate(startDate);
      } else if (isAfter(hoverDate, startDate)) {
        setEndDate(hoverDate);
      } else if (isBefore(hoverDate, startDate)) {
        setEndDate(startDate);
        setStartDate(hoverDate);
      }
    }

    setIsDragging(false);
  };

  useEffect(() => {
    const handleWindowMouseUp = () => {
      if (isDragging) handleMouseUp();
    };

    window.addEventListener("mouseup", handleWindowMouseUp);
    window.addEventListener("touchend", handleWindowMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleWindowMouseUp);
      window.removeEventListener("touchend", handleWindowMouseUp);
    };
  }, [isDragging, hoverDate, startDate]);

  const isInRange = (day) => {
    if (!startDate) return false;
    if (endDate) {
      return (
        (isAfter(day, startDate) || isSameDay(day, startDate)) &&
        (isBefore(day, endDate) || isSameDay(day, endDate))
      );
    }
    if (hoverDate && isDragging) {
      const tempEnd = isAfter(hoverDate, startDate) ? hoverDate : startDate;
      const tempStart = isBefore(hoverDate, startDate) ? hoverDate : startDate;
      return (
        (isAfter(day, tempStart) || isSameDay(day, tempStart)) &&
        (isBefore(day, tempEnd) || isSameDay(day, tempEnd))
      );
    }
    return false;
  };

  return {
    startDate,
    endDate,
    hoverDate,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    isInRange,
  };
}