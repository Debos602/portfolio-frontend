import Buttons from "@/components/Buttons";
import image from "../../assets/about.png";
import image2 from "../../assets/shop.jpg";
import team1 from "../../assets/team3-removebg-preview.png";
import team2 from "../../assets/team2-removebg-preview (1).png";
import team3 from "../../assets/testi-3-removebg-preview.png";
import team4 from "../../assets/team4-removebg-preview.png";
import backgroundImage from "../../assets/about-banner.jpg";
import carRight from "../../assets/car-right.png";
import carLeft from "../../assets/commit.jpg";
import contactBg from "../../assets/ban-bg-03.png";

const About = () => {
    const bgImage = {
        backgroundImage: `url(${backgroundImage})`,
    };

    const contactBg1 = {
        backgroundImage: `url(${contactBg})`,
    };

    return (
        <div className="mt-[135px]">
            {/* About Section */}
            <section
                className="bg-cover bg-center bg-no-repeat py-20"
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className="container mx-auto px-4 text-center text-white">
                    <h1 className="text-4xl font-bold mb-4">About Us</h1>
                    <p className="text-lg mb-8">
                        Learn more about our company, our team, and our
                        commitment to excellence.
                    </p>
                </div>
            </section>

            {/* Company History */}
            <section className="py-16 bg-gray-200">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex justify-center items-center">
                            <div className="w-96">
                                <h2 className="text-xl font-medium text-amber-600 mb-6">
                                    Company History
                                </h2>

                                <h3 className="text-3xl font-bold text-gray-600 mb-6">
                                    A Legacy of Excellence
                                </h3>
                                <p className="text-lg mb-10">
                                    Founded in 2000, our mission is to provide
                                    the best car rental experience possible. Our
                                    vision is to lead the industry in customer
                                    satisfaction and innovation.
                                </p>
                                <Buttons to="/about">Learn More</Buttons>
                            </div>
                        </div>
                        <img
                            src={image2}
                            className="w-full object-cover"
                            alt=""
                        />
                    </div>
                </div>
            </section>

            {/* Our Team */}
            <section className="py-16 bg-gray-950">
                <div className="container mx-auto max-w-3xl">
                    <div className="">
                        <h2 className="text-7xl font-thin text-orange-500 mb-6 text-center">
                            Our Team
                        </h2>
                        <div className="grid grid-cols-1 gap-8">
                            {/* First Row */}
                            <div className="grid grid-cols-2 gap-8">
                                <div className="bg-white shadow-lg rounded-3xl p-6 text-center">
                                    <img
                                        src={team1}
                                        alt="Team Member 1"
                                        className="w-48 h-48  mx-auto mb-4"
                                    />
                                    <h3 className="text-xl font-semibold">
                                        Jane Doe
                                    </h3>
                                    <p>CEO</p>
                                </div>
                                <div className="rounded-lg p-6 text-center relative">
                                    <div className="absolute rounded-tr-2xl bottom-2 left-2 transform h-1/2 w-1/2 border-t-2 border-r-2 border-amber-900"></div>
                                </div>
                            </div>

                            {/* Second Row with reverse order */}
                            <div className="grid grid-cols-2 gap-8 flex-row-reverse">
                                <div className="rounded-lg p-6 text-center relative">
                                    <div className="absolute rotate-180 rounded-tr-2xl top-2 right-2 transform h-1/2 w-1/2 border-t-2 border-r-2 border-amber-900"></div>
                                </div>
                                <div className="bg-white shadow-lg rounded-3xl p-6 text-center">
                                    <img
                                        src={team2}
                                        alt="Team Member 4"
                                        className="w-48 h-48 mx-auto mb-4"
                                    />
                                    <h3 className="text-xl font-semibold">
                                        Bob Lee
                                    </h3>
                                    <p>CFO</p>
                                </div>
                            </div>

                            {/* Third Row */}
                            <div className="grid grid-cols-2 gap-8">
                                <div className="bg-white shadow-lg rounded-3xl p-6 text-center">
                                    <img
                                        src={team3}
                                        alt="Team Member 5"
                                        className="w-48 h-48  mx-auto mb-4"
                                    />
                                    <h3 className="text-xl font-semibold">
                                        Emma Brown
                                    </h3>
                                    <p>CMO</p>
                                </div>
                                <div className="rounded-lg p-6 text-center relative">
                                    <div className="absolute rounded-tr-2xl bottom-2 left-2 transform h-1/2 w-1/2 border-t-2 border-r-2 border-amber-900"></div>
                                </div>
                            </div>

                            {/* Fourth Row with reverse order */}
                            <div className="grid grid-cols-2 gap-8 flex-row-reverse">
                                <div className="rounded-lg p-6 text-center relative">
                                    <div className="absolute rotate-180 rounded-tr-2xl top-2 right-2 transform h-1/2 w-1/2 border-t-2 border-r-2 border-amber-900"></div>
                                </div>
                                <div className="bg-white shadow-lg rounded-3xl p-6 text-center">
                                    <img
                                        src={team4}
                                        alt="Team Member 8"
                                        className="w-48 h-48  mx-auto mb-4"
                                    />
                                    <h3 className="text-xl font-semibold">
                                        Daniel White
                                    </h3>
                                    <p>Engineer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Fleet */}
            <section
                className="py-16 bg-gray-100 bg-cover bg-center bg-no-repeat"
                style={bgImage}
            >
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex justify-center items-center">
                            <div className="w-96">
                                <h2 className="text-xl font-medium text-amber-600 mb-6">
                                    Our Fleet
                                </h2>
                                <h3 className="text-3xl font-bold text-gray-600 mb-6">
                                    Explore Our Fleet
                                </h3>
                                <p className="text-lg mb-6">
                                    We offer a diverse range of vehicles
                                    including economy cars, luxury vehicles,
                                    SUVs, and more. Whether you need a car for a
                                    day or a week, we have the perfect option
                                    for you.
                                </p>
                                <Buttons to="/about">See More</Buttons>
                            </div>
                        </div>

                        <img
                            src={carRight}
                            alt=""
                            className="object-cover h-full w-full"
                        />
                    </div>
                </div>
            </section>

            {/* Values & Commitment */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <img src={carLeft} alt="" />
                        <div className="flex flex-col justify-center w-96 self-center">
                            <h3 className="text-xl font-medium text-amber-600 mb-6">
                                Commitment
                            </h3>
                            <h2 className="text-3xl font-bold text-white mb-6">
                                Values & Commitment
                            </h2>
                            <p className="text-lg">
                                Our commitment to customer service and
                                sustainability is at the core of everything we
                                do. We strive to offer exceptional service while
                                minimizing our environmental impact.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Information */}
            <section
                className="py-12 bg-no-repeat bg-slate-200 bg-center"
                style={contactBg1}
            >
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-xl font-medium text-amber-600 mb-6">
                        Contact
                    </h3>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Contact Information
                    </h2>
                    <ul className="space-y-2 text-lg">
                        <li>Phone: (042) 789 35490</li>
                        <li>Email: support@Carena.com</li>
                        <li>Address: Fairview Ave, El Monte, CA, 91732</li>
                        <li>Hours: Mon - Fri: 09:00 AM to 06:00 PM</li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default About;
