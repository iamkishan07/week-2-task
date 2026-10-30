# Kanban Task Management App

A modern and responsive Kanban board application built with **React.js, Tailwind CSS, Redux Toolkit, and React Router DOM**. TaskFlow helps users organize, manage, and track their daily tasks through a simple three-stage workflow: **Todo, In Progress, and Completed**.

The application focuses on an intuitive user experience, reusable components, centralized state management, persistent task storage, and a modern Light/Dark theme system.

---

## 📌 Project Overview

TaskFlow is a task management application designed to make organizing daily work easier and more efficient.

Users can create tasks, update task details, assign priorities, set due dates, change task statuses, and monitor their overall progress from a centralized dashboard.

The Kanban board provides a visual representation of the task workflow, allowing users to understand what needs to be done, what is currently in progress, and what has been completed.

### ✨ Key Features

- **Create Tasks:** Add tasks with a title, description, priority, and due date.
- **Edit Tasks:** Update existing task information.
- **Delete Tasks:** Remove tasks with a confirmation dialog.
- **Status Management:** Move tasks between Todo, In Progress, and Completed.
- **Search:** Search tasks by title.
- **Priority Filter:** Filter tasks by Low, Medium, and High priority.
- **Status Filter:** Filter tasks by their current status.
- **LocalStorage Persistence:** Save task data in the browser so tasks remain available after refreshing the page.
- **Kanban Dashboard:** Organize tasks into three separate workflow columns.
- **Progress Tracking:** View task statistics and completion progress.
- **Light/Dark Theme:** Switch between a clean light interface and a premium dark interface.
- **Responsive Design:** Optimized layouts for desktop, tablet, and mobile screens.
- **Empty State:** Display a helpful message when no tasks are available.
- **No-Results State:** Show appropriate feedback when no tasks match the search or selected filters.
- **Form Validation:** Validate required task information before submission.

---

## 🎨 UI Design & Theme

TaskFlow uses a modern productivity-dashboard design with a minimal interface, clean spacing, rounded cards, subtle shadows, and consistent typography.

### ☀️ Light Theme – Clean & Minimal

The light theme provides a bright and distraction-free workspace.

| UI Element | Color |
|---|---|
| Main Background | `#F4F6FB` |
| Sidebar | White |
| Task Cards | White |
| Primary Accent | Indigo |
| Main Text | `#172033` |
| Borders | Soft Grey |

### 🌙 Dark Theme – Premium Midnight

The dark theme uses a premium Midnight Navy color palette with Indigo accents for a modern and comfortable viewing experience.

| UI Element | Color |
|---|---|
| Main Background | `#0B1120` |
| Task Cards | `#151F32` |
| Secondary Surfaces | `#101A2B` |
| Primary Accent | Indigo |
| Highlight Color | `#E0E7FF` |
| Borders | `#2A3850` |

### Theme Functionality

- Users can switch between Light and Dark themes using the theme toggle.
- Theme state is managed using Redux Toolkit.
- Theme styles are applied through the `data-theme` attribute.
- Both themes maintain consistent layouts, spacing, and component styling.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Component-based UI development |
| Vite | Development server and build tool |
| JavaScript (ES6+) | Application logic |
| Tailwind CSS | Responsive styling |
| React Router DOM | Client-side routing |
| Redux Toolkit | Centralized state management |
| React Redux | Connecting React components to Redux |
| React Hook Form | Form handling and validation |
| Lucide React | Icons |
| LocalStorage | Persistent task storage |

---

## 📂 Project Structure

```text
taskflow-kanban/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   └── AppLayout.jsx
│   │   │
│   │   ├── TaskCard.jsx
│   │   ├── TaskModal.jsx
│   │   ├── DeleteConfirmModal.jsx
│   │   ├── EmptyState.jsx
│   │   ├── FilterBar.jsx
│   │   └── KanbanColumn.jsx
│   │
│   ├── pages/
│   │   ├── BoardPage.jsx
│   │   ├── ProgressPage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── routes/
│   │   └── router.jsx
│   │
│   ├── store/
│   │   ├── profileSlice.js
│   │   ├── store.js
│   │   ├── tasksSlice.js
│   │   └── themeSlice.js
│   │
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

### Folder & Component Responsibilities

| File / Folder | Responsibility |
|---|---|
| `main.jsx` | Application entry point and Redux Provider setup |
| `components/layout/AppLayout.jsx` | Common layout, sidebar, mobile navigation, and theme toggle |
| `TaskCard.jsx` | Displays individual task information and actions |
| `TaskModal.jsx` | Add and edit task form |
| `DeleteConfirmModal.jsx` | Confirms task deletion |
| `EmptyState.jsx` | Handles empty task and no-results UI |
| `FilterBar.jsx` | Search and filter controls |
| `KanbanColumn.jsx` | Displays tasks belonging to a particular status |
| `BoardPage.jsx` | Main Kanban dashboard |
| `ProgressPage.jsx` | Displays task statistics and progress |
| `NotFoundPage.jsx` | Handles unknown routes |
| `router.jsx` | Defines application routes |
| `store.js` | Configures the Redux store |
| `tasksSlice.js` | Manages task-related state and actions |
| `themeSlice.js` | Manages Light/Dark theme state |
| `index.css` | Global styles and theme-specific styling |

---

## 🔄 Application Workflow – Start to End

Understanding the application flow is important because it explains how the different components work together.

### 1. Application Initialization

When the application starts:

1. Vite loads the React application.
2. `main.jsx` renders the root component.
3. Redux Provider makes the Redux store accessible throughout the application.
4. React Router initializes the configured routes.
5. `AppLayout` renders the common layout, including the sidebar and main content area.
6. The current theme is applied using the `data-theme` attribute.

### 2. Dashboard Rendering

The user lands on the Kanban Board.

The dashboard organizes tasks into three columns:

- **Todo:** Tasks that are waiting to be started.
- **In Progress:** Tasks that are currently being worked on.
- **Completed:** Tasks that have been finished.

Each task is displayed using the reusable `TaskCard` component.

The `KanbanColumn` component is responsible for displaying tasks according to their current status.

### 3. Creating a Task

The task creation workflow:

1. The user clicks the Add Task button.
2. `TaskModal` opens.
3. The user enters the title, description, priority, and due date.
4. React Hook Form manages the form values and validation.
5. On successful submission, a Redux action adds the new task to the store.
6. The dashboard updates and displays the task in the Todo column.
7. Updated task data is persisted in LocalStorage.

### 4. Editing a Task

Users can update an existing task using the Edit option.

1. The selected task data is passed to the form.
2. The existing values are displayed in the modal.
3. The user updates the required information.
4. React Hook Form validates the form.
5. A Redux update action modifies the selected task.
6. The updated task is reflected in the dashboard.

### 5. Changing Task Status

Users can move tasks between the three workflow stages using the task status control.

```text
       TODO
         |
         v
    IN PROGRESS
         |
         v
     COMPLETED
```

When the status changes:

1. The selected task is identified.
2. A Redux action updates its status.
3. The application state changes.
4. The task appears in the corresponding Kanban column.
5. The updated data is saved in LocalStorage.

### 6. Deleting a Task

Task deletion is handled through a confirmation modal.

1. The user clicks the Delete option.
2. `DeleteConfirmModal` appears.
3. The user confirms the action.
4. A Redux action removes the selected task.
5. The dashboard updates.
6. The updated task collection is saved in LocalStorage.

### 7. Search & Filtering

TaskFlow provides search and filtering functionality to help users find tasks quickly.

**Search:**
- Search tasks using their titles.
- Display matching tasks dynamically.

**Priority Filter:**
- Low
- Medium
- High

**Status Filter:**
- Todo
- In Progress
- Completed

Search and filters work together to display only the tasks that match the selected conditions.

### 8. Progress Tracking

The Progress page provides an overview of task completion.

It uses task information from the Redux store to calculate and display relevant statistics, such as total tasks, completed tasks, and completion percentage.

### 9. Theme Switching

TaskFlow supports two visual themes.

1. The user clicks the theme toggle.
2. The `toggleTheme` action is dispatched.
3. Redux updates the theme state.
4. React re-renders the application.
5. The `data-theme` attribute updates.
6. CSS applies the corresponding Light or Dark theme.

### 10. LocalStorage Persistence

LocalStorage ensures that task data remains available after refreshing the browser.

The persistence workflow:

```text
User performs an action
        |
        v
Redux state updates
        |
        v
Updated task data
        |
        v
LocalStorage saves data
        |
        v
Browser refreshes
        |
        v
Saved tasks are restored
        |
        v
Dashboard displays tasks
```

**Storage Key:** `taskflow-tasks`

This provides client-side persistence without requiring a backend or database.

---

## 🧠 State Management & Technical Decisions

### Redux Toolkit

Redux Toolkit is used for centralized state management.

Instead of managing task data independently in multiple components, the application maintains a shared Redux store.

The store is separated into two slices:

**1. tasksSlice.js**

Responsible for task-related operations:

- Adding tasks
- Updating tasks
- Deleting tasks
- Changing task status
- Managing the task collection
- Maintaining task data in LocalStorage

**2. themeSlice.js**

Responsible for:

- Managing the current theme
- Switching between Light and Dark modes

This separation keeps the application organized and makes state updates easier to understand and maintain.

### React Hook Form

React Hook Form is used to manage task forms.

It helps with:

- Managing input values
- Handling form submission
- Validating required fields
- Reducing unnecessary form state management

### React Router DOM

React Router DOM manages navigation between application pages.

| Route | Page |
|---|---|
| `/` | Kanban Board |
| `/progress` | Progress Dashboard |
| `*` | Not Found Page |

The shared `AppLayout` keeps navigation and the sidebar consistent across the application.

### Tailwind CSS

Tailwind CSS is used to build a responsive interface with utility classes.

It provides:

- Responsive layouts
- Consistent spacing
- Reusable styling patterns
- Hover and focus states
- Light and Dark theme styling

---

## 📱 Responsive Design

TaskFlow is designed to work across different screen sizes.

**Desktop**
- Fixed sidebar navigation.
- Three-column Kanban layout.
- Spacious task cards.
- Full dashboard experience.

**Tablet**
- Adaptive spacing.
- Flexible content layout.
- Responsive task cards.

**Mobile**
- Compact header.
- Toggleable navigation menu.
- Mobile-friendly task layout.
- Responsive modals and controls.

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git
- VS Code (recommended)

### Step 1: Clone the Repository

```bash
git clone https://github.com/iamkishan07/taskflow-kanban.git
```

### Step 2: Navigate to the Project Folder

```bash
cd taskflow-kanban
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Development Server

```bash
npm run dev
```

### Step 5: Open in Browser

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

### Step 6: Create a Production Build

```bash
npm run build
```

### Step 7: Preview the Production Build

```bash
npm run preview
```

---

## 🚀 Deployment

The application can be deployed using Vercel.

1. Push the project to a GitHub repository.
2. Log in to Vercel.
3. Import the GitHub repository.
4. Select Vite as the framework preset if it is not detected automatically.
5. Configure the build settings.

**Build Command:**

```bash
npm run build
```

**Output Directory:**

```text
dist
```

6. Click Deploy.
7. Open the generated deployment URL to access the application.

---

## 🔮 Future Improvements

Possible improvements for future versions:

- User authentication and individual user accounts.
- Backend API integration.
- Database storage using MongoDB.
- Drag-and-drop task management.
- Task categories and labels.
- Notifications for approaching due dates.
- Cloud synchronization across devices.
- Persistent theme preference.
- Advanced task sorting and filtering.

---

## 🎯 Learning Outcomes

Building TaskFlow helped strengthen practical knowledge of:

- React component architecture.
- Reusable components and props.
- React Hooks and state management.
- Redux Toolkit and Redux slices.
- React Router and nested layouts.
- Form handling with React Hook Form.
- Tailwind CSS and responsive design.
- Browser LocalStorage and data persistence.
- Conditional rendering and UX states.
- Organizing and maintaining a React project.

---

## 👨‍💻 Author

**Kishan Singh**

Frontend Developer | React.js Developer

- GitHub: [@iamkishan07](https://github.com/iamkishan07)
- LinkedIn: [Kishan Singh](https://www.linkedin.com/in/kishan-singh-a7959b263/)

---

**TaskFlow – Organize your work. Track your progress. Get things done.**