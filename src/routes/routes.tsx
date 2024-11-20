import App from "@/App";
import { routeGenerator } from "@/utilities/routeGenarator";
import { createBrowserRouter } from "react-router-dom";
import { navPaths } from "./navRoutes";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import Dashboard from "@/pages/Dashboard/Dashboard";
import ProtectedRoute from "@/layout/ProtectedRoute";
import ErrorPage from "@/layout/ErrorPage";

import DashBoardOverview from "@/pages/AdminDashboard/DashBoardOverview";
import ManageCar from "@/pages/AdminDashboard/ManageCar";
import AdminDashboard from "@/pages/Dashboard/AdminDashboard";
import ManageBooking from "@/pages/AdminDashboard/ManageBooking";
import ManageReturnCars from "@/pages/AdminDashboard/ManageReturnCars";
import UserManagement from "@/pages/AdminDashboard/UserManagement";

import ResetPassword from "@/pages/ResetPassword";
import About from "@/pages/Home/About/About";
import Projects from "@/pages/Home/Projects";
import Skills from "@/pages/Home/Skills";
import Blog from "@/pages/Home/Blog";
import Contact from "@/pages/Contact";
import Introduction from "@/pages/Home/Introduction";
import Experience from "@/pages/Home/Experience";
import Home from "@/pages/Home/Home";

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
                path: "/",
                element: <Home />,
            },
            {
                path: "/introduction",
                element: <Introduction />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/projects",
                element: <Projects />,
            },
            {
                path: "/expereince",
                element: <Experience />,
            },
            {
                path: "/skills",
                element: <Skills />,
            },
            {
                path: "/blog",
                element: <Blog />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },

            {
                path: "*",
                element: <ErrorPage />,
            },
        ],
    },

    {
        path: "/reset-password",
        element: <ResetPassword />,
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute allowedRoles={["user"]}>
                <Dashboard />
            </ProtectedRoute>
        ),
        children: [],
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
            {
                path: "manage-booking",
                element: <ManageBooking />,
            },
            {
                path: "manage-return-car",
                element: <ManageReturnCars />,
            },
            {
                path: "user-management",
                element: <UserManagement />,
            },
        ],
    },
]);

export default router;
