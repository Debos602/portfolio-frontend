import ProtectedRoute from "@/layout/ProtectedRoute";
import About from "@/pages/About/About";
import Booking from "@/pages/Booking/Booking";
import Car from "@/pages/car/Car";
import Contact from "@/pages/Contact";

import Home from "@/pages/Home/Home";
import Login from "@/pages/Login";

export const navPaths2 = [
    {
        name: <div className="ps-2">Home</div>,
        path: "/",
        element: <Home />,
    },
    {
        name: <div className="ps-2">About</div>,
        path: "/about",
        element: <About />,
    },
    {
        name: <div className="ps-2">Car-List</div>,
        path: "/cars",
        element: <Car></Car>,
    },
    {
        name: <div className="ps-2">Bookings</div>,
        path: "/bookings",
        element: (
            <ProtectedRoute allowedRoles={["admin", "user"]}>
                <Booking />
            </ProtectedRoute>
        ),
    },
    {
        name: <div className="ps-2">Contact</div>,
        path: "/contact",
        element: <Contact />,
    },
    {
        name: <div className="ps-2">Login</div>,
        path: "/login",
        element: <Login />,
    },
];
