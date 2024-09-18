import { Carousel } from "antd";
import img1 from "../assets/img-1.jpg";
import img2 from "../assets/img-2.jpg";
import img3 from "../assets/img-3.jpg";
import img4 from "../assets/img-4.jpg";
import { CustomArrowProps } from "react-slick";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

// Custom Next Arrow
const NextArrow = (props: CustomArrowProps) => {
    const { onClick } = props;
    return (
        <button
            className="absolute right-6 top-[56%] transform -translate-y-4/3 bg-gradient-to-r from-amber-600 to-transparent text-white p-4 rounded-full shadow-lg hover:bg-opacity-70 transition z-20"
            onClick={onClick}
            aria-label="Next"
            // Ensure high z-index
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
            className="absolute left-6 top-[56%] transform -translate-y-4/3 bg-gradient-to-l from-amber-600 to-transparent text-white p-4 rounded-full shadow-lg hover:bg-opacity-70 transition z-20"
            onClick={onClick}
            aria-label="Previous"
        >
            <ArrowLeftOutlined size={20} />
        </button>
    );
};

const HeroSection = () => {
    // Define an array of image sources
    const sliderItems = [
        { src: img1, alt: "Image 1" },
        { src: img2, alt: "Image 2" },
        { src: img3, alt: "Image 3" },
        { src: img4, alt: "Image 4" },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className="relative">
            <Carousel arrows {...settings}>
                {sliderItems.map((item, index) => (
                    <div key={index}>
                        <div className="relative">
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black opacity-70 z-20"></div>
                            {/* Image */}
                            <img
                                src={item.src}
                                className="h-screen w-full object-cover"
                                alt={item.alt}
                            />
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default HeroSection;
