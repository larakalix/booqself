// import { Card } from "@/kit/card/Card";
// import { Card } from "flowbite-react";
import { Landing } from "@/components/home/Landing";

export default async function Home() {
    return (
        <section className="min-h-screen w-full p-5">
            {/* <div className="flex items-center justify-between flex-col gap-4 min-h-[calc(100vh-2.5rem)] p-0"> */}
            {/* <div className="flex items-center justify-center flex-col gap-4 flex-1">
                    <h1 className="text-main-blue text-[1.5rem] font-semibold">
                        Pura Vida
                    </h1>
                    <Landing />
                </div>
                <footer className="py-6">
                    <p className="text-gray-400 text-sm">
                        Copyright © 2023 Pura Vida. All rights reserved.
                    </p>
                </footer> */}

            <div className="flex items-center justify-center gap-4 text-center bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 min-h-[calc(100vh-2.5rem)]">
                <section className="bg-white dark:bg-gray-900">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                        <h1 className="inline-flex px-4 py-2 mb-4 text-4xl font-extrabold rounded-lg tracking-tight leading-none text-white md:text-5xl lg:text-6xl dark:text-white bg-gradient-to-r from-pink-500 to-blue-500">
                            Pura Vida
                        </h1>
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                            Effortless Appointment Management
                        </h1>
                        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
                            Spend less time on logistics and more time on what
                            matters most. Effortlessly handle bookings and
                            enhance customer satisfaction.
                        </p>
                        <Landing />
                    </div>
                </section>
            </div>
            {/* </div> */}
        </section>
    );
}
