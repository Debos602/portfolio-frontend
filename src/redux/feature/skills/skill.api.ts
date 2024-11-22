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
        deteteSkill: builder.mutation({
            query: (_id) => ({
                url: `/api/delete-skills/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Skill"],
        })
        , updateSkill: builder.mutation({
            query: (data) => ({
                url: `/api/update-skills`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Skill"],
        })
    }),
});


export const { useCreateSkillMutation, useGetAllSkillsQuery, useUpdateSkillMutation, useDeteteSkillMutation } = skillManagementApi;