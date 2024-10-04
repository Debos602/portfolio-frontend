export interface TCar {
    _id: string;
    name: string;
    image: string;
    pricePerHour: number;
    description: string;
    color: string;
    status: "available" | "unavailable";
    // Add the new fields for car availability and location
    location?: string; // Assuming location is optional
    availableFrom?: string; // Assuming date as a string, adjust to Dayjs if needed
    availableUntil?: string;
}

export type TUser = {
    id: string;
    name: string;
    email: string; // Ensure this property is present
    role: "user" | "admin";
    password?: string;
    confirmPassword?: string;
    needsPasswordChange?: boolean;
    passwordChangedAt?: Date;
    phone: string;
    createdAt?: Date;
    updatedAt?: Date;
};
// types/booking.ts

export interface TBooking {
    _id: string;
    id: string; // Assuming the booking ID is a string
    user: TUser;
    car: TCar;
    startTime: string; // ISO date string or timestamp
    endTime: string; // ISO date string or timestamp
    totalCost: number; // Total cost as a number
    status: "approved" | "pending" | "canceled"; // Possible statuses
}
export interface Bookings {
    _id: string;
    date: string;
    startTime: string;
    endTime: string | null;
    totalCost: number;
    user: {
        _id: string;
        name: string;
        email: string;
        role: string;
        phone: string;
    };
    car: {
        _id: string;
        name: string;
        description: string;
        image: string;
        color: string;
        isElectric: boolean;
        features: string[];
        pricePerHour: number;
    };
}
