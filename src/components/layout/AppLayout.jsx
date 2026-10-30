import { NavLink, Outlet } from "react-router-dom";
import {
  CheckSquare,
  LayoutDashboard,
  ChartNoAxesCombined,
  PanelLeftClose,
  Menu,
  X,
  Sun,
  Moon,
  Pencil,
  Check,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import { updateName } from "../../store/profileSlice";

export default function AppLayout() {
  const theme = useSelector((state) => state.theme);
  const profileName = useSelector((state) => state.profile.name);
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(profileName);

  const saveName = () => {
    const name = nameDraft.trim();
    if (name) dispatch(updateName(name));
    else setNameDraft(profileName);
    setEditingName(false);
  };

  const cancelNameEdit = () => {
    setNameDraft(profileName);
    setEditingName(false);
  };

  const initials = profileName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const themeButton = (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="theme-toggle inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
      <span>{theme === "light" ? "Dark theme" : "Light theme"}</span>
    </button>
  );

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
      isActive
        ? "bg-indigo-50 text-indigo-700"
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    }`;

  const sidebar = (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 py-2">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
          <CheckSquare size={21} />
        </div>

        <div>
          <p className="text-lg font-bold tracking-tight text-slate-900">
            TaskFlow
          </p>
          <p className="text-xs text-slate-400">Work, organized.</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-9">
        <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">
          Workspace
        </p>

        <nav className="space-y-1">
          <NavLink
            to="/"
            end
            className={navClass}
            onClick={() => setMobileOpen(false)}
          >
            <LayoutDashboard size={18} />
            Kanban Board
          </NavLink>

          <NavLink
            to="/progress"
            className={navClass}
            onClick={() => setMobileOpen(false)}
          >
            <ChartNoAxesCombined size={18} />
            Progress
          </NavLink>
        </nav>
      </div>

      {/* Workspace note */}
      <div className="mt-auto rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <p className="text-xs font-semibold text-slate-700">Your workspace</p>
        </div>

        <p className="text-xs leading-5 text-slate-500">
          A little progress every day adds up.
        </p>
      </div>

      {/* Theme toggle */}
      <div className="mt-4">{themeButton}</div>

      {/* User profile */}
      <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
          {initials}
        </div>

        {editingName ? (
          <form
            className="flex min-w-0 flex-1 items-center gap-1"
            onSubmit={(event) => {
              event.preventDefault();
              saveName();
            }}
          >
            <input
              autoFocus
              value={nameDraft}
              onChange={(event) => setNameDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") cancelNameEdit();
              }}
              maxLength={40}
              aria-label="Your name"
              className="min-w-0 flex-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-sm font-semibold text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
            <button type="submit" aria-label="Save name" title="Save name" className="rounded-md p-1.5 text-emerald-600 hover:bg-emerald-50">
              <Check size={15} />
            </button>
            <button type="button" onClick={cancelNameEdit} aria-label="Cancel name edit" title="Cancel" className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100">
              <X size={15} />
            </button>
          </form>
        ) : (
          <div className="group/profile flex min-w-0 flex-1 items-center justify-between gap-1">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">{profileName}</p>
              <p className="text-xs text-slate-400">Personal workspace</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setNameDraft(profileName);
                setEditingName(true);
              }}
              aria-label="Edit your name"
              title="Edit name"
              className="rounded-md p-1.5 text-slate-400 opacity-100 transition hover:bg-indigo-50 hover:text-indigo-600 sm:opacity-0 sm:group-hover/profile:opacity-100"
            >
              <Pencil size={14} />
            </button>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div
      data-theme={theme}
      className="app-shell min-h-screen bg-slate-50 md:flex"
    >
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200/80 bg-white px-5 py-6 md:flex">
        {sidebar}
      </aside>

      {/* Mobile header */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white">
            <CheckSquare size={19} />
          </div>
          <span className="font-bold text-slate-900">TaskFlow</span>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-slate-950/50"
            onClick={() => setMobileOpen(false)}
          />

          <aside className="absolute inset-y-0 left-0 flex w-[min(82vw,300px)] flex-col border-r border-slate-200 bg-white p-5 shadow-xl">
            {sidebar}

            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              aria-label="Close sidebar"
            >
              <PanelLeftClose size={18} />
            </button>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="min-w-0 flex-1 md:ml-64">
        <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
