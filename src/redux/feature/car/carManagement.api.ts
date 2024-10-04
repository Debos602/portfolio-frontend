import { baseApi } from "@/redux/api/baseApi";

const carManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCar: builder.mutation({
            query: (data) => ({
                url: "/api/cars",
                method: "POST",
                body: data,
            }),
        }),
        getAllCars: builder.query({
            query: (params) => ({
                url: "/api/cars",
                method: "GET",
                params,
            }),
        }),
        getCarById: builder.query({
            query: (id) => ({
                url: `/api/cars/${id}`,
                method: "GET",
            }),
        }),
        getAvailableCars: builder.query({
            query: (params) => ({
                url: "/api/cars/available",
                method: "GET",
                params,
            }),
        }),
    }),
});
export const {
    useGetAllCarsQuery,
    useGetCarByIdQuery,
    useGetAvailableCarsQuery,
    useCreateCarMutation,
} = carManagementApi;
