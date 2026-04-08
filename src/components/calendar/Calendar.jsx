import React from "react";
import CalendarGrid from "./CalendarGrid";
import MonthHeader from "./MonthHeader";
import useRangeSelection from "../../hooks/useRangeSelection";

export default function Calendar({ currentDate, onPrevMonth, onNextMonth, onGoToDate, onRangeChange, notes }) {
  const range = useRangeSelection();

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

      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Tap and drag dates to select a range.
        </p>

        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
          <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-mono">←</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-mono">→</kbd>
          <span>Navigate</span>
        </div>

        <div className="flex lg:hidden items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
          <span>Use the buttons above to navigate</span>
        </div>
      </div>

      <CalendarGrid currentDate={currentDate} range={range} notes={notes} />
    </div>
  );
}