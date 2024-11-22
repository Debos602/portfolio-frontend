import App from "@/App";
import { routeGenerator } from "@/utilities/routeGenarator";
import { createBrowserRouter } from "react-router-dom";
import { navPaths } from "./navRoutes";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import ProtectedRoute from "@/layout/ProtectedRoute";
import ErrorPage from "@/layout/ErrorPage";
import AdminDashboard from "@/pages/Dashboard/AdminDashboard";
import ResetPassword from "@/pages/ResetPassword";
import About from "@/pages/Home/About/About";
import Projects from "@/pages/Home/Projects";
import Skills from "@/pages/Home/Skills";
import Blog from "@/pages/Home/Blog";
import Contact from "@/pages/Contact";
import Introduction from "@/pages/Home/Introduction";
import Experience from "@/pages/Home/Experience";
import Home from "@/pages/Home/Home";
import ProjectDetails from "@/pages/Home/ProjectsDetails";
import AddBlog from "@/pages/AdminDashboard/BlogManagment/AddBlog";
import AddSkills from "@/pages/AdminDashboard/SkillManagement/AddSkills";
import AddProjects from "@/pages/AdminDashboard/ProjectManagement/AddProjects";
import AddExperience from "@/pages/AdminDashboard/ExperienceManagement/AddExperience";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            ...routeGenerator(navPaths),

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
                path: "/projects/:id",
                element: <ProjectDetails />,
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
        path: "/register",
        element: <SignUp />,
    },
    {
        path: "/login",
        element: <Login />,
    },

    {
        path: "/reset-password",
        element: <ResetPassword />,
    },
    {
        path: "*",
        element: <ErrorPage />,
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
                element: <AddBlog />,
            },
            {
                path: "management-blog",
                element: <AddBlog />,
            },
            {
                path: "management-skills",
                element: <AddSkills />,
            },
            {
                path: "management-projects",
                element: <AddProjects />,
            },
            {
                path: "management-experience",
                element: <AddExperience />,
            },
        ],
    },
]);

export default router;
