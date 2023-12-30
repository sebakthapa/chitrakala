/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //     serverActions: true,
    // },
    images: {
        domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com", "avatars.githubusercontent.com", "source.unsplash.com", "mueblesitaliano.ph"]
    }
}

module.exports = nextConfig
