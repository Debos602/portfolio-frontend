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
    }),
});

export const { useCreateExperienceMutation, useGetAllExperiencesQuery } = ExperienceManagementApi;
