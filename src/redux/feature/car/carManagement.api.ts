import { baseApi } from "@/redux/api/baseApi";

const carManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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
    }),
});
export const { useGetAllCarsQuery, useGetCarByIdQuery } = carManagementApi;
