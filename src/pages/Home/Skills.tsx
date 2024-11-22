import { useGetAllSkillsQuery } from "@/redux/feature/skills/skill.api";
import { TSkill } from "@/types/global";
import { Collapse, Progress, Spin } from "antd";
import { motion } from "framer-motion";

const { Panel } = Collapse;

const Skills = () => {
    const {
        data: skills,
        isLoading,
        error,
    } = useGetAllSkillsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });
    console.log(skills?.data);

    const skillData: TSkill[] = skills?.data || [];
    console.log("skillData", skillData);
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#EEEEEE]">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#EEEEEE]">
                <p className="text-red-600 text-xl font-bold">
                    Oops! Something went wrong. Please try again later.
                </p>
            </div>
        );
    }

    return (
        <section className="bg-[#EEEEEE] py-10 px-5">
            <motion.h2
                className="text-4xl font-bold text-center text-[#3B1E54] mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Skills
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Skills Section */}
                <div className="flex flex-col h-full">
                    <motion.div
                        className="space-y-6 border-2 border-[#D4BEE4] p-6 rounded-s-xl shadow-xl flex-grow"
                        initial="hidden"
                        animate="visible"
                    >
                        {skillData?.map(
                            (skill: TSkill) => (
                                console.log(skill),
                                (
                                    <motion.div
                                        key={skill._id}
                                        className="rounded-s-xl"
                                    >
                                        <Panel
                                            header={
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-lg font-semibold text-[#3B1E54]">
                                                        {skill.title}
                                                    </h3>
                                                    <Progress
                                                        percent={Math.floor(
                                                            Math.random() * 100
                                                        )}
                                                        size="small"
                                                        strokeColor="#9B7EBD"
                                                    />
                                                </div>
                                            }
                                            key={skill._id}
                                            className="bg-white rounded-lg border border-[#D4BEE4] mb-4"
                                        >
                                            <p className="text-sm text-gray-700 mt-2">
                                                {skill.description}
                                            </p>
                                        </Panel>
                                    </motion.div>
                                )
                            )
                        )}
                    </motion.div>
                </div>

                {/* Throwable Capsules Section */}
                <div className="flex flex-col h-full">
                    <motion.div
                        className="space-y-6 border-2 border-[#D4BEE4] p-6 rounded-r-xl shadow-xl flex-grow"
                        initial="hidden"
                        animate="visible"
                    >
                        <div>
                            {skillData?.map(
                                (skill: TSkill) => (
                                    console.log(skill),
                                    (
                                        <motion.div
                                            key={skill._id}
                                            className="bg-[#9B7EBD] text-white shadow-lg border-2 border-white px-6 py-3 text-sm font-semibold mb-4"
                                        >
                                            <span className="font-bold">
                                                {skill.title}:
                                            </span>{" "}
                                            {skill.description}
                                        </motion.div>
                                    )
                                )
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
