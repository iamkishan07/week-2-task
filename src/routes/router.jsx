import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import BoardPage from "../pages/BoardPage";
import ProgressPage from "../pages/ProgressPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <BoardPage /> },
      { path: "progress", element: <ProgressPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
