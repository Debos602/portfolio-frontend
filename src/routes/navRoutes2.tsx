import Contact from "@/pages/Contact";

import Login from "@/pages/Login";

export const navPaths2 = [
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
