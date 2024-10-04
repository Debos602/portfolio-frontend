import { Button, Input, Form, Select, Checkbox, InputNumber } from "antd";
import { useState } from "react";
import { TCar } from "@/types/global";
import { useCreateCarMutation } from "@/redux/feature/car/carManagement.api";
import axios from "axios";

const { TextArea } = Input;

const AddsCar = () => {
    const [form] = Form.useForm();
    const [isElectric, setIsElectric] = useState(false);
    const [fileName, setFileName] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const [createCar] = useCreateCarMutation();

    const handleSubmit = (values: TCar) => {
        const carData = {
            ...values,
            image: fileName, // Only the file name, not the full path
            isElectric, // Include this to submit whether the car is electric
        };
        createCar(carData);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                setUploading(true);
                const response = await axios.post(
                    "http://localhost:5000/upload-image",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                setImageUrl(response.data.imageUrl); // Set the image URL returned by the backend
                setFileName(file.name); // Set the file name
            } catch (error) {
                console.error("Failed to upload image:", error);
            } finally {
                setUploading(false);
            }
        }
    };

    return (
        <div className="container mx-auto p-10 bg-gradient-to-br from-gray-100 to-gray-300 rounded-2xl shadow-2xl">
            <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
                Add a New Car
            </h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    name: "BMW",
                    color: "red",
                    features: ["Bluetooth", "GPS"],
                    isElectric: false,
                    pricePerHour: 100,
                    location: "New York",
                    image: "",
                    description: "Enter car description",
                }}
                className="grid grid-cols-2 gap-6"
            >
                {/* Car Name */}
                <Form.Item
                    label="Car Name"
                    name="name"
                    rules={[
                        { required: true, message: "Please enter car name" },
                    ]}
                >
                    <Input
                        type="text"
                        placeholder="Enter car name"
                        className="rounded-xl px-4 py-3 text-gray-700 border border-gray-300 focus:ring-amber-500 focus:border-amber-500 transition-shadow duration-200 shadow-sm"
                    />
                </Form.Item>

                {/* Color */}
                <Form.Item
                    label="Color"
                    name="color"
                    rules={[
                        { required: true, message: "Please enter car color" },
                    ]}
                >
                    <Input
                        type="text"
                        placeholder="Enter car color"
                        className="rounded-xl px-4 py-3 text-gray-700 border border-gray-300 focus:ring-amber-500 focus:border-amber-500 transition-shadow duration-200 shadow-sm"
                    />
                </Form.Item>

                {/* Features */}
                <Form.Item
                    label="Features"
                    name="features"
                    rules={[
                        {
                            required: true,
                            message: "Please enter car features",
                        },
                    ]}
                >
                    <Select
                        mode="tags"
                        placeholder="Enter car features (e.g., Bluetooth, GPS)"
                        className="rounded-xl text-gray-700 border-gray-300 focus:ring-amber-500 focus:border-amber-500 transition-shadow duration-200 shadow-sm"
                    />
                </Form.Item>

                {/* Is Electric */}
                <Form.Item name="isElectric" valuePropName="checked">
                    <Checkbox
                        onChange={(e) => setIsElectric(e.target.checked)}
                        className="text-gray-700"
                    >
                        Electric Car
                    </Checkbox>
                </Form.Item>

                {/* Price Per Hour */}
                <Form.Item
                    label="Price Per Hour ($)"
                    name="pricePerHour"
                    rules={[
                        {
                            required: true,
                            message: "Please enter price per hour",
                        },
                    ]}
                >
                    <InputNumber
                        min={1}
                        placeholder="Enter price per hour"
                        className="rounded-xl px-4 py-3 w-full text-gray-700 border-gray-300 focus:ring-amber-500 focus:border-amber-500 transition-shadow duration-200 shadow-sm"
                    />
                </Form.Item>

                {/* Location */}
                <Form.Item
                    label="Location"
                    name="location"
                    rules={[
                        {
                            required: true,
                            message: "Please enter car location",
                        },
                    ]}
                >
                    <Input
                        type="text"
                        placeholder="Enter car location"
                        className="rounded-xl px-4 py-3 text-gray-700 border-gray-300 focus:ring-amber-500 focus:border-amber-500 transition-shadow duration-200 shadow-sm"
                    />
                </Form.Item>

                {/* Image */}
                <Form.Item
                    label="Car Image "
                    name="image"
                    rules={[
                        {
                            required: true,
                            message: "Please enter car image URL",
                        },
                    ]}
                >
                    <Input
                        placeholder="Enter car image URL"
                        type="file"
                        // value={fileName}
                        onChange={handleFileChange}
                        className="rounded-xl px-4 py-3 text-gray-700 border-gray-300 focus:ring-amber-500 focus:border-amber-500 transition-shadow duration-200 shadow-sm"
                    />
                    {imageUrl && (
                        <div className="mt-4">
                            <img
                                src={imageUrl}
                                alt="Uploaded car"
                                className="w-48 h-48 rounded-lg"
                            />
                        </div>
                    )}
                </Form.Item>

                {/* Description */}
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Please enter a description",
                        },
                    ]}
                >
                    <TextArea
                        rows={4}
                        placeholder="Enter car description"
                        className="rounded-xl px-4 py-3 text-gray-700 border-gray-300 focus:ring-amber-500 focus:border-amber-500 transition-shadow duration-200 shadow-sm"
                    />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item className="col-span-2 flex justify-center mt-6">
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={uploading} // Disable the button when uploading
                        className="bg-gradient-to-r from-black via-amber-500 to-black rounded-xl uppercase text-center text-white font-bold px-12 py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                        {uploading ? "Uploading..." : "Add Car"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddsCar;
