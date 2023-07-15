type Props = {
    step: number;
    className?: string;
    handleBack: () => void;
    children: React.ReactNode;
};

export const StepperActions = ({
    step,
    className,
    handleBack,
    children,
}: Props) => {
    const isStepBackDisabled = step === 0;

    return (
        <footer
            className={`flex items-center justify-between w-full mt-4 ${className}`}
        >
            <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isStepBackDisabled}
                onClick={handleBack}
            >
                Back
            </button>

            {children}
        </footer>
    );
};
