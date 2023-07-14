import Link from "next/link";
import { ROUTES } from "@/ constants/routes";

export const Logo = () => {
    return (
        <small className="flex ml-2 md:mr-24">
            <Link
                href={ROUTES.HOME}
                passHref
                className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white"
            >
                Pura Vida
            </Link>
        </small>
    );
};
