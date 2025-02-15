import React from "react";
import { Button, Form, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import type { FormProps } from "antd";
import { useLoginMutation } from "@/redux/feature/authApi";
import { useAppDispatch } from "@/redux/hook";
import { setUser } from "@/redux/feature/authSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";
import dot from "../../assets/dot.png";

type FieldType = {
    email: string;
    password: string;
    remember?: boolean;
};

const Login: React.FC = () => {
    const [form] = Form.useForm(); // Ant Design form instance
    const [userLogin, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            const response = await userLogin(values).unwrap();
            const { data: user, token } = response;
            console.log("access token:", token);
            if (user && token) {
                dispatch(setUser({ user, token }));
                toast.success("Login Successful");

                const redirectPath =
                    location.state?.from?.pathname ||
                    (user.role === "admin" ? "/admin-dashboard" : "/");
                navigate(redirectPath, { replace: true });
            } else {
                toast.error("Invalid response from server.");
            }
        } catch (error) {
            toast.error("Login failed, please try again.");
        }
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const handleCredential = () => {
        const credentials = {
            email: "Rupash602@gmail.com",
            password: "rupash45",
        };
        form.setFieldsValue(credentials); // Set form values
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-[#07041e] text-white"
        >
            {/* Two-Sided Layout */}
            <motion.div
                className="flex flex-col lg:flex-row items-center min-h-screen"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, }}
            >
                {/* Image Side (Left on Desktop, Top on Mobile) */}
                <div
                    className="w-full lg:w-1/2 h-64 lg:h-screen bg-cover bg-center relative order-1 lg:order-1"
                    style={{
                        backgroundImage: `url("https://i.ibb.co/Fx6pSJg/9901ec68-ecda-4b0d-a232-23f661c8ddb3-1.png")`,
                    }}
                >
                    <div
                        className=" absolute inset-0 bg-repeat"
                        style={{
                            backgroundImage: `url(${dot})`,
                            zIndex: 1,
                        }}
                    ></div>
                </div>

                {/* Form Side (Right on Desktop, Bottom on Mobile) */}
                <motion.div
                    className="w-full lg:w-1/2 p-8 flex items-center justify-center order-2 lg:order-2 "
                >
                    <div className="w-full max-w-md">
                        <h2 className="text-3xl font-semibold mb-6 text-center lg:text-left">
                            Portfolio Dashboard Login
                        </h2>
                        <Form
                            form={form} // Bind form instance
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            layout="vertical"
                        >
                            <Form.Item<FieldType>
                                label={<span className="text-white">Email</span>}
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your email!",
                                    },
                                    {
                                        type: "email",
                                        message: "The input is not valid E-mail!",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Enter your email"
                                    style={{ borderColor: "#0A3981" }}
                                />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label={<span className="text-white">Password</span>}
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!",
                                    },
                                ]}
                            >
                                <Input.Password
                                    placeholder="Enter your password"
                                    style={{ borderColor: "#0A3981" }}
                                />
                            </Form.Item>

                            <div className="flex justify-between text-base mb-4">
                                <button
                                    type="button"
                                    onClick={handleCredential} // Call handleCredential on click
                                    style={{
                                        color: "#fff",
                                        border: "none",
                                        background: "none",
                                        cursor: "pointer",
                                        textDecoration: "underline",
                                    }}
                                >
                                    Credential
                                </button>
                            </div>

                            <Form.Item>
                                <motion.div>
                                    <Button
                                        htmlType="submit"
                                        className="w-full py-5 font-semibold text-xl uppercase"
                                        style={{
                                            backgroundColor: "#3B1E54",
                                            color: "#FFFFFF",
                                        }}
                                        loading={isLoading}
                                    >
                                        Log in
                                    </Button>
                                </motion.div>
                            </Form.Item>
                        </Form>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Login;