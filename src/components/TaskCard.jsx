import { CalendarDays, Pencil, Trash2, ArrowRightLeft } from "lucide-react";

const priorityStyles = {
  High: "bg-rose-50 text-rose-700 ring-rose-100",
  Medium: "bg-amber-50 text-amber-700 ring-amber-100",
  Low: "bg-emerald-50 text-emerald-700 ring-emerald-100",
};

const statusOptions = [
  { value: "todo", label: "Todo" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

function formatDate(value) {
  if (!value) return "No due date";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TaskCard({ task, onEdit, onDelete, onMove }) {
  const overdue =
    task.dueDate &&
    new Date(`${task.dueDate}T23:59:59`) < new Date() &&
    task.status !== "completed";
  return (
    <article className="group rounded-xl border border-slate-200/80 bg-white p-4 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="break-words text-sm font-semibold leading-5 text-slate-800">
          {task.title}
        </h3>
        <div className="flex shrink-0 items-center gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
          <button
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
            title="Edit task"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onDelete(task)}
            aria-label={`Delete ${task.title}`}
            title="Delete task"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
      {task.description && (
        <p className="mt-2 line-clamp-3 whitespace-pre-line break-words text-xs leading-5 text-slate-500">
          {task.description}
        </p>
      )}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <span
          className={`rounded-md px-2 py-1 text-[10px] font-bold ring-1 ring-inset ${priorityStyles[task.priority]}`}
        >
          {task.priority} priority
        </span>
        <span
          className={`flex items-center gap-1 text-[10px] ${overdue ? "font-semibold text-rose-600" : "text-slate-400"}`}
        >
          <CalendarDays size={12} />
          {formatDate(task.dueDate)}
          {overdue ? " · Overdue" : ""}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
        <ArrowRightLeft size={13} className="shrink-0 text-slate-400" />
        <label className="sr-only" htmlFor={`move-${task.id}`}>
          Move task status
        </label>
        <select
          id={`move-${task.id}`}
          value={task.status}
          onChange={(e) => onMove(task.id, e.target.value)}
          className="w-full cursor-pointer bg-transparent text-xs font-medium text-slate-500 outline-none"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              Move to: {option.label}
            </option>
          ))}
        </select>
      </div>
    </article>
  );
}
