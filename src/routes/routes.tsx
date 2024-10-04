import App from "@/App";
import { routeGenerator } from "@/utilities/routeGenarator";
import { createBrowserRouter } from "react-router-dom";
import { navPaths } from "./navRoutes";
import Login from "@/pages/Login";
import CarDetails from "@/pages/car/CarDetails";
import SignUp from "@/pages/SignUp";
import Dashboard from "@/pages/Dashboard/Dashboard";
import ProtectedRoute from "@/layout/ProtectedRoute";
import ErrorPage from "@/layout/ErrorPage";
import Profile from "@/pages/Dashboard/Profile";
import Custombooking from "@/pages/Custombooking";
import DashBoardOverview from "@/pages/AdminDashboard/DashBoardOverview";

import ManageCar from "@/pages/AdminDashboard/ManageCar";
import AdminDashboard from "@/pages/Dashboard/AdminDashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            ...routeGenerator(navPaths),
            {
                path: "/register",
                element: <SignUp />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/car-details/:id",
                element: <CarDetails />,
            },
            {
                path: "*",
                element: <ErrorPage />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute allowedRoles={["user"]}>
                <Dashboard />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Profile />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "booking",
                element: <Custombooking />,
            },
        ],
    },
    {
        path: "/admin-dashboard",
        element: (
            <ProtectedRoute allowedRoles={["admin"]}>
                {" "}
                <AdminDashboard />{" "}
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <DashBoardOverview />,
            },
            {
                path: "dashboard-overview",
                element: <DashBoardOverview />,
            },
            {
                path: "manage-car",
                element: <ManageCar />,
            },
        ],
    },
]);

export default router;
