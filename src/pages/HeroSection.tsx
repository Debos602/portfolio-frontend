import { Carousel, Select } from "antd";
import img1 from "../assets/img-1.jpg";
import img2 from "../assets/img-2.jpg";
import img3 from "../assets/img-3.jpg";
import img4 from "../assets/img-4.jpg";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomArrowProps } from "react-slick";
import Buttons from "@/components/Buttons";
const { Option } = Select;

// Custom Next Arrow
const NextArrow = (props: CustomArrowProps) => {
    const { onClick } = props;
    return (
        <button
            className="absolute right-6 top-[50%] transform -translate-y-1/2 bg-gradient-to-r from-amber-600 to-transparent text-white p-4 rounded-full shadow-lg hover:bg-opacity-70 transition z-20"
            onClick={onClick}
            aria-label="Next"
        >
            <ArrowRightOutlined size={20} />
        </button>
    );
};

// Custom Previous Arrow
const PrevArrow = (props: CustomArrowProps) => {
    const { onClick } = props;
    return (
        <button
            className="absolute left-6 top-[50%] transform -translate-y-1/2 bg-gradient-to-l from-amber-600 to-transparent text-white p-4 rounded-full shadow-lg hover:bg-opacity-70 transition z-20"
            onClick={onClick}
            aria-label="Previous"
        >
            <ArrowLeftOutlined size={20} />
        </button>
    );
};

const HeroSection = () => {
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
    const sliderItems = [
        { src: img1, alt: "Image 1" },
        { src: img2, alt: "Image 2" },
        { src: img3, alt: "Image 3" },
        { src: img4, alt: "Image 4" },
    ];

    const [startTime, setPickUpDate] = useState<Dayjs | null>(null);
    const [endTime, setReturnDate] = useState<Dayjs | null>(null);
    const navigate = useNavigate();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    const handleSearch = () => {
        const startD = startTime ? startTime.format("YYYY-MM-DD") : "";
        const endD = endTime ? endTime.format("YYYY-MM-DD") : "";
        navigate(
            `/cars?location=${location}&startDate=${startD}&endDate=${endD}`
        );
    };

    return (
        <div className="relative mt-[134px] h-[calc(100vh-134px)]">
            {/* Carousel */}
            <Carousel arrows {...settings}>
                {sliderItems.map((item, index) => (
                    <div key={index}>
                        <div className="relative ">
                            <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
                            <img
                                src={item.src}
                                className="h-[calc(100vh-134px)] w-full object-cover"
                                alt={item.alt}
                            />
                        </div>
                    </div>
                ))}
            </Carousel>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-white bg-black bg-opacity-30 w-[800px] h-[300px] mx-auto my-auto border-2 rounded-xl">
                <h1 className="text-4xl font-bold mb-6">
                    Find Your Perfect Ride
                </h1>

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
                <Buttons to="/cars">Book</Buttons>
            </div>
        </div>
    );
};

export default HeroSection;
