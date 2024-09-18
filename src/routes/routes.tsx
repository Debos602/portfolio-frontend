import App from "@/App";
import { routeGenerator } from "@/utilities/routeGenarator";
import { createBrowserRouter } from "react-router-dom";
import { navPaths } from "./navRoutes";
import Login from "@/pages/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            ...routeGenerator(navPaths),
            {
                path: "/register",
                element: <div>Register</div>,
            },
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
]);
export default router;
