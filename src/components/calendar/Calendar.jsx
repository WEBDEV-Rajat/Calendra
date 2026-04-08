import React from "react";
import { format } from "date-fns";
import CalendarGrid from "./CalendarGrid";
import MonthHeader from "./MonthHeader";
import useRangeSelection from "../../hooks/useRangeSelection";

export default function Calendar({ currentDate, onPrevMonth, onNextMonth, onGoToDate, onRangeChange, notes }) {
  const range = useRangeSelection();

  const selectionMessage = range.startDate
    ? range.endDate
      ? `Selected ${format(new Date(range.startDate), "MMM d")} → ${format(new Date(range.endDate), "MMM d")}.`
      : `Start selected: ${format(new Date(range.startDate), "MMM d")}. Tap an end date.`
    : "Select dates: tap for start, tap again for end.";

  React.useEffect(() => {
    onRangeChange && onRangeChange(range);
  }, [range.startDate, range.endDate, onRangeChange]);

  return (
    <div className="relative">
      <MonthHeader
        currentDate={currentDate}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
        onGoToDate={onGoToDate}
      />

      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {selectionMessage}
        </p>

        <div className="flex lg:hidden items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
          <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-mono">←</kbd>
          <span>Swipe left/right to navigate</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-mono">→</kbd>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
          <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-mono">←</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-mono">→</kbd>
          <span>Navigate</span>
        </div>
      </div>

      <CalendarGrid currentDate={currentDate} range={range} notes={notes} />
    </div>
  );
}