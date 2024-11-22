import { baseApi } from "@/redux/api/baseApi";

const skillManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSkill: builder.mutation({
            query: (data) => ({
                url: "/api/skills",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Skill"],
        }),
        getAllSkills: builder.query({
            query: () => ({
                url: "/api/skills",
                method: "GET",
            }),
            providesTags: ["Skill"],
        }),
    }),
});


export const { useCreateSkillMutation, useGetAllSkillsQuery } = skillManagementApi;