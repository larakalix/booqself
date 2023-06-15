import { Card } from "@/kit/card/Card";
import { RiLoader5Fill } from "react-icons/ri";
import { AiOutlineInfoCircle } from "react-icons/ai";

export const AdviceCard = ({
    title,
    description,
    isLoader,
}: {
    title: string;
    description: string;
    isLoader?: boolean;
}) => {
    return (
        <section className="min-h-screen w-full p-5">
            <Card className="flex flex-col gap-2 items-center justify-center min-h-[calc(100vh-2.5rem)] p-0 ring-yellow-400">
                {isLoader ? (
                    <RiLoader5Fill className="animate-spin text-4xl text-blue-400" />
                ) : (
                    <AiOutlineInfoCircle className="text-2xl text-yellow-400" />
                )}
                <div className="text-center">
                    <h1 className="text-xl font-bold">{title}</h1>
                    <p className="text-gray-400">{description}</p>
                </div>
            </Card>
        </section>
    );
};
