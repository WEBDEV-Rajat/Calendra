import { differenceInDays, format, isSameMonth } from "date-fns";

export default function InsightsPanel({ selectedRange, notes, currentDate }) {
  const selectedDays =
    selectedRange?.startDate && selectedRange?.endDate
      ? differenceInDays(new Date(selectedRange.endDate), new Date(selectedRange.startDate)) + 1
      : 0;

  const monthNotes = (notes ?? []).filter((note) => {
    if (note.dateRange) {
      return (
        isSameMonth(new Date(note.dateRange.start), currentDate) ||
        isSameMonth(new Date(note.dateRange.end), currentDate)
      );
    }
    return false;
  });

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-3 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold mb-2">Insights</h3>
      <div className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
        <div>{selectedDays} days selected</div>
        <div>{monthNotes.length} notes this month</div>
        {selectedRange?.startDate && (
          <div>
            {format(new Date(selectedRange.startDate), "MMM d")} –{" "}
            {format(new Date(selectedRange.endDate), "MMM d")}
          </div>
        )}
      </div>
    </div>
  );
}