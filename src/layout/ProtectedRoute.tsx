import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout, useCurrentToken } from "@/redux/feature/authSlice";
import { verifyToken } from "@/utilities/verifyToken";

type TUser = {
    role: "admin" | "user";
};

type TProtectedRoute = {
    children: ReactNode;
    allowedRoles: string[]; // Updated to accept an array of roles
};

const ProtectedRoute = ({ children, allowedRoles }: TProtectedRoute) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(useCurrentToken);

    // Verify token and extract user details
    let user: TUser | null = null;
    if (token) {
        user = verifyToken(token) as TUser;
    }

    // Handle token invalidation or role mismatch directly
    if (!token || (user && !allowedRoles.includes(user.role))) {
        dispatch(logout());
        return <Navigate to="/login" replace={true} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
