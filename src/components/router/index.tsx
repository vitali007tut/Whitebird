import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import { PostCard } from "../PostCard";
import { Main } from "../Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {index: true, element: <Main/>},
      {path: "/post/:id", element: <PostCard />}
    ]
  },
]);
