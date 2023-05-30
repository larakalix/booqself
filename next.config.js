/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    // disable: process.env.NEXT_NODE_ENV === "development",
    disable: true,
});

const nextConfig = {
    env: {
        NEXT_API_URL: process.env.NEXT_API_URL,
        NEXT_APP_CLIENT_ID: process.env.NEXT_APP_CLIENT_ID,
        NEXT_STRAPI_URL: process.env.NEXT_STRAPI_URL,
        NEXT_INTEGRATION_KEY: process.env.NEXT_INTEGRATION_KEY,
        NEXT_DOCUSIGN_API: process.env.NEXT_DOCUSIGN_API,
        NEXT_EMAIL: process.env.NEXT_EMAIL,
        NEXT_EMAIL_PWD: process.env.NEXT_EMAIL_PWD,
        NEXT_NODE_ENV: process.env.NEXT_NODE_ENV,
    },
};

module.exports = withPWA(nextConfig);
