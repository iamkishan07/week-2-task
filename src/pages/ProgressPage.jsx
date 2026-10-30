import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  CircleDashed,
  Target,
} from "lucide-react";


export default function ProgressPage() {
  const tasks = useSelector((state) => state.tasks.items);
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "completed").length;
  const inProgress = tasks.filter(
    (task) => task.status === "in-progress",
  ).length;
  const todo = tasks.filter((task) => task.status === "todo").length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const stats = [
    {
      label: "Todo",
      count: todo,
      Icon: Circle,
      color: "bg-slate-100 text-slate-600",
      bar: "bg-slate-400",
    },
    {
      label: "In Progress",
      count: inProgress,
      Icon: CircleDashed,
      color: "bg-indigo-50 text-indigo-600",
      bar: "bg-indigo-500",
    },
    {
      label: "Completed",
      count: completed,
      Icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
      bar: "bg-emerald-500",
    },
  ];
  return (
    <div className="mx-auto max-w-4xl">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600"
      >
        <ArrowLeft size={16} /> Back to board
      </Link>
      <div className="mt-6">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
          <Target size={12} /> Overview
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Your progress
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          A quick look at what you’ve accomplished.
        </p>
      </div>
      <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Overall completion
            </p>
            <p className="mt-2 text-5xl font-bold tracking-tight text-slate-900">
              {percent}
              <span className="text-2xl text-slate-400">%</span>
            </p>
            <p className="mt-2 text-sm text-slate-500">
              {completed} of {total} tasks completed
            </p>
          </div>
          <div
            className="grid h-32 w-32 place-items-center self-center rounded-full sm:mr-8"
            style={{
              background: `conic-gradient(#6366f1 ${percent * 3.6}deg, #eef2ff 0deg)`,
            }}
          >
            <div className="grid h-24 w-24 place-items-center rounded-full bg-white">
              <Target size={30} className="text-indigo-600" />
            </div>
          </div>
        </div>
        <div className="mt-7 h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </section>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, count, Icon, color, bar }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div
                className={`grid h-10 w-10 place-items-center rounded-xl ${color}`}
              >
                <Icon size={19} />
              </div>
              <span className="text-2xl font-bold text-slate-900">{count}</span>
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-700">{label}</p>
            <div className="mt-3 h-1.5 rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${bar}`}
                style={{ width: `${total ? (count / total) * 100 : 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
        <p className="text-sm font-semibold text-indigo-900">
          {total === 0
            ? "Start with one small task."
            : percent === 100
              ? "Amazing work — everything is complete!"
              : "Keep your momentum going."}
        </p>
        <p className="mt-1 text-sm leading-6 text-indigo-800/80">
          {total === 0
            ? "Add a task to your board to start tracking progress."
            : percent === 100
              ? "You’ve completed every task on your board."
              : "Move tasks across your board as you make progress. Every completed task counts."}
        </p>
        <Link
          to="/"
          className="mt-3 inline-flex text-sm font-semibold text-indigo-700 hover:text-indigo-900"
        >
          Go to Kanban board →
        </Link>
      </div>
    </div>
  );
}
