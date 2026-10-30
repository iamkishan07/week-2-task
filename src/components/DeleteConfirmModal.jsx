import { AlertTriangle, X } from "lucide-react";

export default function DeleteConfirmModal({ task, onClose, onConfirm }) {

  if (!task) return null;
  
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[2px]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-rose-50 text-rose-600">
            <AlertTriangle size={21} />
          </div>
          <button
            onClick={onClose}
            aria-label="Close confirmation"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>
        <h2 id="delete-title" className="mt-4 text-lg font-bold text-slate-900">
          Delete this task?
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          “{task.title}” will be permanently removed. This action cannot be
          undone.
        </p>
        <div className="mt-6 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-rose-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
          >
            Delete task
          </button>
        </div>
      </section>
    </div>
  );
}
