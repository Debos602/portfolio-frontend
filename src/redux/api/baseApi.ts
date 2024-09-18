import {
    // BaseQueryApi,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { toast } from "sonner";
import { logout, setUser } from "../feature/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set("authorization", `${token}`);
        }

        return headers;
    },
});

const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    unknown, // Set the result type to 'unknown' if you're not sure of the exact type
    FetchBaseQueryError // This ensures that 'result.error' is properly typed
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 404) {
        const errorData = result.error.data as { message: string }; // Type assertion
        toast.error(errorData.message);
    }

    if (result?.error?.status === 403) {
        const errorData = result.error.data as { message: string }; // Type assertion
        toast.error(errorData.message);
    }

    if (result?.error?.status === 401) {
        console.log("Sending refresh token");

        const res = await fetch(
            "http://localhost:5000/api/auth/refresh-token",
            {
                method: "POST",
                credentials: "include",
            }
        );

        const data = await res.json();

        if (data?.data?.accessToken) {
            const user = (api.getState() as RootState).auth.user;

            api.dispatch(
                setUser({
                    user,
                    token: data.data.accessToken,
                })
            );

            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: [],
    endpoints: () => ({}),
});
