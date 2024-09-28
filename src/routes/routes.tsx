import App from "@/App";
import { routeGenerator } from "@/utilities/routeGenarator";
import { createBrowserRouter } from "react-router-dom";
import { navPaths } from "./navRoutes";
import Login from "@/pages/Login";
import CarDetails from "@/pages/car/CarDetails";
import SignUp from "@/pages/SignUp";
import Dashboard from "@/pages/Dashboard/Dashboard";
import ProtectedRoute from "@/layout/ProtectedRoute";
// import ProtectedRoute from "@/layout/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
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
                element: <div>Not Found</div>,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute role={"admin" || "user"}>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
]);
export default router;
