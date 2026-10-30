import { Circle, CircleDashed, CheckCircle2, Plus } from "lucide-react";
import TaskCard from "./TaskCard";

const config = {
  todo: {
    title: "Todo",
    Icon: Circle,
    iconClass: "text-slate-500",
    dot: "bg-slate-400",
  },
  "in-progress": {
    title: "In Progress",
    Icon: CircleDashed,
    iconClass: "text-indigo-600",
    dot: "bg-indigo-500",
  },
  completed: {
    title: "Completed",
    Icon: CheckCircle2,
    iconClass: "text-emerald-600",
    dot: "bg-emerald-500",
  },
};
export default function KanbanColumn({
  status,
  tasks,
  onAdd,
  onEdit,
  onDelete,
  onMove,
}) {
  const { title, Icon, iconClass, dot } = config[status];
  return (
    <section className="flex min-h-[300px] min-w-0 flex-col rounded-2xl border border-slate-200/80 bg-slate-100/70 p-3 sm:p-4">
      <div className="mb-4 flex items-center justify-between gap-2 px-1">
        <div className="flex min-w-0 items-center gap-2">
          <Icon size={17} className={iconClass} />
          <h2 className="truncate text-sm font-bold text-slate-800">{title}</h2>
          <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 ring-1 ring-slate-200">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAdd(status)}
          aria-label={`Add task to ${title}`}
          title={`Add task to ${title}`}
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white hover:text-indigo-600"
        >
          <Plus size={17} />
        </button>
      </div>
      <div className="mb-3 h-0.5 w-full rounded-full bg-slate-200">
        <div className={`h-full w-1/3 rounded-full ${dot}`} />
      </div>
      <div className="custom-scrollbar flex flex-1 flex-col gap-3">
        {tasks.length ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-300/90 px-3 py-8 text-center text-xs leading-5 text-slate-400">
            No tasks here yet.
            <br />
            Add one to get started.
          </div>
        )}
      </div>
    </section>
  );
}
