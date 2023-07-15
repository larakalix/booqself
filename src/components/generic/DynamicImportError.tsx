import type { DynamicOptionsLoadingProps } from "next/dynamic";

export const DynamicImportError = ({
    loadingProps,
}: {
    loadingProps: DynamicOptionsLoadingProps;
}) => {
    return (
        <div>
            <h2 className="text-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
                Error!
            </h2>
            <button onClick={loadingProps.retry}>Retry</button>
        </div>
    );
};
