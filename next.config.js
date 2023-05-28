/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NEXT_NODE_ENV === "development",
});

const nextConfig = {
    env: {
        NEXT_API_URL: process.env.NEXT_API_URL,
        NEXT_APP_CLIENT_ID: process.env.NEXT_APP_CLIENT_ID,
        NEXT_STRAPI_URL: process.env.NEXT_STRAPI_URL,
        NEXT_NODE_ENV: process.env.NEXT_NODE_ENV,
    },
};

module.exports = withPWA(nextConfig);
