/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgs.search.brave.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "soqgjjvexhyhcrbnwuwd.supabase.co",
        port: "",
      },
    ],
  },
}

module.exports = nextConfig
