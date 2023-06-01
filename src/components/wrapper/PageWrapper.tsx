type Props = {
    className?: string;
    children: React.ReactNode;
};

export const PageWrapper = ({ className = "", children }: Props) => {
    return (
        <section
            className={`min-h-screen w-full ml-0 xl:ml-60 p-5 ${className}`}
        >
            {children}
        </section>
    );
};
