import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Sparkles,
  ListTodo,
  CircleDashed,
  CheckCircle2,
} from "lucide-react";
import { addTask, updateTask, deleteTask, moveTask } from "../store/tasksSlice";
import FilterBar from "../components/FilterBar";
import KanbanColumn from "../components/KanbanColumn";
import TaskModal from "../components/TaskModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import EmptyState from "../components/EmptyState";

const columns = ["todo", "in-progress", "completed"];

export default function BoardPage() {
  const tasks = useSelector((state) => state.tasks.items);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("all");
  const [status, setStatus] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [initialStatus, setInitialStatus] = useState("todo");
  const [deletingTask, setDeletingTask] = useState(null);
  const filtered = useMemo(
    () =>
      tasks.filter((task) => {
        const matchesSearch = task.title
          .toLowerCase()
          .includes(search.trim().toLowerCase());
        return (
          matchesSearch &&
          (priority === "all" || task.priority === priority) &&
          (status === "all" || task.status === status)
        );
      }),
    [tasks, search, priority, status],
  );
  const counts = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };
  const openAdd = (newStatus = "todo") => {
    setEditingTask(null);
    setInitialStatus(newStatus);
    setModalOpen(true);
  };
  const openEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };
  const submitTask = (values) => {
    if (editingTask) dispatch(updateTask({ ...values, id: editingTask.id }));
    else dispatch(addTask({ ...values, status: initialStatus }));
    setModalOpen(false);
    setEditingTask(null);
  };
  const clearFilters = () => {
    setSearch("");
    setPriority("all");
    setStatus("all");
  };
  const isFiltering = Boolean(search || priority !== "all" || status !== "all");
  const stats = [
    {
      label: "Total tasks",
      value: counts.total,
      Icon: ListTodo,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "In progress",
      value: counts.inProgress,
      Icon: CircleDashed,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Completed",
      value: counts.completed,
      Icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];
  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
            <Sparkles size={12} /> Your workspace
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Tasks <span className="text-slate-300">.</span>
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Plan your work. Make progress. Get things done.
          </p>
        </div>
        <button
          onClick={() => openAdd()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
        >
          <Plus size={17} /> Add task
        </button>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map(({ label, value, Icon, color }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-soft"
          >
            <div
              className={`grid h-10 w-10 place-items-center rounded-xl ${color}`}
            >
              <Icon size={19} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">{label}</p>
              <p className="mt-0.5 text-xl font-bold text-slate-900">{value}</p>
            </div>
          </div>
        ))}
      </div>
      <FilterBar
        search={search}
        setSearch={setSearch}
        priority={priority}
        setPriority={setPriority}
        status={status}
        setStatus={setStatus}
        onClear={clearFilters}
      />
      {tasks.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white">
          <EmptyState onAdd={() => openAdd()} searchActive={false} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white">
          <EmptyState
            searchActive={isFiltering}
            onClear={clearFilters}
            onAdd={() => openAdd()}
          />
        </div>
      ) : (
        <>
          <div className="mb-3 mt-6 flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500">
              {isFiltering
                ? `Showing ${filtered.length} of ${tasks.length} tasks`
                : "Your board"}
            </p>
            <p className="hidden text-xs text-slate-400 sm:block">
              Keep moving one task at a time
            </p>
          </div>
          <div className="grid items-start gap-4 lg:grid-cols-3">
            {columns.map((column) => (
              <KanbanColumn
                key={column}
                status={column}
                tasks={filtered.filter((task) => task.status === column)}
                onAdd={openAdd}
                onEdit={openEdit}
                onDelete={setDeletingTask}
                onMove={(id, newStatus) =>
                  dispatch(moveTask({ id, status: newStatus }))
                }
              />
            ))}
          </div>
        </>
      )}
      <p className="mt-6 text-center text-[11px] text-slate-400">
        Your tasks are saved automatically on this device.
      </p>
      <TaskModal
        open={modalOpen}
        task={editingTask}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={submitTask}
      />
      <DeleteConfirmModal
        task={deletingTask}
        onClose={() => setDeletingTask(null)}
        onConfirm={() => {
          dispatch(deleteTask(deletingTask.id));
          setDeletingTask(null);
        }}
      />
    </div>
  );
}
