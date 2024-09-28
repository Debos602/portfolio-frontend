export interface TCar {
    _id: string;
    name: string;
    image: string;
    pricePerHour: number;
    description: string;
    color: string;
    // Add the new fields for car availability and location
    location?: string; // Assuming location is optional
    availableFrom?: string; // Assuming date as a string, adjust to Dayjs if needed
    availableUntil?: string;
}
