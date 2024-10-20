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
        getAllOrders: build.query({
            query: () => ({
                url: "/api/orders",
                method: "GET",
            }),
        }),

        updateOrder: build.mutation({
            query: (data) => ({
                url: `/api/orders/update`,
                method: "PATCH",
                body: data,
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetAllOrdersQuery,
    useUpdateOrderMutation,
} = OrderManagementApi;
