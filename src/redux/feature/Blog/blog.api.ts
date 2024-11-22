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
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/api/delete-blogs/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Blog"],
        }),
        updateBlog: builder.mutation({
            query: (data) => ({
                url: `/api/update-blogs`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Blog"],
        })

    }),
});

export const { useCreateBlogMutation, useGetAllBlogsQuery, useUpdateBlogMutation, useDeleteBlogMutation } = blogManagementApi;

