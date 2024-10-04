import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/api/auth/signin",
                method: "POST",
                body: userInfo,
            }),
        }),
        signup: builder.mutation({
            query: (userInfo) => ({
                url: "/api/auth/signup",
                method: "POST",
                body: userInfo,
            }),
        }),
        getAdmin: builder.query({
            query: (data) => ({
                url: "/api/auth/admin",
                method: "GET",
                body: data,
            }),
            providesTags: ["Admin"],
        }),
        getUser: builder.query({
            query: (userInfo) => ({
                url: "/api/auth/user",
                method: "GET",
                body: userInfo,
            }),
            providesTags: ["User"],
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: "/api/auth/update-user",
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useSignupMutation,
    useUpdateUserMutation,
    useGetUserQuery,
    useGetAdminQuery,
} = authApi;
