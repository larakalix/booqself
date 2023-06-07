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
        NEXT_NODE_ENV: process.env.NEXT_NODE_ENV,
        // No need if auth is implemented
        NEXT_APP_CLIENT_ID: process.env.NEXT_APP_CLIENT_ID,
        // No need if auth is implemented
        // Docusgin
        NEXT_INTEGRATION_KEY: process.env.NEXT_INTEGRATION_KEY,
        NEXT_DOCUSIGN_API: process.env.NEXT_DOCUSIGN_API,
        NEXT_DOCUSIGN_USERID: process.env.NEXT_DOCUSIGN_USERID,
        // Nestjs API
        NEXT_API_URL: process.env.NEXT_API_URL,
        // Email service
        NEXT_EMAIL: process.env.NEXT_EMAIL,
        NEXT_EMAIL_PWD: process.env.NEXT_EMAIL_PWD,
        // Strapi API
        NEXT_STRAPI_URL: process.env.NEXT_STRAPI_URL,
        // Clover cretendials
        NEXT_CLOVER_API_URL: process.env.NEXT_CLOVER_API_URL,
        NEXT_CLOVER_ROOT_URL: process.env.NEXT_CLOVER_ROOT_URL,
        NEXT_CLOVER_APP_ID: process.env.NEXT_CLOVER_APP_ID,
        NEXT_CLOVER_APP_SECRET: process.env.NEXT_CLOVER_APP_SECRET,
    },
};

module.exports = withPWA(nextConfig);
