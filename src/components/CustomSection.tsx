interface CustomSectionProps {
    image: string;
    title: string;
    paragraph: string;
}
const CustomSection = ({ image, title, paragraph }: CustomSectionProps) => {
    return (
        <section
            className="bg-cover bg-center bg-no-repeat py-20 mt-[134px]"
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className="container mx-auto px-4 text-center text-white">
                <h1 className="text-4xl font-bold mb-4">{title}</h1>
                <p className="text-lg mb-8">{paragraph}</p>
            </div>
        </section>
    );
};

export default CustomSection;
