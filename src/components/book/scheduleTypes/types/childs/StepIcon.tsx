import clsx from "clsx";

export const StepIcon = ({ step, index }: { step: number; index: number }) => {
    const styles = clsx({
        ["border-blue-600 dark:border-blue-500"]: step === index,
        ["border-gray-500 dark:border-gray-300"]: step !== index,
        ["text-green-500 dark:text-gray-300"]: step > index,
    });

    return (
        <span
            className={`flex items-center justify-center w-8 h-8 border rounded-full shrink-0 ${styles}`}
        >
            {index + 1}
        </span>
    );
};
