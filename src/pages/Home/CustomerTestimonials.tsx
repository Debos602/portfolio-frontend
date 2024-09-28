import { Rate } from "antd";
import image from "../../assets/bg-6.jpg";
import testi1 from "../../assets/team2.jpg";
import testi2 from "../../assets/testi-2-removebg-preview.png";
import testi3 from "../../assets/testi-3-removebg-preview.png";

const CustomerTestimonials = () => {
    const testimonials = [
        {
            name: "John Doe",
            image: testi1,
            rating: 5,
            review: "The best car rental service I’ve ever used! The process was smooth and the customer support was amazing.",
        },
        {
            name: "Jane Smith",
            image: testi2,
            rating: 4,
            review: "Great experience! The car was in perfect condition, and the prices were very reasonable.",
        },
        {
            name: "Mark Wilson",
            rating: 5,
            image: testi3,
            review: "Super convenient and fast service! Highly recommend.",
        },
    ];

    const bgImage = {
        backgroundImage: `url(${image})`,
    };

    return (
        <section
            className="py-16 bg-white container mx-auto bg-cover bg-center bg-no-repeat relative z-10"
            style={bgImage}
        >
            {/* Overlay for background dimming */}
            <div className="absolute inset-0 bg-black opacity-90 -z-10"></div>
            <h4 className="text-xl font-medium text-amber-600 text-center mb-4">
                Testimonials
            </h4>
            <h2 className="text-3xl font-bold text-white text-center mb-8">
                What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className="p-6 bg-gray-50 shadow-lg rounded-lg relative broder-2 border-black "
                    >
                        {/* Triangle shapes for each card */}
                        <div className="absolute top-0 left-0 w-0 h-0 border-t-[50px] border-t-black opacity-98 border-r-[50px] border-r-transparent"></div>
                        <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[50px] border-b-black opacity-98  border-l-[50px] border-l-transparent"></div>

                        <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-20 h-20 rounded-full mx-auto mb-4"
                        />
                        <p className="text-lg mb-2">"{testimonial.review}"</p>
                        <Rate disabled defaultValue={testimonial.rating} />
                        <h4 className="mt-4 font-bold">{testimonial.name}</h4>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CustomerTestimonials;
