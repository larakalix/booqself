// import { Card } from "@tremor/react";
import { Card, CardContent } from "@/kit/card/Card";
import { AiOutlineInfoCircle } from "react-icons/ai";

export const AdviceCard = ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => {
    return (
        <section className="min-h-screen w-full p-5">
            <Card className="flex flex-col gap-2 items-center justify-center min-h-[calc(100vh-2.5rem)] p-0 ring-yellow-400">
                <CardContent>
                    <AiOutlineInfoCircle className="text-2xl text-yellow-400" />
                    <div className="text-center">
                        <h1 className="text-xl font-bold">{title}</h1>
                        <p className="text-gray-400">{description}</p>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};
