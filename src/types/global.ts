export interface TCar {
    _id: string;
    name: string;
    image: string;
    pricePerHour: number;
    description: string;
    color: string;
    status: "available" | "unavailable";
    location?: string; // Assuming location is optional
    availableFrom?: string; // Assuming date as a string, adjust to Dayjs if needed
    availableUntil?: string;
    [key: string]: string | number | boolean | undefined; // Specify allowed types
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

export interface TBooking {
    _id: string;
    userId: string; // Using a separate user ID for clarity
    carId: string; // Using a separate car ID for clarity
    startTime: string; // ISO date string or timestamp
    endTime: string; // ISO date string or timestamp
    totalCost: number; // Total cost as a number
    status: "approved" | "pending" | "canceled" | "completed"; // Possible statuses
    paymentStatus: string;
}

export interface Bookings {
    _id: string;
    date: string;
    startTime: string;
    endTime: string | null;
    totalCost: number;
    transactionId: string;
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
    status: "approved" | "pending" | "canceled" | "completed";
    paymentStatus: string;
}
export interface TOrder {
    carName: string; // Assuming carName could be null if booking is not found
    date: Date; // Assuming date is a Date object
    startTime: string; // Assuming startTime is a string (could also be a Date)
    endTime: string; // Assuming endTime is a string (could also be a Date)
    totalCost: number; // Total cost should be a number
    transactionId: string; // Assuming transactionId is a string
    paymentStatus: string; // Assuming payementStatus is a string
}
export interface TExperience {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    role: string;
    location: string;
    technologies: string;
}
export type TProject = {
    _id: string;
    title: string;
    image: string;
    description: string;
    githubLinkFrontend: string;
    githubLinkBackend: string;
    liveLink: string;
};

export interface TSkill {
    _id: string;
    title: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}
export type TBlog = {
    _id: string;
    title: string;
    description: string;
};