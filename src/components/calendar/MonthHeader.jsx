import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

export default function MonthHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onGoToDate
}) {
  const [showPicker, setShowPicker] = useState(false);
  const [pickerYear, setPickerYear] = useState(currentDate.getFullYear());

  const handleMonthSelect = (monthIndex) => {
    const newDate = new Date(pickerYear, monthIndex, 1);
    onGoToDate(newDate);
    setShowPicker(false);
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center text-slate-900 dark:text-slate-100">
        
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onPrevMonth}
          className="p-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 rounded-full shadow-sm transition-colors"
        >
          <FontAwesomeIcon icon={faChevronLeft}/>
        </motion.button>

        <div className="text-center relative">
          <div className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400 mb-0.5">
            Wall Calendar
          </div>

          <button
            onClick={() => {
              setPickerYear(currentDate.getFullYear());
              setShowPicker((v) => !v);
            }}
            className="text-2xl font-serif font-semibold tracking-tight hover:text-slate-500 dark:hover:text-slate-300 transition-colors"
          >
            {format(currentDate, "MMMM yyyy")}
            <span className="ml-1.5 text-base text-slate-400">▾</span>
          </button>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onNextMonth}
          className="p-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 rounded-full shadow-sm transition-colors"
        >
          <FontAwesomeIcon icon={faChevronRight}/>
        </motion.button>
      </div>

      <AnimatePresence>
        {showPicker && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowPicker(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute left-1/2 -translate-x-1/2 z-20 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-4 w-72"
            >
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => setPickerYear((y) => y - 1)}
                  className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm transition-colors"
                >
                  <FontAwesomeIcon icon={faChevronLeft}/>
                </button>

                <span className="font-semibold text-slate-800 dark:text-slate-100">
                  {pickerYear}
                </span>

                <button
                  onClick={() => setPickerYear((y) => y + 1)}
                  className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm transition-colors"
                >
                  <FontAwesomeIcon icon={faChevronRight}/>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {MONTHS.map((month, index) => {
                  const isSelected =
                    index === currentDate.getMonth() &&
                    pickerYear === currentDate.getFullYear();

                  const isThisMonth =
                    index === new Date().getMonth() &&
                    pickerYear === new Date().getFullYear();

                  return (
                    <button
                      key={month}
                      onClick={() => handleMonthSelect(index)}
                      className={`py-1.5 rounded-lg text-sm transition-colors
                        ${
                          isSelected
                            ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold"
                            : isThisMonth
                            ? "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 font-medium"
                            : "hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                        }`}
                    >
                      {month.slice(0, 3)}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}