import { Card, Text } from "@tremor/react";

export const EmptyResults = ({ text }: { text: string }) => {
    return (
        <Card>
            <div className="flex items-center justify-center">
                <Text>{text}</Text>
            </div>
        </Card>
    );
};
