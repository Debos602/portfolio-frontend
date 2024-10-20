import { Button, DatePicker, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import image from "../../src/assets/about.png";

const { Option } = Select;

interface BookingSearchProps {
    onSearch: (location: string, startDate: string, endDate: string) => void;
}

const BookingSearch: React.FC<BookingSearchProps> = ({ onSearch }) => {
    const [location, setLocation] = useState("");
    const [startTime, setPickUpDate] = useState<Dayjs | null>(null);
    const [endTime, setReturnDate] = useState<Dayjs | null>(null);

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

    const handleSearch = () => {
        const startD = startTime ? startTime.format("YYYY-MM-DD") : "";
        const endD = endTime ? endTime.format("YYYY-MM-DD") : "";
        onSearch(location, startD, endD);
    };

    return (
        <div
            className="relative z-10 mt-[134px] h-[calc(100vh-134px)] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-white bg-black bg-opacity-30 md:w-[800px] md:h-[300px] w-[500px] h-[300px] mx-auto my-auto border-2 rounded-xl">
                <h1 className="text-3xl md:text-4xl font-bold my-3">
                    Bookings
                </h1>

                <div className="w-full max-w-2xl px-4 mb-6">
                    <div className="bg-white rounded-xl p-6 shadow-lg md:flex items-center justify-between gap-4">
                        <Select
                            placeholder="Select your location"
                            size="large"
                            className="flex-grow"
                            onChange={setLocation}
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
            </div>
        </div>
    );
};

export default BookingSearch;
