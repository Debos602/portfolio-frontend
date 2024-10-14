import { baseApi } from "@/redux/api/baseApi";

const OrderManagementApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createOrder: build.mutation({
            query: (data) => ({
                url: "/api/orders",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useCreateOrderMutation } = OrderManagementApi;
