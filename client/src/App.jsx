import Home from "./pages/home/Home";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import List from "./pages/list/List";
import Layout from "./pages/layout/Layout";
import Single from "./pages/single/Single";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/list",
          element: <List />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/:id",
          element: <Single />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    }
  ]);

  return (
   
    <RouterProvider router={router} />
  )
}

export default App