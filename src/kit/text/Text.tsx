import React from "react";

export const Text = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div className={`text-gray-500 text-sm font-normal ${className}`}>
            {children}
        </div>
    );
};
