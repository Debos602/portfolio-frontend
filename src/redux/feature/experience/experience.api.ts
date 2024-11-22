import { baseApi } from "@/redux/api/baseApi";

const ExperienceManagementApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createExperience: build.mutation({
            query: (data) => ({
                url: "/api/experience",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Experience"]
        }),
        getAllExperiences: build.query({
            query: () => ({
                url: "/api/experience",
                method: "GET",
            }),
            providesTags: ["Experience"],
        }),
        deleteExperience: build.mutation({
            query: (_id) => ({
                url: `/api/delete-experience/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Experience"],
        }),
        updateExperience: build.mutation({
            query: (data) => ({
                url: `/api/update-experience`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Experience"],
        })
    }),
});

export const { useCreateExperienceMutation, useGetAllExperiencesQuery, useDeleteExperienceMutation, useUpdateExperienceMutation } = ExperienceManagementApi;
