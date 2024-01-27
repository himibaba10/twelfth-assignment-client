import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import CreatorDashboard from "../Layouts/CreatorDashboard";
import AddContest from "../Pages/AddContest";
import PrivateRoute from "./PrivateRoute";
import CreatorRoute from "./CreatorRoute";
import CreatedContests from "../Pages/CreatedContests";
import UpdateContest from "../Pages/UpdateContest";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../Layouts/AdminDashboard";
import ManageUsers from "../Pages/ManageUsers";
import ManageContests from "../Pages/ManageContests";
import Contests from "../Pages/Contests";
import ContestDetail from "../Pages/ContestDetail";
import Payment from "../Pages/Payment";
import RegisteredContests from "../Pages/RegisteredContests";
import WinningContests from "../Pages/WinningContests";
import Profile from "../Pages/Profile";
import UserRoute from "./UserRoute";
import UserDashboard from "../Layouts/UserDashboard";
import SubmittedContests from "../Pages/SubmittedContests";
import SearchPage from "../Pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contests",
        element: <Contests />,
      },
      {
        path: "/contests/:id",
        element: <ContestDetail />,
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "/search-result",
        element: <SearchPage />,
      },
    ],
  },

  // Login and register routes
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  // creator route
  {
    path: "/dashboard/creator",
    element: (
      <PrivateRoute>
        <CreatorRoute>
          <CreatorDashboard />
        </CreatorRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <AddContest />,
      },
      {
        path: "add-contest",
        element: <AddContest />,
      },
      {
        path: "update-contest/:id",
        element: <UpdateContest />,
      },
      {
        path: "created-contests",
        element: <CreatedContests />,
      },
      {
        path: "submitted-contests",
        element: <SubmittedContests />,
      },
    ],
  },

  // admin route
  {
    path: "/dashboard/admin",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <ManageUsers />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-contests",
        element: <ManageContests />,
      },
      {
        path: "created-contests",
        element: <CreatedContests />,
      },
    ],
  },

  // user route
  {
    path: "/dashboard/user",
    element: (
      <PrivateRoute>
        <UserRoute>
          <UserDashboard />
        </UserRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <RegisteredContests />,
      },
      {
        path: "registered-contests",
        element: <RegisteredContests />,
      },
      {
        path: "winning-contests",
        element: <WinningContests />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
