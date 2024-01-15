/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public',
    cacheOnFrontEndNav : true,
    disable: process.env.NODE_ENV === "development",
  })
const nextConfig = {
    // experimental: {
    //     serverActions: true,
    // },
    images: {
        domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com", "avatars.githubusercontent.com", "source.unsplash.com", "mueblesitaliano.ph"]
    }
}

module.exports = withPWA(nextConfig)
