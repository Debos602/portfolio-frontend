import WelcomeDashboard from "@/pages/Dashboard/WelcomeDashboard";
import {
    useCreateBlogMutation,
    useDeleteBlogMutation,
    useGetAllBlogsQuery,
    useUpdateBlogMutation,
} from "@/redux/feature/Blog/blog.api";
import { TBlog } from "@/types/global";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const AddBlog: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<TBlog>();
    const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
    const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
    const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();
    const { data: blogs = [], isLoading: isFetching } = useGetAllBlogsQuery(
        undefined,
        {
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
        }
    );

    const [isEditing, setIsEditing] = useState(false);
    const [currentBlogId, setCurrentBlogId] = useState<string | null>(null);

    const onSubmit: SubmitHandler<TBlog> = async (data) => {
        try {
            if (isEditing && currentBlogId) {
                await updateBlog({ ...data, _id: currentBlogId }).unwrap();
                toast.success("Blog updated successfully!");
                setIsEditing(false);
                setCurrentBlogId(null);
            } else {
                await createBlog(data).unwrap();
                toast.success("Blog added successfully!");
            }
            reset();
        } catch {
            toast.error("Failed to save blog. Please try again.");
        }
    };

    const blogData = Array.isArray(blogs.data) ? blogs.data : [];
    console.log(blogData);
    const handleEdit = (blog: TBlog) => {
        setIsEditing(true);
        console.log("_id", blog._id);
        setCurrentBlogId(blog._id || null);
        setValue("title", blog.title);
        setValue("description", blog.description);
    };
    const recentActivities = blogData.map((blog: TBlog) => ` ${blog.title}`);
    const handleDelete = async (id: string) => {
        try {
            await deleteBlog(id).unwrap();
            toast.success("Blog deleted successfully!");
        } catch {
            toast.error("Failed to delete blog. Please try again.");
        }
    };

    return (
        <div className="bg-gradient-to-b from-[#D4BEE4] to-[#EEEEEE] min-h-screen">
            <WelcomeDashboard
                adminName="Admin"
                totalBlogs={blogData.length}
                recentActivity={recentActivities}
            />
            <div className="max-w-7xl mx-auto">
                {/* Add/Update Blog Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="col-span-2 bg-white shadow-lg rounded-lg p-8">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-extrabold text-[#3B1E54] text-center">
                                {isEditing ? "Update Blog" : "Add Blog"}
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
                                    rows={5}
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

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`w-full py-3 font-bold rounded-lg text-white ${
                                    isCreating || isUpdating
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-[#9B7EBD] to-[#3B1E54] hover:opacity-90"
                                }`}
                                disabled={isCreating || isUpdating}
                            >
                                {isCreating || isUpdating
                                    ? "Saving..."
                                    : isEditing
                                    ? "Update Blog"
                                    : "Add Blog"}
                            </button>
                        </form>
                    </div>

                    {/* Blog List */}
                    <div className="col-span-3 space-y-4">
                        {isFetching ? (
                            <p className="text-center text-lg text-[#3B1E54]">
                                Loading blogs...
                            </p>
                        ) : blogData.length === 0 ? (
                            <p className="text-center text-lg text-[#3B1E54]">
                                No blogs found.
                            </p>
                        ) : (
                            blogData.map((blog: TBlog) => (
                                <div
                                    key={blog._id}
                                    className="p-6 bg-white rounded-lg shadow-md flex justify-between items-start hover:shadow-lg transition duration-300"
                                >
                                    <div>
                                        <h3 className="text-xl font-bold text-[#3B1E54]">
                                            {blog.title}
                                        </h3>
                                        <p className="mt-2 text-[#9B7EBD]">
                                            {blog.description}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(blog)}
                                            className="px-4 py-2 bg-[#9B7EBD] hover:bg-[#3B1E54] text-white font-semibold rounded-lg hover:opacity-90"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(blog._id!)
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

export default AddBlog;
