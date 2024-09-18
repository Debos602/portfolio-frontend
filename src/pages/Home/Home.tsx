import HeroSection from "../HeroSection";
import CustomerTestimonials from "./CustomerTestimonials";
import FeaturedCars from "./FeaturedCar";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
    return (
        <div>
            <HeroSection />
            <FeaturedCars />
            <WhyChooseUs />
            <CustomerTestimonials />
        </div>
    );
};

export default Home;
