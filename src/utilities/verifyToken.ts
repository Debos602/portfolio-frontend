import { jwtDecode } from "jwt-decode"; // Change the import statement

// Extend the JwtPayload type to include your custom fields
interface CustomJwtPayload {
    userId: string;
    role: string;
}

// Utility function to decode the token
export const verifyToken = (token: string): CustomJwtPayload | null => {
    try {
        return jwtDecode(token) as CustomJwtPayload; // Cast the return value
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};
