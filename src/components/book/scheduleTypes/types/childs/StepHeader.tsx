export const StepHeader = ({
    label,
    index,
}: {
    label: string;
    index: number;
}) => {
    return (
        <span className="text-start">
            <h3 className="font-medium leading-tight">Step {index + 1}</h3>
            <p className="text-sm">{label}</p>
        </span>
    );
};
