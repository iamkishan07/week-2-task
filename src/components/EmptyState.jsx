import { ClipboardList, Search } from "lucide-react";

export default function EmptyState({ searchActive, onClear, onAdd }) {

  const Icon = searchActive ? Search : ClipboardList;
  
  return (
    <div className="flex min-h-56 flex-col items-center justify-center px-4 py-10 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
        <Icon size={26} />
      </div>
      <h3 className="mt-4 text-base font-bold text-slate-800">
        {searchActive ? "No tasks found" : "Your board is ready"}
      </h3>
      <p className="mt-1 max-w-xs text-sm leading-6 text-slate-500">
        {searchActive
          ? "Try another title or adjust your filters."
          : "Create your first task and start organizing your work."}
      </p>
      {searchActive ? (
        <button
          onClick={onClear}
          className="mt-4 rounded-lg px-3 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
        >
          Clear search and filters
        </button>
      ) : (
        <button
          onClick={onAdd}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          + Create your first task
        </button>
      )}
    </div>
  );
}
