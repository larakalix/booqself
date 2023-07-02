import React from "react";

export const useHeader = () => {
    const greetings = (() => {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();

        if (currentHour >= 6 && currentHour < 12) {
            return "Good morning";
        } else if (currentHour >= 12 && currentHour < 18) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    })();

    return { greetings };
};
