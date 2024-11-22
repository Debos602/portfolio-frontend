import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TProject } from "@/types/global"; // Ensure TProject is imported
import {
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
    useGetAllProjectsQuery,
} from "@/redux/feature/project/project.api"; // Import the mutation hooks
import WelcomeDashboard from "@/pages/Dashboard/WelcomeDashboard";

const AddProjects: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<TProject>();

    const [createProject, { isLoading: isCreating }] =
        useCreateProjectMutation();
    const [updateProject, { isLoading: isUpdating }] =
        useUpdateProjectMutation();
    const [deleteProject] = useDeleteProjectMutation();
    const { data: projectData, isFetching } = useGetAllProjectsQuery(
        undefined,
        { refetchOnMountOrArgChange: true, refetchOnFocus: true }
    );

    console.log(projectData);

    const [isEditing, setIsEditing] = useState(false);
    const [currentProjectId, setCurrentProjectId] = useState<string | null>(
        null
    );

    const recentActivities = projectData?.data?.map(
        (project: TProject) => ` ${project.title}`
    );
    const projects = Array.isArray(projectData?.data) ? projectData?.data : [];
    console.log(projects);
    const onSubmit: SubmitHandler<TProject> = async (data) => {
        console.log(data);
        try {
            if (isEditing && currentProjectId) {
                await updateProject({
                    ...data,
                    _id: currentProjectId,
                }).unwrap();
                toast.success("Project updated successfully!");
                setIsEditing(false);
                setCurrentProjectId(null);
            } else {
                console.log(data);
                await createProject(data).unwrap();
                toast.success("Project added successfully!");
            }
            reset();
        } catch {
            toast.error("Failed to save project. Please try again.");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteProject(id).unwrap();
            toast.success("Project deleted successfully!");
        } catch {
            toast.error("Failed to delete project. Please try again.");
        }
    };

    const handleEdit = (project: TProject) => {
        setIsEditing(true);
        setCurrentProjectId(project._id || null);
        setValue("title", project.title);
        setValue("image", project.image);
        setValue("description", project.description);
        setValue("githubLinkFrontend", project.githubLinkFrontend);
        setValue("githubLinkBackend", project.githubLinkBackend);
        setValue("liveLink", project.liveLink);
    };

    return (
        <div className="bg-gradient-to-b from-[#D4BEE4] to-[#EEEEEE] min-h-screen">
            <WelcomeDashboard
                adminName="Admin"
                totalBlogs={projects.length}
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
                                {isEditing ? "Update Project" : "Add Project"}
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

                            {/* GitHub Frontend Link */}
                            <div>
                                <label
                                    htmlFor="githubLinkFrontend"
                                    className="block text-lg font-medium text-[#3B1E54]"
                                >
                                    GitHub Frontend Link
                                </label>
                                <input
                                    id="githubLinkFrontend"
                                    {...register("githubLinkFrontend", {
                                        required:
                                            "Frontend GitHub link is required",
                                    })}
                                    className="mt-2 w-full p-3 bg-[#D4BEE4] text-[#3B1E54] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                                />
                                {errors.githubLinkFrontend && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.githubLinkFrontend.message}
                                    </p>
                                )}
                            </div>

                            {/* GitHub Backend Link */}
                            <div>
                                <label
                                    htmlFor="githubLinkBackend"
                                    className="block text-lg font-medium text-[#3B1E54]"
                                >
                                    GitHub Backend Link
                                </label>
                                <input
                                    id="githubLinkBackend"
                                    {...register("githubLinkBackend", {
                                        required:
                                            "Backend GitHub link is required",
                                    })}
                                    className="mt-2 w-full p-3 bg-[#D4BEE4] text-[#3B1E54] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                                />
                                {errors.githubLinkBackend && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.githubLinkBackend.message}
                                    </p>
                                )}
                            </div>

                            {/* Live Link */}
                            <div>
                                <label
                                    htmlFor="liveLink"
                                    className="block text-lg font-medium text-[#3B1E54]"
                                >
                                    Live Link
                                </label>
                                <input
                                    id="liveLink"
                                    {...register("liveLink", {
                                        required: "Live link is required",
                                    })}
                                    className="mt-2 w-full p-3 bg-[#D4BEE4] text-[#3B1E54] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                                />
                                {errors.liveLink && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.liveLink.message}
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
                                        : "Save Project"}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-span-3 space-y-4">
                        {isFetching ? (
                            <p className="text-center text-lg text-[#3B1E54]">
                                Loading projects...
                            </p>
                        ) : projectData?.length === 0 ? (
                            <p className="text-center text-lg text-[#3B1E54]">
                                No projects found.
                            </p>
                        ) : (
                            projects?.map((project: TProject) => (
                                <div
                                    key={project._id}
                                    className="bg-white shadow-lg rounded-lg p-4"
                                >
                                    <h3 className="font-bold">
                                        {project.title}
                                    </h3>
                                    <p>{project.liveLink}</p>
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="text-blue-500"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(project._id)
                                        }
                                        className="text-red-500 ml-2 border-2 border-red-500 px-2 py-1 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProjects;
