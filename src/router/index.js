//
import { createBrowserRouter } from "react-router-dom";
import Layout from "src/pages/Layout";
import New from "src/pages/New";
import Month from "src/pages/Month";
import Year from "src/pages/Year";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "month",
        element: <Month />,
      },
      {
        path: "year",
        element: <Year />,
      },
    ],
  },
  {
    path: "new",
    element: <New />,
  },
]);

export default router;