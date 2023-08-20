/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            hostname: "*.patreon.com",
         },
         {
            hostname: "*.patreonusercontent.com",
         },
         {
            protocol: "https",
            hostname: "avatars.githubusercontent.com",
         },
      ],
   },
};
