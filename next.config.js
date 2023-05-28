/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_API_URL: process.env.NEXT_API_URL,
        NEXT_APP_CLIENT_ID: process.env.NEXT_APP_CLIENT_ID,
        NEXT_STRAPI_URL: process.env.NEXT_STRAPI_URL,
    },
};

module.exports = nextConfig;
