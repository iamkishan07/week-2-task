import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, CalendarDays } from "lucide-react";

const today = new Date().toLocaleDateString("en-CA");

export default function TaskModal({ open, task, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
      status: "todo",
    },
  });

  useEffect(() => {
    if (open)
      reset(
        task
          ? { ...task }
          : {
              title: "",
              description: "",
              priority: "Medium",
              dueDate: "",
              status: "todo",
            },
      );
  }, [open, task, reset]);
  useEffect(() => {
    if (!open) return;
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);
  if (!open) return null;
  const fieldClass = (error) =>
    `mt-1.5 w-full rounded-xl border bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 ${error ? "border-rose-300" : "border-slate-200"}`;
  const submit = (values) =>
    onSubmit({
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
    });
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        className="max-h-[94vh] w-full overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl sm:max-w-lg sm:rounded-2xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="task-modal-title"
              className="text-xl font-bold tracking-tight text-slate-900"
            >
              {task ? "Edit task" : "Create new task"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {task
                ? "Make changes to your task details."
                : "Add a task and keep your work moving."}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={19} />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(submit)}
          className="mt-6 space-y-4"
          noValidate
        >
          <div>
            <label
              className="text-xs font-semibold text-slate-700"
              htmlFor="task-title"
            >
              Task title <span className="text-rose-500">*</span>
            </label>
            <input
              id="task-title"
              autoFocus
              placeholder="e.g. Design the landing page"
              className={fieldClass(errors.title)}
              maxLength={100}
              {...register("title", {
                required: "Task title is required.",
                validate: (v) => !!v.trim() || "Please enter a task title.",
                maxLength: {
                  value: 100,
                  message: "Use 100 characters or fewer.",
                },
              })}
            />
            {errors.title && (
              <p role="alert" className="mt-1.5 text-xs text-rose-600">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="text-xs font-semibold text-slate-700"
              htmlFor="task-description"
            >
              Description{" "}
              <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              id="task-description"
              rows={3}
              placeholder="Add a few details about this task..."
              maxLength={500}
              className={`${fieldClass(false)} resize-y`}
              {...register("description", {
                maxLength: {
                  value: 500,
                  message: "Use 500 characters or fewer.",
                },
              })}
            />
            {errors.description && (
              <p role="alert" className="mt-1.5 text-xs text-rose-600">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                className="text-xs font-semibold text-slate-700"
                htmlFor="task-priority"
              >
                Priority
              </label>
              <select
                id="task-priority"
                className={fieldClass(false)}
                {...register("priority", { required: true })}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label
                className="text-xs font-semibold text-slate-700"
                htmlFor="task-due-date"
              >
                Due date
              </label>
              <div className="relative">
                <input
                  id="task-due-date"
                  type="date"
                  min={today}
                  className={`${fieldClass(false)} pr-2`}
                  {...register("dueDate")}
                />
                <CalendarDays
                  size={15}
                  className="pointer-events-none absolute right-3 top-4 text-slate-400"
                />
              </div>
            </div>
          </div>
          {task && (
            <div>
              <label
                className="text-xs font-semibold text-slate-700"
                htmlFor="task-status"
              >
                Status
              </label>
              <select
                id="task-status"
                className={fieldClass(false)}
                {...register("status")}
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}
          <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              disabled={isSubmitting}
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {task ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
