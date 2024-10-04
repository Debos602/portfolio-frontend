// carSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Car interface here
export interface Car {
    id: string;
    name: string;
    pricePerHour: number;
    color: string;
}

// Define the CarState interface
export interface CarState {
    cars: Car[];
    loading: boolean;
    error: string | null;
}

const initialState: CarState = {
    cars: [],
    loading: false,
    error: null,
};

const carSlice = createSlice({
    name: "car",
    initialState,
    reducers: {
        setCars(state, action: PayloadAction<Car[]>) {
            state.cars = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const { setCars, setLoading, setError } = carSlice.actions;
export default carSlice.reducer;

// Only export CarState once
