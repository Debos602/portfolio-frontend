import ProtectedRoute from "@/layout/ProtectedRoute";
import About from "@/pages/About/About";
import Booking from "@/pages/Booking";
import Car from "@/pages/car/Car";

import Home from "@/pages/Home/Home";

export const navPaths = [
    {
        name: "Home",
        path: "/",
        element: <Home />,
    },
    {
        name: "About",
        path: "/about",
        element: <About />,
    },
    {
        name: "Car-List",
        path: "/cars",
        element: <Car></Car>,
    },
    {
        name: "Bookings",
        path: "/booking",
        element: (
            <ProtectedRoute allowedRoles={["admin", "user"]}>
                <Booking />
            </ProtectedRoute>
        ),
    },
    {
        name: "Contact",
        path: "/contact",
        element: <div>Contact</div>,
    },
];
