/* eslint-disable react-refresh/only-export-components */
import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AuthProvider from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import NodeList from "../components/NodeList";
import Note from "../components/Note";

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
            loader: async () => {
              const query = ` query ExampleQuery {
                folders{
                  id
                  name
                  createdAt
                }
              }`;
              const res = await fetch("http://localhost:4000/graphql", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  query,
                }),
              });
              const { data } = await res.json();
              console.log({ data });
              return data;
            },
            children: [
              {
                element: <NodeList />,
                path: "folders/:folderId",
                children: [
                  {
                    element: <Note />,
                    path: "note/:noteId",
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
