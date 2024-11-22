import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TExperience } from "@/types/global"; // Ensure TExperience is imported
import {
    useCreateExperienceMutation,
    useDeleteExperienceMutation,
    useGetAllExperiencesQuery,
    useUpdateExperienceMutation,
} from "@/redux/feature/experience/experience.api"; // Import the mutation hooks
import WelcomeDashboard from "@/pages/Dashboard/WelcomeDashboard";

const AddExperience: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<TExperience>();

    const [createExperience, { isLoading: isCreating }] =
        useCreateExperienceMutation();
    const [updateExperience, { isLoading: isUpdating }] =
        useUpdateExperienceMutation();
    const [deleteExperience, { isLoading: isDeleting }] =
        useDeleteExperienceMutation();
    const { data: ExperienceData = [], isFetching } = useGetAllExperiencesQuery(
        undefined,
        {
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
        }
    );

    const [isEditing, setIsEditing] = useState(false);
    const [currentExperienceId, setCurrentExperienceId] = useState<
        string | null
    >(null);

    const recentActivities = ExperienceData?.data?.map(
        (experience: TExperience) => ` ${experience.title}`
    );
    const experience = Array.isArray(ExperienceData.data)
        ? ExperienceData.data
        : [];

    const onSubmit: SubmitHandler<TExperience> = async (data) => {
        try {
            if (isEditing && currentExperienceId) {
                await updateExperience({
                    ...data,
                    _id: currentExperienceId,
                }).unwrap();
                toast.success("Experience updated successfully!");
                setIsEditing(false);
                setCurrentExperienceId(null);
            } else {
                await createExperience(data).unwrap();
                toast.success("Experience added successfully!");
            }
            reset();
        } catch {
            toast.error("Failed to save experience. Please try again.");
        }
    };
    const handleDelete = async (id: string) => {
        try {
            await deleteExperience(id).unwrap();
            toast.success("Blog deleted successfully!");
        } catch {
            toast.error("Failed to delete blog. Please try again.");
        }
    };

    const handleEdit = (experience: TExperience) => {
        setIsEditing(true);
        setCurrentExperienceId(experience._id || null);
        setValue("title", experience.title);
        setValue("company", experience.company);
        setValue("startDate", new Date(experience.startDate)); // Set as Date object
        setValue("endDate", new Date(experience.endDate));
        setValue("description", experience.description);
        setValue("location", experience.location);
        setValue("role", experience.role);
        setValue("designation", experience.designation);
        setValue("responsibilities", experience.responsibilities);
        setValue("technologies", experience.technologies);
    };

    return (
        <div className="bg-gradient-to-b from-[#D4BEE4] to-[#EEEEEE] min-h-screen">
            <WelcomeDashboard
                adminName="Admin"
                totalBlogs={ExperienceData.length}
                recentActivity={recentActivities}
            />
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="col-span-2 bg-white shadow-lg rounded-lg p-8">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-extrabold text-[#3B1E54] text-center">
                                {isEditing
                                    ? "Update Experience"
                                    : "Add Experience"}
                            </h2>

                            {/* Title Field */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-lg font-medium text-[#3B1E54]"
                                >
                                    Title
                                </label>
                                <input
                                    id="title"
                                    {...register("title", {
                                        required: "Title is required",
                                    })}
                                    className="mt-2 w-full p-3 bg-[#D4BEE4] text-[#3B1E54] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            {/* Company Field */}
                            <div>
                                <label
                                    htmlFor="company"
                                    className="block text-lg font-medium text-[#3B1E54]"
                                >
                                    Company
                                </label>
                                <input
                                    id="company"
                                    {...register("company", {
                                        required: "Company is required",
                                    })}
                                    className="mt-2 w-full p-3 bg-[#D4BEE4] text-[#3B1E54] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                                />
                                {errors.company && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.company.message}
                                    </p>
                                )}
                            </div>

                            {/* Start Date Field */}
                            <div>
                                <label
                                    htmlFor="startDate"
                                    className="block text-lg font-medium text-[#3B1E54]"
                                >
                                    Start Date
                                </label>
                                <input
                                    id="startDate"
                                    type="date"
                                    {...register("startDate", {
                                        required: "Start Date is required",
                                    })}
                                    className="mt-2 w-full p-3 bg-[#D4BEE4] text-[#3B1E54] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                                />
                                {errors.startDate && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.startDate.message}
                                    </p>
                                )}
                            </div>

                            {/* End Date Field */}
                            <div>
                                <label
                                    htmlFor="endDate"
                                    className="block text-lg font-medium text-[#3B1E54]"
                                >
                                    End Date
                                </label>
                                <input
                                    id="endDate"
                                    type="date"
                                    {...register("endDate", {
                                        required: "End Date is required",
                                    })}
                                    className="mt-2 w-full p-3 bg-[#D4BEE4] text-[#3B1E54] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                                />
                                {errors.endDate && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.endDate.message}
                                    </p>
                                )}
                            </div>

                            {/* Description Field */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-lg font-medium text-[#3B1E54]"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    {...register("description", {
                                        required: "Description is required",
                                    })}
                                    className="mt-2 w-full p-3 bg-[#D4BEE4] text-[#3B1E54] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>

                            {/* Location Field */}
                            <div>
                                <label
                                    htmlFor="location"
                                    className="block text-lg font-medium text-[#3B1E54]"
                                >
                                    Location
                                </label>
                                <input
                                    id="location"
                                    {...register("location", {
                                        required: "Location is required",
                                    })}
                                    className="mt-2 w-full p-3 bg-[#D4BEE4] text-[#3B1E54] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                                />
                                {errors.location && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.location.message}
                                    </p>
                                )}
                            </div>

                            {/* Role Field */}
                            <div>
                                <label
                                    htmlFor="role"
                                    className="block text-lg font-medium text-[#3B1E54]"
                                >
                                    Role
                                </label>
                                <input
                                    id="role"
                                    {...register("role", {
                                        required: "Role is required",
                                    })}
                                    className="mt-2 w-full p-3 bg-[#D4BEE4] text-[#3B1E54] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                                />
                                {errors.role && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.role.message}
                                    </p>
                                )}
                            </div>

                            {/* Designation Field */}
                            <div>
                                <label
                                    htmlFor="designation"
                                    className="block text-lg font-medium text-[#3B1E54]"
                                >
                                    Designation
                                </label>
                                <input
                                    id="designation"
                                    {...register("designation", {
                                        required: "Designation is required",
                                    })}
                                    className="mt-2 w-full p-3 bg-[#D4BEE4] text-[#3B1E54] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                                />
                                {errors.designation && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.designation.message}
                                    </p>
                                )}
                            </div>

                            {/* Responsibilities Field */}
                            <div>
                                <label
                                    htmlFor="responsibilities"
                                    className="block text-lg font-medium text-[#3B1E54]"
                                >
                                    Responsibilities
                                </label>
                                <textarea
                                    id="responsibilities"
                                    {...register("responsibilities", {
                                        required:
                                            "Responsibilities are required",
                                    })}
                                    className="mt-2 w-full p-3 bg-[#D4BEE4] text-[#3B1E54] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                                />
                                {errors.responsibilities && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.responsibilities.message}
                                    </p>
                                )}
                            </div>

                            {/* Technologies Field */}
                            <div>
                                <label
                                    htmlFor="technologies"
                                    className="block text-lg font-medium text-[#3B1E54]"
                                >
                                    Technologies
                                </label>
                                <input
                                    id="technologies"
                                    {...register("technologies", {
                                        required: "Technologies are required",
                                    })}
                                    className="mt-2 w-full p-3 bg-[#D4BEE4] text-[#3B1E54] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                                />
                                {errors.technologies && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.technologies.message}
                                    </p>
                                )}
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    disabled={isCreating || isUpdating}
                                    className="mt-6 w-full py-3 px-6 bg-[#9B7EBD] text-white rounded-lg hover:bg-[#8c64a1] disabled:bg-gray-400"
                                >
                                    {isCreating || isUpdating
                                        ? "Saving..."
                                        : "Save Experience"}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-span-3 space-y-4">
                        {isFetching ? (
                            <p className="text-center text-lg text-[#3B1E54]">
                                Loading experience...
                            </p>
                        ) : experience?.length === 0 ? (
                            <p className="text-center text-lg text-[#3B1E54]">
                                No Experience found.
                            </p>
                        ) : (
                            experience?.map((exp: TExperience) => (
                                <div
                                    key={exp._id}
                                    className="p-6 bg-white rounded-lg shadow-md flex justify-between items-start hover:shadow-lg transition duration-300"
                                >
                                    <div>
                                        <h3 className="text-xl font-bold text-[#3B1E54]">
                                            {exp.title}
                                        </h3>
                                        <p className="mt-2 text-[#9B7EBD]">
                                            {exp.description}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(exp)}
                                            className="px-4 py-2 bg-[#9B7EBD] hover:bg-[#3B1E54] text-white font-semibold rounded-lg hover:opacity-90"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(exp._id!)
                                            }
                                            className={`px-4 py-2 font-semibold text-white rounded-lg ${
                                                isDeleting
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-[#9B7EBD] hover:bg-[#3B1E54]"
                                            }`}
                                            disabled={isDeleting}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddExperience;
