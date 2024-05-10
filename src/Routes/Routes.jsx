import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root"

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
  ]);
  export default router ;