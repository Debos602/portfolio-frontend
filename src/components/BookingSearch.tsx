import { Button, DatePicker, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "./Buttons";
import image from "../../src/assets/about.png";
const { Option } = Select;

const BookingSearch = () => {
    const [location, setLocation] = useState("");
    const locations = [
        "Dhaka",
        "Chittagong",
        "Comilla",
        "Barisal",
        "Rajshahi",
        "Rangpur",
        "Cox's Bazar",
        "Sylhet",
    ];

    const handleChange = (value: string) => {
        setLocation(value);
    };
    const [startTime, setPickUpDate] = useState<Dayjs | null>(null);
    const [endTime, setReturnDate] = useState<Dayjs | null>(null);
    const navigate = useNavigate();
    const handleSearch = () => {
        const startD = startTime ? startTime.format("YYYY-MM-DD") : "";
        const endD = endTime ? endTime.format("YYYY-MM-DD") : "";
        navigate(
            `/cars?location=${location}&startDate=${startD}&endDate=${endD}`
        );
    };
    return (
        <div
            className="relative z-10 mt-[134px] h-[calc(100vh-134px)] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-white bg-black bg-opacity-30 w-[800px] h-[300px] mx-auto my-auto border-2 rounded-xl">
                <h1 className="text-4xl font-bold mb-6">Bookings</h1>

                {/* Search Bar */}
                <div className="w-full max-w-2xl px-4 mb-6">
                    <div className="bg-white rounded-xl p-6 shadow-lg md:flex items-center justify-between gap-4">
                        <Select
                            placeholder="Select your location"
                            size="large"
                            className="flex-grow"
                            onChange={handleChange}
                            value={location}
                            style={{ width: "100%" }}
                        >
                            {locations.map((loc) => (
                                <Option key={loc} value={loc}>
                                    {loc}
                                </Option>
                            ))}
                        </Select>

                        <DatePicker
                            size="large"
                            placeholder="Pick-up Date"
                            className="flex-grow"
                            format="YYYY-MM-DD"
                            onChange={(date) => setPickUpDate(date)}
                            disabledDate={(currentDate) =>
                                currentDate &&
                                currentDate < dayjs().endOf("day")
                            }
                        />

                        <DatePicker
                            size="large"
                            placeholder="Return Date"
                            className="flex-grow"
                            format="YYYY-MM-DD"
                            onChange={(date) => setReturnDate(date)}
                            disabledDate={(currentDate) =>
                                currentDate &&
                                currentDate < dayjs().endOf("day")
                            }
                        />

                        <Button
                            size="large"
                            className="bg-black rounded-xl border-2 hover:bg-white text-white px-8 py-4 shadow-lg"
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                    </div>
                </div>
                <Buttons to="/cars">Book Now</Buttons>
            </div>
        </div>
    );
};

export default BookingSearch;
