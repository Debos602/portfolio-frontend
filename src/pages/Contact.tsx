const Contact = () => {
    return (
        <div className="container mx-auto mt-[110px]">
            <div className="flex flex-col items-center justify-center py-16 bg-gray-50 min-h-screen">
                <h2 className="text-5xl font-bold text-gray-800 mb-12">
                    Get In Touch
                </h2>

                <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-4xl flex flex-col lg:flex-row lg:space-x-10">
                    <div className="w-full lg:w-1/2">
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                Phone
                            </h3>
                            <p className="text-gray-600 hover:text-gray-800 transition duration-300">
                                +1 234 567 890
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                Email
                            </h3>
                            <p className="text-gray-600 hover:text-gray-800 transition duration-300">
                                contact@example.com
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                Address
                            </h3>
                            <p className="text-gray-600 hover:text-gray-800 transition duration-300">
                                1234 Example St, City, State, ZIP
                            </p>
                        </div>
                    </div>

                    {/* Google Map Embed */}
                    <div className="w-full lg:w-1/2 h-64 lg:h-auto">
                        <iframe
                            className="w-full h-full rounded-lg"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0946651781265!2d-122.41941548468124!3d37.77492967975939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809cbae05d4d%3A0xc7f5f1bbed1b65!2sSan+Francisco%2C+CA!5e0!3m2!1sen!2sus!4v1631514244343!5m2!1sen!2sus"
                            allowFullScreen={true}
                            loading="lazy"
                            title="Google Map"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
