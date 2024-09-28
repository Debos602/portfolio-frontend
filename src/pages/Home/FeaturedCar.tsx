import { useGetAllCarsQuery } from "@/redux/feature/car/carManagement.api";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Slider, { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TCar } from "@/types/global";

// Custom Next Arrow
const NextArrow = (props: CustomArrowProps) => {
    const { onClick } = props;
    return (
        <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-amber-600 to-transparent text-white p-4 rounded-full shadow-lg hover:bg-opacity-70 transition z-30"
            onClick={onClick}
            aria-label="Next"
        >
            <ArrowRightOutlined style={{ fontSize: "24px" }} />
        </button>
    );
};

// Custom Previous Arrow
const PrevArrow = (props: CustomArrowProps) => {
    const { onClick } = props;
    return (
        <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-amber-600 to-transparent text-white p-4 rounded-full shadow-lg hover:bg-opacity-70 transition z-30"
            onClick={onClick}
            aria-label="Previous"
        >
            <ArrowLeftOutlined style={{ fontSize: "24px" }} />
        </button>
    );
};

const FeaturedCars = () => {
    const { data: cars, isLoading, isError } = useGetAllCarsQuery(undefined);

    const carsArray = Array.isArray(cars?.data) ? cars?.data : [];

    if (isLoading)
        return <p className="text-center font-bold text-red-700">Loading...</p>;
    if (isError) return <p>Failed to load cars.</p>;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Default to 3 cards at a time
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024, // When screen width is <= 1024px
                settings: {
                    slidesToShow: 2, // Show 2 cards
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768, // When screen width is <= 768px
                settings: {
                    slidesToShow: 1, // Show 1 card on small devices
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="container mx-auto py-16">
            <div className="grid grid-cols-1 md:grid-cols-5 ">
                <div>
                    <h2 className="text-3xl font-medium text-amber-600 text-center mb-2">
                        Featured Cars
                    </h2>
                    <h3 className="text-4xl font-semibold text-gray-800 text-center mb-4">
                        Discover Our Top Picks For You Today !
                    </h3>
                    <p className="text-center text-lg text-gray-900 max-w-2xl mx-auto mb-8">
                        Explore our handpicked selection of the most popular
                        cars, offering unbeatable comfort, style, and
                        performance.
                    </p>
                </div>

                <div className="col-span-4">
                    {carsArray.length > 0 ? (
                        <div className="relative">
                            <Slider
                                {...settings}
                                className="rounded-xl overflow-hidden "
                            >
                                {carsArray?.map((car: TCar) => (
                                    <div key={car._id} className="px-3">
                                        {/* Padding for gap */}
                                        <Card
                                            className="relative shadow-lg rounded-xl overflow-hidden transform transition-transform  border-2 border-gray-500"
                                            cover={
                                                <div className="relative">
                                                    <img
                                                        alt={car.name}
                                                        className="h-96 w-full object-cover rounded-t-xl"
                                                        src={car.image}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40"></div>
                                                </div>
                                            }
                                        >
                                            <Card.Meta
                                                className="text-black text-md"
                                                title={car.name}
                                                description={`Description: ${car.description}`}
                                            />
                                            <p className="text-lg font-semibold text-gray-700 mt-4">
                                                Price per hour: $
                                                {car.pricePerHour}
                                            </p>
                                        </Card>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    ) : (
                        <p>No cars available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeaturedCars;
