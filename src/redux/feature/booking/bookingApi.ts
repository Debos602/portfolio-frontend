import { baseApi } from "@/redux/api/baseApi";

const bookingApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createBooking: build.mutation({
            query: (data) => ({
                url: "/api/bookings",
                method: "POST",
                body: data,
            }),
        }), // Create a new booking record

        getBookings: build.query({
            query: () => ({ url: "/api/bookings/my-bookings", method: "GET" }),
        }), // Get all booking records
        getAllBookings: build.query({
            query: () => ({ url: "/api/bookings", method: "GET" }),
        }),

        deleteBooking: build.mutation({
            query: (id) => ({ url: `/api/bookings/${id}`, method: "DELETE" }),
        }),
    }),
});
export const {
    useCreateBookingMutation,
    useGetBookingsQuery,
    useDeleteBookingMutation,
    useGetAllBookingsQuery,
} = bookingApi;
