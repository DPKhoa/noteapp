import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import router from "./router";
import { Container } from "@mui/material";
import "./firebase/config";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Container maxWidth="lg" sx={{ textAlign: "center", marginTop: "50px" }}>
    <RouterProvider router={router}></RouterProvider>
  </Container>
);
