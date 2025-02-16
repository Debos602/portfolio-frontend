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
import { motion } from "framer-motion";

const AddBlog: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<TBlog>();
    const [file, setFile] = useState<File | null>(null);
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

    const onSubmit: SubmitHandler<TBlog> = async (blog) => {
        const data = { ...blog };
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);

        // Append the image only if it's available
        if (file) {
            formData.append("image", file);
        }

        console.log("Submitting FormData:", Array.from(formData.entries()));

        try {
            if (isEditing && currentBlogId) {
                // Pass FormData to updateBlog
                formData.append("_id", currentBlogId); // Include blog ID in FormData
                await updateBlog(formData).unwrap();
                toast.success("Blog updated successfully!");
                setIsEditing(false);
                setCurrentBlogId(null);
            } else {
                await createBlog(formData).unwrap();
                toast.success("Blog added successfully!");
            }
            reset();
            setFile(null);
        } catch (error) {
            console.error("Error submitting blog:", error);
            toast.error("Failed to save blog. Please try again.");
        }
    };



    const blogData = Array.isArray(blogs.data) ? blogs.data : [];
    const handleEdit = (blog: TBlog) => {
        setIsEditing(true);
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
    const handleFileChange = (file: File) => {
        console.log(file);
        setFile(file); // Store the file object
    };

    return (
        <motion.div
            className="min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <WelcomeDashboard
                adminName="Admin"
                totalBlogs={blogData.length}
                recentActivity={recentActivities}
            />
            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 pb-8">
                    {/* Add/Update Blog Form */}
                    <motion.div
                        className="col-span-2 border-2 rounded-xl p-4 bg-white"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}

                    >
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-extrabold text-black text-center">
                                {isEditing ? "Update Blog" : "Add Blog"}
                            </h2>

                            {/* Title Field */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-base font-medium text-black"
                                >
                                    Title
                                </label>
                                <input
                                    id="title"
                                    {...register("title", {
                                        required: "Title is required",
                                    })}
                                    className="mt-2 w-full p-2 border text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
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
                                    className="block text-base font-medium text-black"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={5}
                                    {...register("description", {
                                        required: "Description is required",
                                    })}
                                    className="mt-2 w-full p-2 border text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.description.message}
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

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                className={`w-full text-center p-2 font-bold rounded-xl text-white ${isCreating || isUpdating
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-black hover:bg-[#3B1E54]"
                                    }`}
                                disabled={isCreating || isUpdating}
                            >
                                {isCreating || isUpdating
                                    ? "Saving..."
                                    : isEditing
                                        ? "Update Blog"
                                        : "Add Blog"}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Blog List */}
                    <motion.div
                        className="col-span-3 space-y-4"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, scale: 0.95 },
                            visible: {
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    delayChildren: 0.3,
                                    staggerChildren: 0.1,
                                },
                            },
                        }}
                    >
                        {isFetching ? (
                            <p className="text-center text-base text-black">
                                Loading blogs...
                            </p>
                        ) : blogData.length === 0 ? (
                            <p className="text-center text-base text-black">
                                No blogs found.
                            </p>
                        ) : (
                            blogData.map((blog: TBlog) => (
                                <motion.div
                                    key={blog._id}
                                    className="p-6 border-2 rounded-xl flex justify-between items-start hover:shadow-lg transition duration-300 bg-white"
                                    whileHover={{ scale: 1.02 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div>
                                        <h3 className="text-xl font-bold text-black">
                                            {blog.title}
                                        </h3>
                                        <p className="mt-2 text-black">
                                            {blog.description.slice(0, 100)}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(blog)}
                                            className="rounded-xl px-4 py-2 bg-black hover:bg-[#3B1E54] text-white font-semibold hover:opacity-90"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(blog._id!)
                                            }
                                            className={`rounded-xl px-4 py-2 font-semibold text-white ${isDeleting
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
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default AddBlog;