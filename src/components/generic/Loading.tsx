import { RiLoader5Fill } from "react-icons/ri";

export const Loading = () => {
    return (
        <div className="flex gap-4 flex-col items-center justify-center h-20">
            <RiLoader5Fill className="animate-spin text-6xl text-blue-400" />
            <p className="whitespace-nowrap text-center text-gray-500 px-4 py-3.5 font-medium">
                Loading
            </p>
        </div>
    );
};
