import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Auth/Login/Login";
import SignUp from "../Pages/Auth/SignUp/SignUp";
import NotFoundPage from "../Pages/Error/404Page";
import AllContests from "../Pages/AllContests/AllContests";
import ContestDetails from "../Pages/AllContests/ContestDetails/ContestDetails";
import DashboardLayout from "../Layouts/DashboardLayout";
import AddContest from "../Pages/Dashboard/CreatorDashboard/AddContest/AddContest";
import MyContests from "../Pages/Dashboard/CreatorDashboard/MyContests/MyContests";
import Submissions from "../Pages/Dashboard/CreatorDashboard/Submissions/Submissions";
import PrivateRoute from "./PrivateRoute";
import ManageUser from "../Pages/Dashboard/AdminDashboard/ManageUser/ManageUser";
import MyParticipate from "../Pages/Dashboard/UserDashBoard/MyParticipate/MyParticipate";
import MyWinningContests from "../Pages/Dashboard/UserDashBoard/WinningContest/WinningContest";
import MyProfile from "../Pages/Dashboard/UserDashBoard/MyProfile/MyProfile";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess/PaymentSuccess";
import PaymentCancel from "../Pages/Payment/PaymentCancel/PaymentCancel";

import Leaderboard from "../Pages/Leaderboard/Leaderboard";
import ManageContests from "../Pages/Dashboard/AdminDashboard/ManageContests/ManageContests";
import EditContest from "../Pages/Dashboard/CreatorDashboard/EditContest/EditContest";

export const router = createBrowserRouter([
  // root layout
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-contests",
        Component: AllContests,
      },
      {
        path: "contests/:id",
        element: (
          <PrivateRoute>
            <ContestDetails></ContestDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "leaderboard",
        Component: Leaderboard,
      },
    ],
  },
  // auth
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  // dashboard
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      // creator dashboard routes
      {
        path: "add-contest",
        Component: AddContest,
      },
      {
        path: "my-contests",
        Component: MyContests,
      },
      {
        path: "submissions",
        Component: Submissions,
      },
      {
        path: "contest/edit/:id",
        Component: EditContest,
      },
      // admin dashbaord routes
      {
        path: "manage-user",
        Component: ManageUser,
      },
      {
        path: "manage-contests",
        Component: ManageContests,
      },
      // user dashboard routes
      {
        path: "my-participate",
        Component: MyParticipate,
      },
      {
        path: "profile",
        Component: MyProfile,
      },
      {
        path: "my-winning-contests",
        Component: MyWinningContests,
      },
    ],
  },
  {
    path: "/payment-success",
    Component: PaymentSuccess,
  },
  {
    path: "/payment-cancel",
    Component: PaymentCancel,
  },
  // 404 page
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
