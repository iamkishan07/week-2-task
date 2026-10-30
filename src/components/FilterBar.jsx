import { Search, SlidersHorizontal, X } from "lucide-react";

export default function FilterBar({
  search,
  setSearch,
  priority,
  setPriority,
  status,
  setStatus,
  onClear,
}) {
  const selectClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 sm:w-auto";
  const active = search || priority !== "all" || status !== "all";
  return (
    <div className="mt-6 flex flex-col gap-3 xl:flex-row xl:items-center">
      <div className="relative min-w-0 flex-1">
        <Search
          size={17}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks by title..."
          aria-label="Search tasks by title"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
          >
            <X size={15} />
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:flex">
        <label className="flex items-center gap-2 text-xs text-slate-400">
          <SlidersHorizontal size={15} className="hidden sm:block" />
          <span className="sr-only">Priority filter</span>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={selectClass}
          >
            <option value="all">All priorities</option>
            <option value="High">High priority</option>
            <option value="Medium">Medium priority</option>
            <option value="Low">Low priority</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Status filter</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={selectClass}
          >
            <option value="all">All statuses</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>
      {active && (
        <button
          onClick={onClear}
          className="self-start rounded-lg px-2 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 xl:self-auto"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
