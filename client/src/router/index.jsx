/* eslint-disable react-refresh/only-export-components */
import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AuthProvider from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import NodeList from "../components/NodeList";
import Note from "../components/Note";
import { NotesLoader, noteLoader } from "../utils/noteUtil";
import { FoldersLoader } from "../utils/FolderUltil";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};
export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: "/",
            loader: FoldersLoader,
            children: [
              {
                element: <NodeList />,
                path: "folders/:folderId",
                loader: NotesLoader,
                children: [
                  {
                    element: <Note />,
                    path: "note/:noteId",
                    loader: noteLoader,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
