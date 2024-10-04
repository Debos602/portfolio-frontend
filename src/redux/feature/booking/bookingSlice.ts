// feature/booking/bookingSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Booking {
    id: string;
    userId: string;
    carId: string;
    startTime: string;
    endTime: string;
}

export interface BookingState {
    // Export this interface
    bookings: Booking[];
}

const initialState: BookingState = {
    bookings: [],
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<Booking>) => {
            state.bookings.push(action.payload);
        },
        clearBookings: (state) => {
            state.bookings = [];
        },
    },
});

export const { addBooking, clearBookings } = bookingSlice.actions;
export const selectBookings = (state: { booking: BookingState }) =>
    state.booking.bookings; // Selector to get bookings
export default bookingSlice.reducer;
