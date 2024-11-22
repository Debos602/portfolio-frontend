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

        deleteProject: builder.mutation({
            query: (projectId) => ({
                url: `/api/delete-project/${projectId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Project"],
        }), // Delete a project record by ID

        updateProject: builder.mutation({
            query: ({ data }) => ({
                url: `/api/update-project`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Project"],
        }), // Update an existing project record by ID
    }),
    // Optionally, add a reducerPath if needed, or configure cache behavior
    overrideExisting: false, // Set to true to override existing endpoints
});

export const { useCreateProjectMutation, useGetAllProjectsQuery, useDeleteProjectMutation, useUpdateProjectMutation } = projectManagementApi;
