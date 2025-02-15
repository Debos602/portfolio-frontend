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
import { motion } from "framer-motion";

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
    const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();
    const { data: projectData, isFetching } = useGetAllProjectsQuery(
        undefined,
        { refetchOnMountOrArgChange: true, refetchOnFocus: true }
    );

    console.log(projectData);

    const [isEditing, setIsEditing] = useState(false);
    const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);


    const recentActivities = projectData?.data?.map(
        (project: TProject) => ` ${project.title}`
    );
    const projects = Array.isArray(projectData?.data) ? projectData?.data : [];
    console.log(projects);

    const onSubmit: SubmitHandler<TProject> = async (data) => {
        console.log(data);
        const newProject = { ...data };
        const formData = new FormData();
        formData.append("title", newProject.title);
        formData.append("description", newProject.description);
        formData.append("githubLinkFrontend", newProject.githubLinkFrontend);
        formData.append("githubLinkBackend", newProject.githubLinkBackend);
        formData.append("liveLink", newProject.liveLink);

        // Append the image only if it's available
        if (file) {
            formData.append("image", file);
        }

        try {
            if (isEditing && currentProjectId) {
                console.log("ProjectId", currentProjectId);
                // Append the `_id` to the FormData
                formData.append("_id", currentProjectId);

                // Send the FormData to the backend
                await updateProject(formData).unwrap();
                toast.success("Project updated successfully!");
                setIsEditing(false);
                setCurrentProjectId(null);
                setFile(null);
            } else {
                console.log(data);
                await createProject(formData).unwrap();
                toast.success("Project added successfully!");
            }
            reset();
        } catch (error) {
            console.error("Error saving project:", error); // Log the error for debugging
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
    const handleFileChange = (file: File) => {
        console.log(file);
        setFile(file); // Store the file object
    };

    return (
        <div className="min-h-screen">
            <WelcomeDashboard
                adminName="Admin"
                totalBlogs={projects.length}
                recentActivity={recentActivities}
            />
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="col-span-2 bg-white shadow-lg  p-8 rounded-xl border-2  ">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-extrabold text-black text-center">
                                {isEditing ? "Update Project" : "Add Project"}
                            </h2>

                            {/* Title Field */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-lg font-medium text-black"
                                >
                                    Title
                                </label>
                                <input
                                    id="title"
                                    {...register("title", {
                                        required: "Title is required",
                                    })}
                                    className="mt-2 w-full p-3 text-black rounded-xl border-2  focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
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
                                    className="block text-lg font-medium text-black"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    {...register("description", {
                                        required: "Description is required",
                                    })}
                                    className="mt-2 w-full p-3 text-black rounded-xl border-2  focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
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
                                    className="block text-lg font-medium text-black"
                                >
                                    GitHub Frontend Link
                                </label>
                                <input
                                    id="githubLinkFrontend"
                                    {...register("githubLinkFrontend", {
                                        required:
                                            "Frontend GitHub link is required",
                                    })}
                                    className="mt-2 w-full p-3 text-black rounded-xl border-2  focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
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
                                    className="block text-lg font-medium text-black"
                                >
                                    GitHub Backend Link
                                </label>
                                <input
                                    id="githubLinkBackend"
                                    {...register("githubLinkBackend", {
                                        required:
                                            "Backend GitHub link is required",
                                    })}
                                    className="mt-2 w-full p-3 text-black rounded-xl border-2  focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
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
                                    className="block text-lg font-medium text-black"
                                >
                                    Live Link
                                </label>
                                <input
                                    id="liveLink"
                                    {...register("liveLink", {
                                        required: "Live link is required",
                                    })}
                                    className="mt-2 w-full p-3 text-black rounded-xl border-2  focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                                />
                                {errors.liveLink && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.liveLink.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="image"
                                    className="block text-base font-medium text-black"
                                >
                                    Image
                                </label>
                                <input
                                    id="image"
                                    type="file"
                                    name="image"
                                    onChange={(e) =>
                                        handleFileChange(e.target.files![0])
                                    }
                                    className="mt-2 w-full p-2 border text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                                />
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    disabled={isCreating || isUpdating}
                                    className="mt-6 w-full p-3 bg-black text-white rounded-xl border-2  hover:bg-[#8c64a1] disabled:bg-gray-400"
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
                            <p className="text-center text-lg text-black">
                                Loading projects...
                            </p>
                        ) : projectData?.length === 0 ? (
                            <p className="text-center text-lg text-black">
                                No projects found.
                            </p>
                        ) : (
                            projects?.map((project: TProject) => (
                                <motion.div
                                    key={project._id}
                                    className="bg-white shadow-lg rounded-lg p-4 border-2 "
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h3 className="font-bold">
                                        {project.title}
                                    </h3>
                                    <p>{project.liveLink}</p>
                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className="text-black text-base underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(project._id)
                                            }
                                            className={`rounded-xl px-4 py-2 font-semibold text-white ${isDeleting
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-black hover:bg-[#3B1E54]"
                                                }`}
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

export default AddProjects;
