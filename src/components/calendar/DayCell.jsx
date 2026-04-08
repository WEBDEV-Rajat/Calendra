import { isSameDay, format, isToday, isWithinInterval } from "date-fns";
import { motion } from "framer-motion";

export default function DayCell({
  day,
  startDate,
  endDate,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
  isInRange,
  notes,
  isCurrentMonth,
  isSunday,
}) {
  const isStart = startDate && isSameDay(day, startDate);
  const isEnd = endDate && isSameDay(day, endDate);
  const isSingleSelected = isStart && !endDate;
  const inRange = isInRange(day);
  const today = isToday(day);

  const dayNotes = notes ? notes.filter((note) => {
    if (note.dateRange) {
      return isWithinInterval(day, {
        start: new Date(note.dateRange.start),
        end: new Date(note.dateRange.end),
      });
    }
    return false;
  }) : [];

  const uniqueCategories = [...new Set(dayNotes.map((note) => note.category))];

  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      data-date={day.toISOString()}
      onMouseDown={() => handleMouseDown(day)}
      onMouseEnter={() => handleMouseEnter(day)}
      onMouseUp={handleMouseUp}
      onPointerDown={() => handleMouseDown(day)}
      onPointerEnter={() => handleMouseEnter(day)}
      onPointerUp={handleMouseUp}
      onTouchStart={() => handleMouseDown(day)}
      onTouchEnd={handleMouseUp}
      style={{ touchAction: "none" }}
      className={`p-2 text-center rounded-lg cursor-pointer select-none relative transition-colors duration-200
        bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100
        ${!isCurrentMonth ? "opacity-40" : ""}
        ${isSunday ? "text-red-500 dark:text-red-400" : ""}
        ${isSingleSelected ? "font-bold ring-2 ring-blue-500" : ""}
        ${isStart && !isSingleSelected ? "font-bold border-2 border-blue-500 shadow-lg" : ""}
        ${isEnd ? "font-bold border-2 border-blue-500 shadow-lg" : ""}
        ${inRange && !isStart && !isEnd ? "border border-blue-300 dark:border-blue-600" : ""}
        ${!inRange && !isStart && !isEnd ? "hover:bg-slate-100 dark:hover:bg-slate-600" : ""}
        ${today ? "ring-2 ring-red-400" : ""}
      `}
    >
      {format(day, "d")}
      {today && (
        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-400 rounded-full" />
      )}
      {uniqueCategories.length > 0 && (
        <div className="absolute top-0.5 right-0.5 flex gap-0.5">
          {uniqueCategories.slice(0, 3).map((cat, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full ${
                cat === "Work" ? "bg-blue-400" :
                cat === "Personal" ? "bg-green-400" :
                cat === "Travel" ? "bg-purple-400" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}