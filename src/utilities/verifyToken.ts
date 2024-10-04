import { jwtDecode } from "jwt-decode"; // Correct the import statement

// Extend the JwtPayload type to include your custom fields
interface CustomJwtPayload {
    userId: string;
    role: "admin" | "user";
    // Add any other fields you expect in your token
}

// Utility function to decode the token
export const verifyToken = (token: string): CustomJwtPayload | null => {
    try {
        // Cast the decoded token as CustomJwtPayload
        return jwtDecode<CustomJwtPayload>(token);
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};
