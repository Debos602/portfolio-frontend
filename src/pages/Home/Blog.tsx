import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { motion } from "framer-motion";
import { useGetAllBlogsQuery } from "@/redux/feature/Blog/blog.api";
import { TBlog } from "@/types/global";

const Blog = () => {
    const [content, setContent] = useState("");

    const {
        data: blogs,
        error,
        isLoading,
    } = useGetAllBlogsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });

    console.log("blogs", blogs?.data);

    const blogData: TBlog[] = Array.isArray(blogs?.data) ? blogs.data : [];

    const handleContentChange = (value: string) => {
        setContent(value);
    };

    const handleSubmit = () => {
        console.log("Blog Content:", content);
        alert("Blog submitted successfully!");
        setContent(""); // Clear editor after submission
    };

    return (
        <section className="relative min-h-screen py-12 px-6">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#3B1E54] via-[#9B7EBD] to-[#EEEEEE] blur-lg opacity-30 pointer-events-none"></div>

            {/* Intro Section */}
            <motion.div
                className="relative z-10 max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-[#D4BEE4] backdrop-blur-md"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl font-extrabold text-[#3B1E54] text-center mb-6">
                    Welcome to the Blog
                </h1>
                <p className="text-gray-600 text-lg text-center leading-relaxed">
                    Share your thoughts, stories, and insights. Let your words
                    inspire others and make a lasting impact. Start writing
                    today!
                </p>
            </motion.div>

            {/* Blogs List Section */}
            <motion.div
                className="relative z-10 max-w-4xl mx-auto bg-[#F8F8FA] shadow-lg rounded-lg mt-10 p-8 border border-[#D4BEE4]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl font-bold text-[#3B1E54] text-center mb-6">
                    Latest Blogs
                </h2>
                {isLoading && (
                    <p className="text-center text-gray-500">
                        Loading blogs...
                    </p>
                )}
                {error && (
                    <p className="text-center text-red-500">
                        Error fetching blogs. Please try again later.
                    </p>
                )}
                {blogData && blogData?.length > 0 ? (
                    <ul className="space-y-4">
                        {blogData?.map((blog: TBlog) => (
                            <li
                                key={blog._id}
                                className="bg-white p-4 shadow rounded border border-[#D4BEE4]"
                            >
                                <h3 className="text-xl font-semibold text-[#3B1E54]">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-600">
                                    {blog.description}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !isLoading &&
                    !error && (
                        <p className="text-center text-gray-500">
                            No blogs available.
                        </p>
                    )
                )}
            </motion.div>

            {/* Write a Blog Section */}
            <motion.div
                className="relative z-10 max-w-4xl mx-auto bg-[#F8F8FA] shadow-lg rounded-lg mt-10 p-8 border border-[#D4BEE4]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl font-bold text-[#3B1E54] text-center mb-6">
                    Write a Blog
                </h2>
                <ReactQuill
                    value={content}
                    onChange={handleContentChange}
                    className="text-[#3B1E54] mb-4 bg-white border border-[#D4BEE4] rounded-lg shadow-sm focus:ring-[#9B7EBD]"
                    theme="snow"
                />
                <motion.button
                    onClick={handleSubmit}
                    className="mt-6 block mx-auto bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] text-white font-semibold py-3 px-8 rounded-full hover:from-[#9B7EBD] hover:to-[#3B1E54] transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Submit Blog
                </motion.button>
            </motion.div>
        </section>
    );
};

export default Blog;
