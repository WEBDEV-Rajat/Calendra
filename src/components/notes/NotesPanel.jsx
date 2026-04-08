import { useState } from "react";
import { format, isSameMonth } from "date-fns";

const categories = [
  { name: "Work", color: "blue" },
  { name: "Personal", color: "green" },
  { name: "Travel", color: "purple" },
];

export default function NotesPanel({ selectedRange, notes, onNotesChange, currentDate }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Personal");
  const [search, setSearch] = useState("");

  const addNote = () => {
    if (!text.trim()) return;
    const newNote = {
      id: Date.now(),
      text,
      category,
      dateRange:
        selectedRange?.startDate && selectedRange?.endDate
          ? { start: selectedRange.startDate, end: selectedRange.endDate }
          : null,
    };
    onNotesChange([...notes, newNote]);
    setText("");
  };

  const deleteNote = (id) => {
    onNotesChange(notes.filter((n) => n.id !== id));
  };

  const isSearching = search.trim().length > 0;

  const filteredNotes = (notes ?? []).filter((note) => {
    const matchesSearch =
      note.text.toLowerCase().includes(search.toLowerCase()) ||
      note.category.toLowerCase().includes(search.toLowerCase());

    if (isSearching) return matchesSearch;

    if (note.dateRange) {
      const start = new Date(note.dateRange.start);
      const end = new Date(note.dateRange.end);
      return (
        isSameMonth(start, currentDate) ||
        isSameMonth(end, currentDate) ||
        (start <= currentDate && end >= currentDate)
      );
    }
    return true;
  });

  const getCategoryColor = (cat) =>
    categories.find((c) => c.name === cat)?.color ?? "gray";

  const spansOtherMonths = (note) => {
    if (!note.dateRange) return false;
    return !isSameMonth(new Date(note.dateRange.start), new Date(note.dateRange.end));
  };

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-3 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Notes</h3>
        {!isSearching ? (
          <span className="text-xs text-slate-400">{format(currentDate, "MMMM")}</span>
        ) : (
          <span className="text-xs text-blue-500">searching all months</span>
        )}
      </div>

      <input
        type="text"
        placeholder="Search all notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 rounded mb-2 text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 rounded mb-2 text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
      >
        {categories.map((cat) => (
          <option key={cat.name} value={cat.name}>{cat.name}</option>
        ))}
      </select>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a note..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) addNote();
        }}
        className="w-full p-2 rounded mb-2 text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
        rows={3}
      />

      <button
        onClick={addNote}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1.5 rounded mb-4 text-sm font-medium transition-colors"
      >
        Add Note
      </button>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filteredNotes.length === 0 && (
          <p className="text-xs text-slate-400 text-center py-4">
            {isSearching ? "No notes match your search." : "No notes for this month yet."}
          </p>
        )}
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`p-2 rounded-lg border-l-4 border-${getCategoryColor(note.category)}-400 bg-slate-50 dark:bg-slate-800 transition-colors duration-200`}
          >
            <div className="flex items-start justify-between gap-1">
              <div className="flex-1 min-w-0">
                <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-0.5">
                  <span className="font-medium text-slate-500 dark:text-slate-400">{note.category}</span>
                  {note.dateRange && (
                    <>
                      <span>·</span>
                      <span>
                        {format(new Date(note.dateRange.start), "MMM d")} –{" "}
                        {format(new Date(note.dateRange.end), "MMM d")}
                      </span>
                      {spansOtherMonths(note) && (
                        <span className="text-purple-400 text-[10px]">multi-month</span>
                      )}
                    </>
                  )}
                </div>
                <div className="text-sm text-slate-800 dark:text-slate-100">{note.text}</div>
              </div>
              <button
                onClick={() => deleteNote(note.id)}
                className="text-slate-300 hover:text-red-400 transition-colors text-xs shrink-0 mt-0.5"
                title="Delete note"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}