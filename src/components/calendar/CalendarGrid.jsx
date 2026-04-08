import { eachDayOfInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import DayCell from "./DayCell";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarGrid({ currentDate, range, notes }) {
  const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });
  const currentMonth = currentDate.getMonth();

  const findDateFromPoint = (x, y) => {
    const element = document.elementFromPoint(x, y);
    const dayElement = element?.closest("[data-date]");
    if (!dayElement) return null;
    return new Date(dayElement.dataset.date);
  };

  const handleTouchMove = (event) => {
    if (!range.isDragging) return;
    const touch = event.touches[0];
    const date = findDateFromPoint(touch.clientX, touch.clientY);
    if (date) range.handleMouseEnter(date);
  };

  const handlePointerMove = (event) => {
    if (!range.isDragging) return;
    const date = findDateFromPoint(event.clientX, event.clientY);
    if (date) range.handleMouseEnter(date);
  };

  return (
    <>
      <div className="grid grid-cols-7 gap-2 mb-2 text-xs font-semibold uppercase tracking-wide">
        {weekdays.map((day, index) => (
          <div
            key={day}
            className={`text-center ${index === 6 ? "text-red-700" : ""}`}
          >
            {day}
          </div>
        ))}
      </div>
      <div
        className="grid grid-cols-7 gap-2"
        onTouchMove={handleTouchMove}
        onPointerMove={handlePointerMove}
        style={{ touchAction: "none" }}
      >
        {days.map((day) => (
          <DayCell
            key={day.toISOString()}
            day={day}
            isCurrentMonth={day.getMonth() === currentMonth}
            isSunday={day.getDay() === 0}
            {...range}
            notes={notes}
          />
        ))}
      </div>
    </>
  );
}