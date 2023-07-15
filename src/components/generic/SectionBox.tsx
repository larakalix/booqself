export const SectionBox = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => {
    return (
        <section className="w-full">
            <h5 className="text-start uppercase text-base font-bold mb-4 text-gray-900 dark:text-gray-100">
                {title}
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 w-full">
                {children}
            </div>
        </section>
    );
};
