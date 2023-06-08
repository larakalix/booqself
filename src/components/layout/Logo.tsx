import Link from "next/link";

export const Logo = () => {
    return (
        <small>
            <Link
                href={`/dashboard`}
                passHref
                className="text-main-blue text-[1.5rem] font-semibold"
            >
                Pura Vida
            </Link>
        </small>
    );
};
