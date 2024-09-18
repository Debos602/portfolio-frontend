import About from "@/pages/About/About";
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
        name: "Bookings",
        path: "/bookings",
        element: <div>Bookings</div>,
    },
    {
        name: "Contact",
        path: "/contact",
        element: <div>Contact</div>,
    },
];
