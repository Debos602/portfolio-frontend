import WelcomeDashboard from "@/pages/Dashboard/WelcomeDashboard";
import {
    useCreateSkillMutation,
    useUpdateSkillMutation,
    useGetAllSkillsQuery,
    useDeteteSkillMutation,
} from "@/redux/feature/skills/skill.api";

import { TSkill } from "@/types/global";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";

const AddSkills: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<TSkill>();
    const [createSkill, { isLoading: isCreating }] = useCreateSkillMutation();
    const [updateSkill, { isLoading: isUpdating }] = useUpdateSkillMutation();
    const [deleteSkill, { isLoading: isDeleting }] = useDeteteSkillMutation();
    const { data: skills = [], isLoading: isFetching } = useGetAllSkillsQuery(
        undefined,
        {
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
        }
    );

    const [isEditing, setIsEditing] = useState(false);
    const [currentSkillId, setCurrentSkillId] = useState<string | null>(null);

    const onSubmit: SubmitHandler<TSkill> = async (data) => {
        try {
            if (isEditing && currentSkillId) {
                await updateSkill({ ...data, _id: currentSkillId }).unwrap();
                toast.success("Skill updated successfully!");
                setIsEditing(false);
                setCurrentSkillId(null);
            } else {
                await createSkill(data).unwrap();
                toast.success("Skill added successfully!");
            }
            reset();
        } catch {
            toast.error("Failed to save skill. Please try again.");
        }
    };

    const skillData = Array.isArray(skills.data) ? skills.data : [];

    const handleEdit = (skill: TSkill) => {
        setIsEditing(true);
        setCurrentSkillId(skill._id || null);
        setValue("title", skill.title);
        setValue("description", skill.description);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteSkill(id).unwrap();
            toast.success("Skill deleted successfully!");
        } catch {
            toast.error("Failed to delete skill. Please try again.");
        }
    };

    return (
        <div className="min-h-screen pb-8">
            <WelcomeDashboard
                adminName="Admin"
                totalBlogs={skillData.length}
                recentActivity={skillData.map(
                    (skill: TSkill) => ` ${skill.title}`
                )}
            />
            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="col-span-2 border-2  rounded-xl p-8 bg-white"
                    >
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-extrabold text-black text-center">
                                {isEditing ? "Update Skill" : "Add Skill"}
                            </h2>

                            {/* Name Field */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-base font-medium text-black"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    {...register("title", {
                                        required: "Name is required",
                                    })}
                                    className="mt-2 w-full p-3 bg-transparent border-2  text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            {/* Level Field */}
                            <div>
                                <label
                                    htmlFor="level"
                                    className="block text-base font-medium text-black"
                                >
                                    Level
                                </label>
                                <input
                                    id="level"
                                    {...register("description", {
                                        required: "Level is required",
                                    })}
                                    className="mt-2 w-full p-3 bg-transparent border-2  text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className={`w-full py-3 font-bold rounded-xl text-white ${isCreating || isUpdating
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-black hover:bg-[#3B1E54]"
                                    }`}
                                disabled={isCreating || isUpdating}
                            >
                                {isCreating || isUpdating
                                    ? "Saving..."
                                    : isEditing
                                        ? "Update Skill"
                                        : "Add Skill"}
                            </button>
                        </form>
                    </motion.div>

                    <div className="col-span-3 space-y-4">
                        {isFetching ? (
                            <p className="text-center text-base text-black">
                                Loading skills...
                            </p>
                        ) : skillData.length === 0 ? (
                            <p className="text-center text-base text-black">
                                No skills found.
                            </p>
                        ) : (
                            skillData.map((skill: TSkill) => (
                                <motion.div
                                    key={skill._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="p-6 border-2  rounded-xl shadow-md flex justify-between items-start hover:shadow-lg transition duration-300 bg-white"
                                >
                                    <div>
                                        <h3 className="text-xl font-bold text-black">
                                            {skill.title}
                                        </h3>
                                        <p className="mt-2 text-black">
                                            {skill.description}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(skill)}
                                            className="px-4 py-2 bg-black hover:bg-[#3B1E54] text-white font-semibold rounded-xl hover:opacity-90"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(skill._id!)
                                            }
                                            className={`px-4 py-2 font-semibold text-white rounded-xl ${isDeleting
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-black hover:bg-[#3B1E54]"
                                                }`}
                                            disabled={isDeleting}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSkills;
