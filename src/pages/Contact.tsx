import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import {
    EnvironmentOutlined,
    MailOutlined,
    PhoneOutlined,
} from "@ant-design/icons";

type FormValues = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

const Contact = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log("Form Submitted:", data);
        alert("Thank you for your message!");
        reset(); // Clear the form after successful submission
    };

    return (
        <div className="bg-gradient-to-br from-[#D4BEE4] to-[#9B7EBD] min-h-screen flex items-center justify-center py-12">
            <div className="grid grid-cols-1 md:grid-cols-6 max-w-6xl w-ful px-10">
                {/* Left Grid: Contact Details */}
                <motion.div
                    className="bg-white bg-opacity-80 p-8 col-span-2 shadow-xl flex flex-col items-start justify-center space-y-6 transform hover:scale-105 transition-transform duration-500"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h3 className="text-3xl font-semibold text-[#3B1E54]">
                        Contact Information
                    </h3>
                    {/* Location */}
                    <div className="space-x-2 ">
                        <div className="text-[16px] text-[#3B1E54]">
                            <EnvironmentOutlined />
                            <h5>Location:</h5>
                            <p>Uttar Patenga, Chattagram, Bangladesh</p>
                        </div>
                    </div>

                    {/* Call */}
                    <div className="space-x-2 ">
                        <div className="text-[16px] text-[#3B1E54]">
                            <PhoneOutlined />
                            <h5>Cell:</h5>
                            <span>+8801834491602</span>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-x-2 ">
                        <div className="text-[16px] text-[#3B1E54]">
                            <MailOutlined />
                            <h5>Email us:</h5>
                            <p>Debos.das.02@gmail.com</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right Grid: Contact Form */}
                <motion.div
                    className="col-span-4  bg-white bg-opacity-80 p-8 shadow-xl transform hover:scale-105 transition-transform duration-500"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h3 className="text-3xl text-[#3B1E54] font-semibold mb-4 text-center">
                        Send Us a Message
                    </h3>
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* Name Field */}
                        <div>
                            <input
                                type="text"
                                placeholder="Your Name"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                                className="w-full p-3 rounded-lg border-2 border-[#9B7EBD] bg-[#EEEEEE] placeholder-[#9B7EBD] focus:outline-none focus:ring-2 focus:ring-[#3B1E54] text-[#3B1E54]"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <input
                                type="email"
                                placeholder="Your Email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                                className="w-full p-3 rounded-lg border-2 border-[#9B7EBD] bg-[#EEEEEE] placeholder-[#9B7EBD] focus:outline-none focus:ring-2 focus:ring-[#3B1E54] text-[#3B1E54]"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Phone Field */}
                        <div>
                            <input
                                type="tel"
                                placeholder="Your Phone Number"
                                {...register("phone", {
                                    required: "Phone number is required",
                                })}
                                className="w-full p-3 rounded-lg border-2 border-[#9B7EBD] bg-[#EEEEEE] placeholder-[#9B7EBD] focus:outline-none focus:ring-2 focus:ring-[#3B1E54] text-[#3B1E54]"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        {/* Message Field */}
                        <div>
                            <textarea
                                placeholder="Your Message"
                                {...register("message", {
                                    required: "Message is required",
                                })}
                                rows={5}
                                className="w-full p-3 rounded-lg border-2 border-[#9B7EBD] bg-[#EEEEEE] placeholder-[#9B7EBD] focus:outline-none focus:ring-2 focus:ring-[#3B1E54] text-[#3B1E54]"
                            />
                            {errors.message && (
                                <p className="text-red-500 text-sm">
                                    {errors.message.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-[#3B1E54] text-white rounded-lg font-semibold transition-transform transform hover:scale-105 hover:bg-[#9B7EBD]"
                        >
                            Send Message
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
