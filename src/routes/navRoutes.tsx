import About from "@/pages/About/About";
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
        path: "/bookings/:id",
        element: <div>Bookings</div>,
    },
    {
        name: "Contact",
        path: "/contact",
        element: <div>Contact</div>,
    },
];
