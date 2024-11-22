import { baseApi } from "@/redux/api/baseApi";

const projectManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createProject: builder.mutation({
            query: (data) => ({
                url: "/api/project",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Project"],
        }), // Create a new project record

        getAllProjects: builder.query({
            query: () => ({
                url: "/api/project",
                method: "GET",
            }),
            providesTags: ["Project"],
        }), // Get all project records
    }),
    // Optionally, add a reducerPath if needed, or configure cache behavior
    overrideExisting: false, // Set to true to override existing endpoints
});

export const { useCreateProjectMutation, useGetAllProjectsQuery } = projectManagementApi;

