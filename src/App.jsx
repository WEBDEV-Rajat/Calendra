import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Calendar from "./components/calendar/Calendar";
import HeroImage from "./components/layout/HeroImage";
import InsightsPanel from "./components/layout/InsightsPanel";
import NotesPanel from "./components/notes/NotesPanel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon} from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [flipDirection, setFlipDirection] = useState(0);
  const [selectedRange, setSelectedRange] = useState(null);
  const [notes, setNotes] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    if (darkMode) root.classList.add("dark");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const stored = localStorage.getItem("notes");
    if (stored) setNotes(JSON.parse(stored));
  }, []);

  const handleRangeChange = (range) => setSelectedRange(range);

  const handleNotesChange = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  const goPreviousMonth = () => {
    setFlipDirection(-1);
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  };

  const goNextMonth = () => {
    setFlipDirection(1);
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  };

  const goToDate = (date) => {
    const diff =
      (date.getFullYear() - currentDate.getFullYear()) * 12 +
      (date.getMonth() - currentDate.getMonth());
    setFlipDirection(diff >= 0 ? 1 : -1);
    setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;
      if (e.key === "ArrowLeft") goPreviousMonth();
      if (e.key === "ArrowRight") goNextMonth();
      if (e.key === "t" || e.key === "T") goToDate(new Date());
      if (e.key === "d" || e.key === "D") setDarkMode((v) => !v);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className="min-h-screen p-4 md:p-8 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex items-start justify-center transition-colors duration-300"
    >
      <div className="w-full max-w-3xl relative">

        <div className="absolute -top-1 right-0 z-10">
          <button
            onClick={() => setDarkMode((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors duration-200 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm"
          >
            {darkMode ? <FontAwesomeIcon icon={faSun} size="2x" /> : <FontAwesomeIcon icon={faMoon} size="2x" /> }
          </button>
        </div>

        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-3 flex flex-col items-center">
          <div className="w-16 h-3 rounded-full bg-slate-300 dark:bg-slate-600 shadow-inner" />
          <div className="mt-1 w-2 h-2 rounded-full bg-slate-500 dark:bg-slate-400" />
        </div>

        <div style={{ perspective: 1400 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDate.toISOString()}
              initial={{ rotateX: flipDirection > 0 ? -90 : 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: flipDirection > 0 ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d", transformOrigin: "center top" }}
            >
              <div className="mt-10 bg-white dark:bg-slate-800 rounded-4xl border border-slate-200 dark:border-slate-700 shadow-[0_35px_80px_rgba(15,23,42,0.12)] dark:shadow-[0_35px_80px_rgba(0,0,0,0.4)] overflow-hidden transition-colors duration-300">
                <HeroImage currentDate={currentDate} />

                <div className="grid md:grid-cols-[1fr_220px] gap-4 p-4 md:p-6">
                  <div>
                    <Calendar
                      currentDate={currentDate}
                      onPrevMonth={goPreviousMonth}
                      onNextMonth={goNextMonth}
                      onGoToDate={goToDate}
                      onRangeChange={handleRangeChange}
                      notes={notes}
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <InsightsPanel
                      selectedRange={selectedRange}
                      notes={notes}
                      currentDate={currentDate}
                    />
                    <NotesPanel
                      selectedRange={selectedRange}
                      notes={notes}
                      onNotesChange={handleNotesChange}
                      currentDate={currentDate}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}