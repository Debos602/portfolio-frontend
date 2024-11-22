import { baseApi } from "@/redux/api/baseApi";

const blogManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBlog: builder.mutation({
            query: (data) => ({
                url: "/api/blogs",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Blog"], // Invalidate the "Blog" tag for automatic refetch
        }),
        getAllBlogs: builder.query({
            query: () => ({
                url: "/api/blogs",
                method: "GET",
            }),
            providesTags: ["Blog"], // Provides "Blog" tag for caching
        }),
    }),
});

export const { useCreateBlogMutation, useGetAllBlogsQuery } = blogManagementApi;

