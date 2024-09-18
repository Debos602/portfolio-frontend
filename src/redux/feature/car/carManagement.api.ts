import { baseApi } from "@/redux/api/baseApi";

const carManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCars: builder.query({
            query: () => ({
                url: "/api/cars",
                method: "GET",
            }),
        }),
    }),
});
export const { useGetAllCarsQuery } = carManagementApi;
